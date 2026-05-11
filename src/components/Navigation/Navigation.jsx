
import { useState } from 'react';
import styles from './Navigation.module.css';
import Logo from '../../assets/butter_popcorn.jpg';
import '@fontsource/nothing-you-could-do';

function Navigation({logo}) {
    return (
        <section className={styles.nav_container}>
            <div className={styles.logo_div}>
                <h1 className={styles.logo_title}>{logo}</h1>
                <img className={styles.app_logo} src={Logo} alt="" />
            </div>  
        </section>
    )
}

export default Navigation;