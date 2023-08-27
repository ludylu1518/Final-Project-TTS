import { useOutletContext } from "react-router-dom";
import styles from '../styles/profileContent.module.css';
import {useEffect} from 'react';

function userProfile() {
    
     // functionality passed from userPage
    const {info} = useOutletContext()

    return (
        <>
            <h1 className={styles.display}>Hello, {info.firstName} {info.lastName}! Your birthday is {info.birthday}.</h1>
        </>
    )

}

export default userProfile;