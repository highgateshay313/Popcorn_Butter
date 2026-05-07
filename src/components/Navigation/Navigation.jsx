
import { useState } from 'react';
import styles from './Navigation.module.css';
import Logo from '../../assets/movie_logo.jpg';
import '@fontsource/nothing-you-could-do';

function Navigation({logo}) {
    return (
        <section className={styles.nav_container}>
            <div className={styles.logo_div}>
                <h1 className={styles.logo_title}>{logo}</h1>
                <img className={styles.app_logo} src={Logo} alt="" />
                <div className={styles.menu_list}>
                    <ul className={styles.menu_items}>
                        <li className={styles.menu_item}>Menu</li>
                        <li className={styles.menu_item}>Language</li>
                        <li className={styles.menu_item}>Genre</li>
                    </ul>
                </div>
            </div>  
        </section>
    )
}

export default Navigation;