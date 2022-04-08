import { useEffect, useState} from "react";
import styles from "./carousel.module.css";

function Carousel({carouselArray, onSetIsLast, className}){

    //A1) For carousel content in SectionA
    const [index, setIndex ] = useState(0);
    const carouselLength = carouselArray.length;

    //A2) For carousel timer rotation
    useEffect(() => {
        const carouselTimer = setTimeout(() => {
            if(index === (carouselLength-1)){
                return;
            }
            setIndex(prev => prev + 1)
        }, 4500);
        return () => {
            clearTimeout(carouselTimer);
            if (index === (carouselLength -2)){
                onSetIsLast();
            }
        };
    }, [index, carouselLength, onSetIsLast]);


    return(
       <div className={`${styles.carousel} ${className} container`}>
           {carouselArray[index].h1}
           <img className={styles.animate} src={carouselArray[index].img} alt={carouselArray[index].img} />
       </div>
    )
}

export default Carousel;