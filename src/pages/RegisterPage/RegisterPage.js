import { useState } from "react";
import FormLayout from "../../components/Layout/FormLayout/FormLayout";
import Accordian from "../../components/UI/Accordian/Accordian";
import RegisterPageDrinks from "./RegisterPageDrinks";
import RegisterPageLocation from "./RegisterPageLocation";
import RegisterPageSetTodo from "./RegisterPageSetToDo";
import RegisterPageSignName from "./RegisterPageSignName";

import styles from "./registerpage.module.css";

function RegisterPage(){
    //(A) STATES
    const [ selectedAcc, setSelectedAcc] = useState(0);
    const [ inputs, setInputs ] = useState({
        "location": null,
        "todos": null,
        "drinks": null,
        "name": null
    });

    //(B) Parent<-- Child(Accordian): To toggle accordian open and close
    const onSetSelectedAcc = (id) => {
        setSelectedAcc(id);
    }

    //(C) Parent<--Child(accordianContent.children): To pass selected input + autoset UI to next accordian
    const onSetInputs = (id, newInput) => {
        setInputs(prev => ({
            ...prev,
            [id]: newInput
        }));
        setSelectedAcc(prev => (prev === accordianContent.length-1) ? prev : prev + 1);
    }

    //(B) FORM CONTENT to map
    const accordianContent = [
        {
            id: "location",
            disabled: false,
            formLayoutHeader: "Pick Your Location",
            accordianHeader: "Location",
            children: <RegisterPageLocation onSetInputs={onSetInputs} id="location" inputs={inputs["location"]}/>,
        },
        {
            id: "drinks",
            disabled: false,
            formLayoutHeader: "Brew Your Drink",
            accordianHeader: "Drinks",
            children: <RegisterPageDrinks onSetInputs={onSetInputs} id="drinks" inputs={inputs["drinks"]}/>,
        },
        {
            id: "todos",
            disabled: false,
            formLayoutHeader: "Set Your Tasks",
            accordianHeader: "Set Todo",
            children: <RegisterPageSetTodo onSetInputs={onSetInputs} id="todos" inputs={inputs["todos"]}/>,
        },
        {
            id: "name",
            disabled: false,
            formLayoutHeader: "Sign Your Name",
            accordianHeader: "Order",
            children: <RegisterPageSignName onSetInputs={onSetInputs} id="name" inputs={inputs["name"]}/>,
        },
    ];


    return(
        <FormLayout h1={accordianContent[selectedAcc].formLayoutHeader} buttonText={!inputs["name"] && "Proceed"} >
            {
                JSON.stringify(inputs)
            }
            {
                accordianContent.map((each, index) => (
                    <Accordian key={index} id={index} selectedAcc={selectedAcc} onSetSelectedAcc={onSetSelectedAcc} disabled={!inputs[each.id] || index === selectedAcc} accordianHeader={each.accordianHeader}>
                        {each.children}
                    </Accordian>
                ))
            }
        </FormLayout>
    )
};

export default RegisterPage;