import "./global.css";
import "./globalAnimation.css";
import Navbar from "./components/common/Navbar/Navbar";
import Main from "./components/pages/Main/Main";
import AvatarHead from "./components/common/AvatarHead/AvatarHead";

const userData = {
  userId: 1,
  peep: "peep1",
  name: "Mr Blah",
  notification: 1,
  message: "ehhlloo",

}

function App() {
  return (
    <>
   <Navbar />
   <Main />
   {userData.peep && <AvatarHead peep={userData.peep} notification={userData.notification}/>}
    </>
  );
}

export default App;
