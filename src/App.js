import "./global.css";
import "./globalAnimation.css";
import Navbar from "./components/common/Navbar/Navbar";
import Main from "./components/pages/Main/Main";
import AvatarHead from "./components/common/AvatarHead/AvatarHead";
import { useContext} from "react";
import AuthContext from "./store/AuthContextProvider";

function App() {
  const {userAvatar, notification} = useContext(AuthContext);
  console.log("APP userAvatar", userAvatar);

  return (
    <>
   <Navbar />
   <Main />
   {userAvatar && <AvatarHead peep={userAvatar} notification={notification}/>}
    </>
  );
}

export default App;
