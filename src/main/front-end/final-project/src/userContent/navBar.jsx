import {Link} from 'react-router-dom';
import styles from '../styles/navBar.module.css';
import styled from 'styled-components';
import icon from '../helper/sidebar.png';
import {useState, useEffect} from 'react';

const StyledLink = styled(Link)`
  color: Blue;
  text-decoration: none;
`;

function navBar() {

    return (
        <>
            <nav className={styles.sideBar}>               
            <img className={styles.icon} src={icon} alt='sidebar-icon'></img>            
                <ul>
                    <li><StyledLink to={"/user"}>Home</StyledLink></li>
                    <li><StyledLink to={"/user/profile"}>User Profile</StyledLink></li>
                    <li><StyledLink to={"/user/edit"}>Edit Profile</StyledLink></li>
                    <li><StyledLink to={"/user/setting"}>Edit Settings</StyledLink></li>
                    <li className={styles.logout}><a href='/login'>Logout</a></li>
                </ul>              
            </nav>
        </>
    )

}

export default navBar