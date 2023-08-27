import styles from '../styles/formContent.module.css'
import { useState } from 'react';

function signUp() {

     // storing the form
     const [form, setForm] = new useState({
        username: "",
        password: "",
        password2: "",
    });

    // check status of sign up
    const [status, setStatus] = new useState("");

    // check if successfully signed up
    const [check, setCheck] = new useState(0);

    // storing potential errors
    const [error, setError] = new useState({});

    // keep track of changes in our form
    function handleChange(e) {
        // storing changes
        const {name, value} = e.target;

        // setting changes
        setForm({...form, [name]: value});

        // resetting errors
        setError({...error, [name]: ''})

        //resetting status
        setStatus("");
    }

    // handle signing up process
    function handleSignUp() {
        fetch('http://localhost:8080/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 409) {
                    setStatus("Username already taken!!!");
                    setCheck(1);
                } else {
                    setStatus("Error when signing up!!");
                    setCheck(1);
                }
            } else {
                setStatus("Successfully Signed Up!!!");
                setCheck(0);
            }
        })
    }

    // handling potential errors when submitting form
    function handleSubmit(e) {
        e.preventDefault();

        const formError = {}

        if (!form.username) {
            formError.username = "username required!";
        }

        if (!form.password) {
            formError.password = "password required!";

        } else if (form.password.length < 8) {
            formError.password = "password needs to be at least 8 characters long!";

        }

        if (!form.password2) {
            formError.password2 = "need to confirm password!";

        } else if (form.password2 != form.password) {
            formError.password2 = "re-entered password does not match with password!";

        }

        // Error in form
        if (Object.keys(formError).length > 0) {
            setError(formError);

        } else {
            handleSignUp();
        }
    }

    return (
        <>
            <form className={styles.formContent} onSubmit={handleSubmit}>
                {check === 0 ? <div className={styles.good}>{status}</div> : <div className={styles.error}>{status}</div>}

                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" value={form.username} onChange={handleChange}></input>
                {error.username && <div className={styles.error}>{error.username}</div>}

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={form.password} onChange={handleChange}></input>
                {error.password && <div className={styles.error}>{error.password}</div>}

                <label htmlFor="password2">Re-enter Password:</label>
                <input type="password" name="password2" id="password2" value={form.password2} onChange={handleChange}></input>
                {error.password2 && <div className={styles.error}>{error.password2}</div>}

                <button className={styles.btn} type='submit'>Submit</button>
            </form>
        </>
    )

}

export default signUp;