import { useCallback, useState } from "react";

const defaultValidation = (input) => true;

function useInput(otherValidation = defaultValidation){

    //(1) STATES
    const [ input, setInput ] = useState("");
    const [ isTouched, setIsTouched ] = useState(false);
    const [ error, setError ] = useState("");

    //(2) VALIDITY
    const inputIsValid =  input && input.trim() !== "" && otherValidation(input);
    const inputHasError = !inputIsValid && error !== "";


    const handleInput = useCallback((value) => {
        console.log("input", typeof value);
        setInput(value)
        setIsTouched(true);
        setError("");
    }, []);


    const handleIsTouched = () => {
        setIsTouched(true);
    }

    const handleError = (msg) => {
        setError(msg);
    }

    const setReset = () => {
        setInput("");
        setIsTouched(false);
        setError("");
    }

    return {
        input,
        isTouched,
        error,
        inputIsValid,
        inputHasError,
        handleError,
        handleInput,
        handleIsTouched,
        setReset
    }
}

export default useInput;
