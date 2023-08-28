import { useOutletContext } from "react-router-dom";
import {useState} from 'react';
import styles from '../styles/formContent.module.css';

function editProfile() {

    // functionality passed from userPage
    const {setInfo, name} = useOutletContext();

    // keep track of form 
    const [template, setTemplate] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
    })

    // check if changes successfully saved 
    const [check, setCheck] = useState("");

    // storing potential errors
    const [error, setError] = new useState({});
   
    // handling changes to form
    function handleChange(e) {
        const {name, value} = e.target;

        setTemplate({...template, [name]: value});

        // resetting errors
        setError({...error, [name]: ''});

        // resetting check
        setCheck("");
    }

    // handling patching the updated information to database
    function handleUpdate() {
        fetch('http://localhost:8080/api/profile/update/' + name, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
        })
        .then((res) => {
            if (!res.ok) {
                alert("Error when updating information! Please try again.");
            } else {
                setCheck("Changes saved successfully!")
            }
        })
    }

    // handling submit of form
    function handleSubmit(e) {
        e.preventDefault();

        //reseting check
        setCheck("");

        const formError = {}

        if (!template.firstName) {
           formError.firstName = "first-name is required";
        }
        if (!template.lastName) {
            formError.lastName = 'last-name is required';
        }
        if (!template.birthday) {
            formError.birthday = 'birthday is required';
        }

        if (Object.keys(formError).length > 0) {
            setError(formError);

        } else {
            setInfo(template);
            handleUpdate();
        }
    }

    return (
        <>
            <form className={styles.formContent} onSubmit={handleSubmit}>   
                <label htmlFor="firstName">First name: </label>
                <input id="firstName" name="firstName" type="text" onChange={handleChange} value={template.firstName}></input>
                {error.firstName && <div className={styles.error}>{error.firstName}</div>}

                <label htmlFor="lastName">Last name: </label>
                <input id="lastName" name="lastName" type="text" onChange={handleChange} value={template.lastName}></input>
                {error.lastName && <div className={styles.error}>{error.lastName}</div>}

                <label htmlFor="birthday">Birthday: </label>
                <input id="birthday" name="birthday" type="date" onChange={handleChange} value={template.birthday}></input>
                {error.birthday && <div className={styles.error}>{error.birthday}</div>}

                <label htmlFor="gender">Gender: </label>
                <select id="gender" name="gender" onChange={handleChange}> 
                    <option value="">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button className={styles.btn} type="submit">Save Changes</button>

                {<div className={styles.good}>{check}</div>}
            </form>
        </>
    )

}

export default editProfile;