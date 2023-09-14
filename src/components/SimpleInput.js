import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  // Validation function for name (non-empty)
  const nameValidation = (value) => value.trim() !== "";

  // Validation function for email (regex pattern)
  const emailValidation = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  // Custom input hooks for name and email
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(nameValidation);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidation);

  let formIsValid = false;

  // Check if both name and email are valid and set formIsValid accordingly
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // Handler for form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // Mark both inputs as touched
    nameInputBlurHandler();
    emailInputBlurHandler();

    // Check if both inputs are valid
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // Clear and reset both inputs
    resetNameInput();
    resetEmailInput();
  };

  // Determine CSS classes for name input based on its validity
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  // Determine CSS classes for email input based on its validity
  const emailInputClasses = emailInputIsInvalid
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
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && <p className="error-text">Email is invalid.</p>}
      </div>
      <div className="form-actions">
        {/* Disable the Submit button if the form is not valid */}
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
