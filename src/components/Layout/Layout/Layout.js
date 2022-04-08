import Navbar from "../Navbar/Navbar";
import styles from "./layout.module.css";

//Overall Layout for Main page and cafe page
//1. To render avatarHead IOI user has selected an avatar
function Layout({children}){

    return(
        <>
        <Navbar/>
        <main className={styles.layout}>
            {children}
        </main>
        </>
    )
}
export default Layout;