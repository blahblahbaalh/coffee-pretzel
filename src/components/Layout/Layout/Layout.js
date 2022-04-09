import AvatarHead from "../AvatarHead/AvatarHead";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../../store/AuthContextProvider";

import styles from "./layout.module.css";
import { useContext } from "react";

//Overall Layout for Main page and cafe page
//1. To render avatarHead IOI user has selected an avatar
function Layout({children}){
    const ctx = useContext(AuthContext);

    return(
        <>
        <Navbar/>
        <main className={styles.layout}>
            {children}
        </main>
        {ctx.userAvatar && <AvatarHead peep={ctx.userAvatar}/>}
        </>
    )
}
export default Layout;