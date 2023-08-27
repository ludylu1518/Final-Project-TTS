import styles from '../styles/formContent.module.css';
import {useState} from 'react';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function editSetting() {

     // functionality passed from userPage
    const {name} = useOutletContext();

    // when delete account, navigate to delete page
    const navigate = useNavigate();

    // form tracking for password and errors
    const [pass, setPass] = useState({
        password: "",
        password2: "",
    });
    const [passError, setPassError] = useState({});
    const [passCheck, setPassCheck] = useState("")

    function handlePatchPass() {
        fetch('http://localhost:8080/api/profile/password/update/' + name, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: pass.password,
        })
        .then((res) => {
            if (!res.ok) {
                alert("Error when updating password! Please try again.");
            } else {
                setPassCheck("Successfully update password.");
            }
        })
    }

    function handleChangePass(e) {
        const {name, value} = e.target;
        
        setPass({...pass, [name]: value});

        //reset password error
        setPassError({...passError, [name]: ""});

        //reset password check
        setPassCheck("");
    }

    function handleSubmitPass(e) {
        e.preventDefault();

        const formError = {};

        if (!pass.password) {
            formError.password = "password cannot be blank"
        } else if (pass.password.length < 8) {
            formError.password = "password needs to be at least 8 characters long"
        }

        if (!pass.password2) {
            formError.password2 = "need to confirm password"
        } else if (pass.password2 != pass.password) {
            formError.password2 = "passwords do not match"
        }

        // Error in form
        if (Object.keys(formError).length > 0) {
            setPassError(formError);
        } else {
            // update database process
            handlePatchPass();
        }

    }


    // form tracking for username / deleting account / using dict in case we might want to use more validation in form
    const [userDelete, setUserDelete] = useState({
        username: "",
    });
    const [userError, setUserError] = useState({});

    function handleDeleteAccount() {
        fetch('http://localhost:8080/api/profile/delete/' + name, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                alert("Unable to delete account, time for some debuggin!!!");
            } else {
               navigate('/delete');
            }
        })
    }

    function handleChangeDelete(e) {
        const {name, value} = e.target;

        setUserDelete({...username, [name]: value});

        // resetting error
        setUserError("");
    }

    function handleSubmitDelete(e) {
        e.preventDefault();

        const deleteError = {};

        if (userDelete.username === "") {
            deleteError.username = "username cannot be blank";
        } else if (userDelete.username != name) {
            deleteError.username = "username is incorrect, you can see your username in the Home tab";
        }

        // form errors found
        if (Object.keys(deleteError).length > 0) {
            setUserError(deleteError);
        } else {
            // deleting account 
            handleDeleteAccount();
        }
       
    }

    return (
        <>
            <div>
                <div>
                    <h1>Change Password</h1>
                    {<div className={styles.good}>{passCheck}</div>}

                    <form className={styles.formContent} onSubmit={handleSubmitPass}>                    
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" onChange={handleChangePass}></input>  
                        {passError.password && <div className={styles.error}>{passError.password}</div>}
                                            
                        <label htmlFor="password2">Confirm Password: </label>
                        <input type="password" id="password2" name="password2" onChange={handleChangePass}></input>
                        {passError.password2 && <div className={styles.error}>{passError.password2}</div>}
                                
                        <button className={styles.btn} type="submit">Confirm</button>
                    </form>
                </div>
                
                <div className={styles.splitContent}>
                    <h1>Delete Account</h1>
                    <h3>To Delete your account, enter username below.</h3>
                    <h3>Note, once account is deleted,</h3>
                    <h3>there is no way to recover it!</h3>

                    <form className={styles.formContent} onSubmit={handleSubmitDelete}>
                        <label htmlFor='username'>Username: </label>
                        <input type='text' id='username' name='username' onChange={handleChangeDelete}></input>
                        {userError.username && <div className={styles.error}>{userError.username}</div>}

                        <button className={styles.btnDelete} type="submit">Delete</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default editSetting;