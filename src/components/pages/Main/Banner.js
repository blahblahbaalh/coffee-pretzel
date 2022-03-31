import { useEffect, useState} from "react";
import ButtonDown from "../../UI/ButtonDown/ButtonDown";
import styles from "./main.module.css";
import icecoffee from "../../../assets/common/icecoffee.png";
import pretzel from "../../../assets/common/pretzel.png";
import polaroid from "../../../assets/main/polaroid.png";

function Banner(){

    //A1) For carousel content in SectionA
    const [carouselNum, setCarouselNum ] = useState(0);
    const sectionAContent = [
        {
            img: icecoffee,
            textH1: <h1>Stay <br/> motivated and focus on completing your tasks.</h1>,
            textP: <p>Enjoy a cup of drink in one of Coffee&Pretzel’s scenic cafe around the world.</p>
        },
        {
            img: pretzel,
            textH1: <h1>Set <br/> a pomodoro and join others in being productive for the day</h1>,
            textP: null,
        }
    ];
    const carouselLength = sectionAContent.length;

    //A2) For carousel timer rotation
    useEffect(() => {
        const carouselTimer = setTimeout(() => {
            if(carouselNum === (carouselLength-1)){
                return setCarouselNum(0)
            }
            setCarouselNum(prev => prev + 1)
        }, 8000);
        return () => clearTimeout(carouselTimer);
    }, [carouselNum, carouselLength]);

    return(
        <header className={styles.banner}>
            <div className={`${styles.carousel} container`}>
                <img className={`${styles.carouselBg} `} src={polaroid} alt="carousel-bg" />
                <img className={`${styles.carouselImg} animateJingle`} src={sectionAContent[carouselNum].img} alt={`carousel-${carouselNum}-img`} />
            </div>
            <div className="container"> 
                {sectionAContent[carouselNum].textH1}
                {sectionAContent[carouselNum].textP}
                {
                    !sectionAContent[carouselNum].textP && <ButtonDown >ME WANT</ButtonDown>
                }
            </div>
        </header>
    )
}

export default Banner;