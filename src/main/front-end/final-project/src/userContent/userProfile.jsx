import { useOutletContext } from "react-router-dom";
import styles from '../styles/profileContent.module.css';
import profilePic from '../helper/profilePic.png';
import malePic from '../helper/maleProfile.png';
import femalePic from '../helper/femaleProfile.png';
import { useEffect, useState } from "react";

function userProfile() {
    
     // functionality passed from userPage
    const {info} = useOutletContext()

    const [photo, setPhoto] = useState(profilePic);

    useEffect(() => {
        switch(info.gender) {
            case "male":
                return setPhoto(malePic);
            case "female":
                return setPhoto(femalePic);
            default:
                return setPhoto(profilePic);
        }
    }, [info])

    return (
        <>  
            <div className={styles.profileContent}>
                <img src={photo} alt="profile image" className={styles.photo}></img>
                <h1 className={styles.display}>Hello, {info.firstName} {info.lastName}! Your birthday is {info.birthday}.</h1>
            </div>
        </>
    )

}

export default userProfile;