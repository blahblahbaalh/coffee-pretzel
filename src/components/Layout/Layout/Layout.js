import AvatarHead from "../AvatarHead/AvatarHead";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../../store/UserContextProvider";


import styles from "./layout.module.css";
import { useContext } from "react";

//Overall Layout for Main page and cafe page
//1. To render avatarHead IOI user has selected an avatar
function Layout({children}){
    const ctx = useContext(UserContext);

    return(
        <>
        <Navbar/>
        <main className={styles.layout}>
            {children}
        </main>
        {ctx.user.userAvatar && <AvatarHead peep={ctx.user.userAvatar}/>}
        </>
    )
}
export default Layout;