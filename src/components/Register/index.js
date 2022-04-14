import { useContext, useState } from "react";
import FormLayout from "../Layout/FormLayout/FormLayout";
import Accordian from "../UI/Accordian/Accordian";
import RegisterDrinks from "./RegisterDrinks";
import RegisterLocation from "./RegisterLocation";
import RegisterSetToDo from "./RegisterSetToDo";
import RegisterSignName from "./RegisterSignName";
import { UserContext, USER_ACTIONS } from "../../store/user-context";

import styles from "./register.module.css";
import { useNavigate } from "react-router";

function RegisterPage(){
    //(A) STATES
    const [ selectedAcc, setSelectedAcc] = useState(0);
    const [ inputs, setInputs ] = useState({
        "location": null,
        "todos": null,
        "drink": null,
        "username": null
    });
    const ctx = useContext(UserContext);
    const navigate = useNavigate();

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
            children: <RegisterLocation onSetInputs={onSetInputs} id="location" inputs={inputs["location"]}/>,
        },
        {
            id: "drink",
            disabled: false,
            formLayoutHeader: "Brew Your Drink",
            accordianHeader: "Drink",
            children: <RegisterDrinks onSetInputs={onSetInputs} id="drink" inputs={inputs["drink"]}/>,
        },
        {
            id: "todos",
            disabled: false,
            formLayoutHeader: "Set Your Tasks",
            accordianHeader: "Set Todo",
            children: <RegisterSetToDo onSetInputs={onSetInputs} id="todos"/>,
        },
        {
            id: "username",
            disabled: false,
            formLayoutHeader: "Sign Your Name",
            accordianHeader: "Order",
            children: <RegisterSignName onSetInputs={onSetInputs} id="username" inputs={inputs["username"]}/>,
        },
    ];

    const proceedDisabled = !inputs.username || inputs.username.trim() === "";

    const handleProceed = () => {
        ctx.dispatchUser({type: USER_ACTIONS.CREATE_USER, payload: inputs});
        navigate(`/cafe/${inputs.location}`); 
    }


    return(
        <FormLayout h1={accordianContent[selectedAcc].formLayoutHeader} handleSubmit={handleProceed} disabled={proceedDisabled} buttonText={(selectedAcc=== accordianContent.length-1) && "Proceed"} >
            {
                JSON.stringify(ctx.user)
            }
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