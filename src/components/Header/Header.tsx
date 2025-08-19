// Базовые импорты
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Компоненты проекта
import { BlueButton, PinkButton, StormIconButton } from '../../styles/mui';

// Стили
import useResolutions from '../../hooks/useResolusions';
import resStyles from '../../utils/resStyles';
import styles from './styles.module.scss';

// Material-UI
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

// Картинки & Иконки
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import Logo from '../img/logo512.png';

function Header() {
    // Инициализация нужных переменных
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [buttonStyles, setButtonStyles] = useState({});

    const resolution = useResolutions();
    const { isBigScreen, isMidScreen } = useResolutions();



    useEffect(() => {
        if(isBigScreen) setButtonStyles({ fontSize: '18px' })
        else if(isMidScreen) setButtonStyles({ fontSize: '16px', padding: '8px 15px' })
    }, [ isBigScreen, isMidScreen ])

    // Открыть бургер меню
    const handleBurgerMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(e.currentTarget);
    }

    // Закрыть бургер меню
    const handleCloseBurgerMenu = () => {
        setAnchorElMenu(null);
    }

    // Функцмя изменения состояния при скролле
    const handleScroll = () => {
        const scrollTop = window.scrollY;

        if (scrollTop > 0 && !isScrolled) setIsScrolled(true);
        else if (scrollTop === 0 && isScrolled) setIsScrolled(false);
    };

    // Отследить скрол в странице
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled])

    return (
        <>
            <Box>
                <AppBar position='fixed' sx={isScrolled ?
                    {
                        zIndex: 100,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease-in-out',
                    } : {
                        backgroundColor: 'rgba(0, 0, 0, 0.0)',
                        boxShadow: 'none',
                        zIndex: 100,
                        transition: 'all 0.2s ease-in-out',
                    }}>
                    <Typography component='div' sx={{margin: '0 auto'}} className={`${styles.inner} ${resStyles('container', resolution)}`}>
                        <a href="/" className={styles.title}>
                            <img src={Logo} alt="logo" className={styles.logo} />
                            <h2 style={{ fontSize: '26px' }}>Storm Shop</h2>
                        </a>
                        <Typography noWrap component='nav' className={`${resStyles('header_nav', resolution)}`}>
                            <Toolbar className={resStyles("nav_block", resolution)}>
                                {/* Link is throwing an error */}
                                <a href="/signup"><PinkButton sx={buttonStyles} startIcon={<DiamondRoundedIcon style={{ marginRight: '4px' }} />}>Create Account</PinkButton></a>
                                <a href="/login"><BlueButton sx={buttonStyles} startIcon={<CodeRoundedIcon style={{ marginRight: '4px' }} />}>Login Account</BlueButton></a>
                            </Toolbar>

                            <span style={{ fontSize: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>|</span>

                            <Toolbar className={resStyles("nav_block", resolution)}>
                                <Link to="https://t.me/Nikita1264"><BlueButton sx={buttonStyles} startIcon={<Person2RoundedIcon style={{ marginRight: '4px' }} />}>SUPPORT</BlueButton></Link>
                                <Link to="/article/job"><BlueButton sx={buttonStyles} startIcon={<WorkRoundedIcon style={{ marginRight: '4px' }} />}>WORK</BlueButton></Link>
                            </Toolbar>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} className={`${styles.burger_menu} ${resStyles('burger_menu', resolution)}`}>
                            <StormIconButton onClick={handleBurgerMenu}>
                                <MenuIcon sx={{ fontSize: '48px' }} />
                            </StormIconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElMenu)}
                                onClose={handleCloseBurgerMenu}
                                sx={{
                                    '& .MuiPaper-root': {
                                        borderRadius: '6px',
                                        backgroundColor: '#292929',
                                        color: '#fff',
                                        boxShadow: 'none',
                                        padding: '0',
                                        margin: '0',
                                    },
                                }}
                            >
                                <MenuItem sx={{ padding: '10px 36px' }} onClick={handleCloseBurgerMenu}>
                                    <DiamondRoundedIcon style={{ marginRight: '12px', fontSize: '20px' }} /> <span style={{ fontSize: '20px' }}>SUBSCRIPTIONS</span>
                                </MenuItem>
                                <MenuItem sx={{ padding: '10px 36px' }} onClick={handleCloseBurgerMenu}>
                                    <CodeRoundedIcon style={{ marginRight: '12px', fontSize: '20px' }} /> <span style={{ fontSize: '20px' }}>SCRIPTS</span>
                                </MenuItem>
                                <MenuItem sx={{ padding: '10px 36px' }} onClick={handleCloseBurgerMenu}>
                                    <Person2RoundedIcon style={{ marginRight: '12px', fontSize: '20px' }} /> <span style={{ fontSize: '20px' }}>SUPPORT</span>
                                </MenuItem>
                                <MenuItem sx={{ padding: '10px 36px' }} onClick={handleCloseBurgerMenu}>
                                    <WorkRoundedIcon style={{ marginRight: '12px', fontSize: '20px' }} /> <span style={{ fontSize: '20px' }}>WORK</span>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Typography>
                </AppBar>
            </Box>
        </>
    )
}

export default Header
