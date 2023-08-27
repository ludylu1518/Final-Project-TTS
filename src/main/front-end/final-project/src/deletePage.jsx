import styles from './styles/deletePage.module.css';

function deletePage() {

    return (
        <>
        <div className={styles.content}>
             <h1 className={styles.title}>Account Successfully Deleted!</h1>

            <div className={styles.links}>
                <a href="/">Home</a>
                <a href="/login">Return Login</a>
            </div>
        </div>
        </>
    )

}

export default deletePage;