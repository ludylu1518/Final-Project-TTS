import {useState} from 'react';
import styles from "./styles/homePage.module.css";

function homePage() {

    // keep track which content to display (either about or description)
    const [current, setCurrent] = useState(0);

    return (
        <>
           <div className={styles.home}> 
                <h1 className={styles.header1}>
                    <span className={styles.titleItem}>Welcome</span> 
                    <span className={styles.titleItem}>to</span>
                    <span className={styles.titleItem}>My</span>
                    <span className={styles.titleItem}>Final</span>
                    <span className={styles.titleItem}>Project</span>
                    <span className={styles.titleItem}>for</span>
                    <span className={styles.titleItem}>TTS!</span>
                </h1>
                
                {/* button use to toggle between which content to display */}
                <div className={styles.navBar}>
                    <button className={current === 0 ? styles.active : ""} onClick={() => setCurrent(0)}>About</button>
                    <button className={current === 1 ? styles.active : ""} onClick={() => setCurrent(1)}>Description</button>
                </div>

                {/* change div className base on which toggle number we are on and use css to hide or display content */}
                <div className={current === 0 ? styles.displayContent : styles.content}>
                    This is my final project for the TTS Full Stack Web Development Course.
                </div>

                <div className={current === 1 ? styles.displayContent : styles.content}>
                    A Full Stack Web Project. This is an user profile app. Users can create an account and store basic information. App created using React, JavaScript, CSS, HTML, SpringBoot, Java.
                </div>

                <h5 className={styles.header5}>Click login below to move to login page!</h5>
                <a className={styles.loginButton} href='/login'>Login Here!</a>
           </div>
        </>
    )

}

export default homePage;