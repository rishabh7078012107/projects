import styles from './Navigation.module.css';
const Navigation=()=>{  // rafce shortcut for this

    return(
        <nav className={styles.container}>
            <div className={styles.logo}>
                <img src="./images/logo.png" alt="do some coding logo" />
            </div>

            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>



    )

}
export default Navigation;