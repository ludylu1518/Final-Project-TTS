import { useOutletContext } from "react-router-dom";
import styles from '../styles/profileContent.module.css';

function userHome() {

    return (
        <>
            {/* use to get username from localstorage */}
            <h1 className={styles.display}>Welcome user: {localStorage.getItem("username")}</h1>
        </>
    )

}

export default userHome;