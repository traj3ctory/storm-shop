// Basic imports
import { useCallback, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from '../styles/App.module.scss';

// API imports
import { APIContext } from '../context/APIContext.js';

// Libraries
import ReCAPTCHA from "react-google-recaptcha";

// Project Components & Hooks
import ModalFail from '../components/ModalFail/index.js';
import ModalSuccess from '../components/ModalSuccess/index.js';
import { PinkButton, StormButton } from '../styles/mui.js';

export default function LogIn() {
    // Basic variables
    const navigate = useNavigate();

    // Get API class for work
    const api = useContext(APIContext)!.api

    // Captcha
    const captchaSiteKey: string = '6LeKRR4nAAAAAFsP7Qr_dCWczScuENUI1P7d4pf6';
    const [captchaValue, setCaptchaValue] = useState("");

    // Login / Password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Error modal window
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')

    // Success modal window
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [modalSuccessContent, setModalSuccessContent] = useState('')


    // Function to close modal window
    function onClose() {
        setIsOpen(false)
        setIsSuccessOpen(false)
    }

    // Function for user login (Activated when clicking "Login" button)
    const onLogin = useCallback(async () => {
        // Check for completed captcha
        if (!captchaValue) {

            // Show error through modal window
            setModalContent("Please complete the captcha");
            setIsOpen(true);

            return;

        }

        // Send request to backend 
        const resultRaw = await api!.login({
            username: username,
            password: password,
            recaptchaToken: captchaValue
        })

        // Get server response
        const result = resultRaw.data

        // If error occurred
        if (result.success === false || result.succeed === false) {
            // Show error through modal window
            setModalContent(result.error);
            setIsOpen(true);
        }
        
        // If everything is good
        else {
            // Show success modal window
            setModalSuccessContent('Successfully logged into account!')
            setIsSuccessOpen(true)
        }
    }, [api, captchaValue, password, username])

    return (
        <>

            {/* Setting tags for page description and SEO */}

            <Helmet>
                <title>StormShop: Login</title>
                <meta name="description" content="Login page for NitroStorm store website" />
                <meta name="keywords" content='login nitro discord nitrostorm buy nitro registration' />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="author" content="FLEY" />
            </Helmet>

            .

            {/* Error modal window */}
            <ModalFail isOpen={isOpen} onClose={onClose}>
                {modalContent}
            </ModalFail>

            {/* Success modal window */}
            <ModalSuccess styles={{
                content: {
                    fontSize: '24px'
                }
            }} isOpen={isSuccessOpen} onClose={onClose}>
                {modalSuccessContent}
                <StormButton variant='outlined' onClick={() => navigate('/')} sx={{
                    marginTop: '16px',
                    background: 'none',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: 'none'
                    }
                }}>Return to home</StormButton>
            </ModalSuccess>

            {/* Main content */}
            <div className={styles.signup_container}>
                
                {/* Header */}
                <div className={styles.signup_title}>Log into your Nitro Storm profile!</div>

                {/* Login form */}
                <div className={styles.signup_form}>

                    {/* Username */}
                    <label htmlFor='username'>NICKNAME:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} id='username' />

                    {/* Password */}
                    <label htmlFor='password'>PASSWORD: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
                    
                    {/* Note */}
                    <span style={{ fontSize: '16px', width: '550px', textAlign: 'center' }}>Password recovery is not available directly, as email or phone number cannot be attached to the account, so contact administration directly in Discord or Telegram! </span>

                    {/* Captcha */}
                    <div>
                        <ReCAPTCHA
                            sitekey={captchaSiteKey}
                            onChange={(value: string | null) => {
                                if (value) {
                                    setCaptchaValue(value);
                                }
                            }}
                        />
                    </div>
                    
                    <br></br>
                    
                    {/* Login button */}
                    <PinkButton sx={{pl: 8, pr: 8}} onClick={onLogin}>Login</PinkButton>
                </div>
            </div>
        </>
    )
}