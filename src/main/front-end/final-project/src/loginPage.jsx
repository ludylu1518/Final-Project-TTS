import Login from './loginContent/login.jsx';
import SignUp from './loginContent/signUp.jsx';
import React, {useState, useEffect} from 'react';
import styles from './styles/loginPage.module.css'

function loginPage() {

    // names of potential tabs in our login page
    const tabList = ['Login', 'Signup'];

    // check which tab is currently active, default is login tab
    const [active, setActive] = new useState('Login');

    // contain the content of the current active tab
    const [current, setCurrent] = new useState(<Login />);
    
    // when active tab changes, the content will update with the corresponding tab
    useEffect(() => {
       if (active) {
            switch (active) {
                case 'Login':
                    return setCurrent(<Login />);
                case 'Signup':
                    return setCurrent(<SignUp />);
                default:
                    return null;
            }
       }
    }, [active])

    return (
        <>
            <div className={styles.page}>
                <div className={styles.tabs}>
                   {/* map through tabList, for each tab create a tab button */}
                    {tabList.map(tab => (
                        <button key={tab} 
                        className={active === tab ? styles.activeTab : ""} 
                        onClick={() => setActive(tab)}>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className={styles.content}>
                {current}
                </div>

                <div className={styles.links}>
                    <a href='/password'>Forgot Password</a>
                    <a href='/'>Home</a>
                </div>
            </div>
        </>
    )

}

export default loginPage;