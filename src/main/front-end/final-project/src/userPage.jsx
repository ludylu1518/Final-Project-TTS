import NavBar from './userContent/navBar.jsx'
import { Outlet } from 'react-router-dom';
import styles from './styles/userPage.module.css';
import {useState, useEffect} from 'react';

function userPage() {

    const [info, setInfo] = new useState({});
    const name = JSON.parse(localStorage.getItem("username"));

    useEffect(() => {
        fetch('http://localhost:8080/api/profile/info/' + name)
        .then((res) => res.json())
        .then((data) => {
            setInfo(data)
        })
        .catch((error) => {
            console.error('Error: ', error);
            alert("Error when retrieving information from database please refresh or logout and login again!");
        })
    }, []);
    
    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <Outlet context={{info, setInfo, name}}/>
            </div>
        </>
    )

}

export default userPage;