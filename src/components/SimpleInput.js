import { useState } from "react";

const SimpleInput = (props) => {
  // State for the entered name and whether it has been touched
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // Check if the entered name is valid by trimming whitespace
  const enteredNameIsValid = enteredName.trim() !== "";

  // Determine if the name input is in an invalid state
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  // Check if the entered name is valid and set formIsValid accordingly
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  // Handler for changes in the name input
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  // Handler for when the name input loses focus (blurred)
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // Handler for form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // Mark the input as touched
    setEnteredNameTouched(true);

    // Check if the entered name is valid
    if (!enteredNameIsValid) {
      return;
    }

    // Clear the entered name and reset the touched state
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  // Determine the CSS classes for the name input based on its validity
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {/* Display an error message if the name input is invalid */}
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        {/* Disable the Submit button if the form is not valid */}
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
