import {useState} from 'react';
import styles from '../styles/formContent.module.css';
import styles2 from '../styles/loginPage.module.css';

function forgotPassword() {

    // keep track of form, using a dict in case we might want to add more validation in form.
    const [form, setForm] = useState({
        username: "",
    });

    // keep track of error
    const [error, setError] = useState({});

    // keep track of status
    const [status, setStatus] = useState("");

    // keep track if successful retrieving password or not
    const [check, setCheck] = useState(0);

    // handles changes to form
    function handleChange(e) {
        const {name, value} = e.target;
       
        // setting changes
        setForm({...form, [name]: value});

        // resetting errors
        setError({...error, [name]: ''});
    }

    function handleFetchPassword() {
        fetch('http://localhost:8080/api/profile/password/' + form.username)
        .then((res) => {
            if (!res.ok) {
                if (res.status === 404) {
                    setStatus("Username not in the database, please sign up!");
                    setCheck(1);
                } else {
                    setStatus("Other errors when retrieving data.")
                    setCheck(1);
                }
                return null;
            } else {
                return res.text();
            }            
        }) 
        .then((data) => {
            if (data != null) {
                setStatus("Your password is: " + data);
                setCheck(0);
            }
        })       
    }

    // handles submitting form
    function handleSubmit(e) {
        e.preventDefault();

        // resetting status each submit attempt
        setStatus("");

        const formError = {};

        if (!form.username) {
           formError.username = "Username cannot be blank";
        }

        // Error in form
        if (Object.keys(formError).length > 0) {
            setError(formError);

        } else {
            // handle fetch data
            handleFetchPassword();
        }
    }

    return (
        <>
            <div className={styles2.page}>
                <h2>To retrieve your password, please enter your username below.</h2>
                {check === 0 ? <div className={styles.good}>{status}</div> : <div className={styles.error}>{status}</div>}

                <div className={styles2.content}>
                    <form className={styles.formContent} onSubmit={handleSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" onChange={handleChange} value={form.username}></input>
                        {error.username && <div className={styles.error}>{error.username}</div>}

                        <button className={styles.btn} type="submit">Submit</button>
                    </form>

                    <div className={styles2.links}>
                        <a href="/login">Return to Login</a>
                        <a href="/">Home</a>
                    </div>
                </div>
            </div>
        </>
    )

}

export default forgotPassword;