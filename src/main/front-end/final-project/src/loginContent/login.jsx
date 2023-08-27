import styles from '../styles/formContent.module.css'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../helper/useLocalStorage';

//use local storage react hook to pass info to userPage

function login() {
  
    // store username to be pass to userPage
    const [username, setUsername] = useLocalStorage("username", "");

    // check status of login
    const [status, setStatus] = useState("");

    // use to navigate to user page after successfully login
    const navigate = useNavigate();  

    // storing the form
    const [form, setForm] = new useState({
        username: "",
        password: "",
    });

    // storing potential errors
    const [error, setError] = new useState({});

    // keep track of changes in our form
    function handleChange(e) {
        // storing changes
        const {name, value} = e.target;

        // setting changes
        setForm({...form, [name]: value});

        // resetting errors
        setError({...error, [name]: ''});

        //resetting status
        setStatus("");
    }

    function handleLogin() {
        fetch('http://localhost:8080/api/profile/' + form.username + '/' + form.password)
        .then((res) => {
            if (res.ok) {
                navigate('/user')
            } else if (res.status === 404) {
               setStatus("Username not found! Please sign up.");
            } else if (res.status === 406) {
                setStatus("Password is incorrect!");
            } else {
                setStatus("Error when logining in!")
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

        // Error in form
        if (Object.keys(formError).length > 0) {
            setError(formError);

        } else {
            setUsername(form.username);
            handleLogin();
        }
    }
 
    return (
        <>      
            <form className={styles.formContent} onSubmit={handleSubmit}>
                {status && <div className={styles.error}>{status}</div>}

                <label htmlFor="username">Username: </label>
                <input name="username" id="username" type="text" value={form.username} onChange={handleChange}></input>
                {error.username && <div className={styles.error}>{error.username}</div>}

                <label htmlFor="password">Password: </label>
                <input name="password" id="password" type="password" value={form.password} onChange={handleChange}></input>
                {error.password && <div className={styles.error}>{error.password}</div>}

                <button className={styles.btn} type='submit'>Submit</button>
            </form>

        </>
    )

}

export default login;