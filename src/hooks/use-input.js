import { useState } from "react";

// Custom hook for handling input fields with validation
const useInput = (validationFn) => {
  // State to store the input value
  const [value, setValue] = useState("");

  // State to track whether the input has been touched (blurred)
  const [isTouched, setIsTouched] = useState(false);

  // Determine if the current input value is valid based on the provided validation function
  const isValid = validationFn(value);

  // Determine if the input is invalid when it's touched and not valid
  const inputIsInvalid = !isValid && isTouched;

  // Handler to update the input value when it changes
  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  // Handler to mark the input as touched (blurred)
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // Reset the input value and touched state to their initial values
  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  // Return an object containing the input state and handlers
  return {
    value, // The current input value
    isValid, // Whether the input value is valid
    inputIsInvalid, // Whether the input is invalid
    valueChangeHandler, // Handler for input value changes
    inputBlurHandler, // Handler for input blur events
    reset, // Function to reset the input
  };
};

export default useInput;
