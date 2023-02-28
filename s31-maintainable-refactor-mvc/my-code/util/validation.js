function postIsValid(title, content) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function signupInputIsValid(inputData) {
  return (
    inputData.email || inputData.confirmEmail || inputData.password
    // || inputData.email.includes("@")
  );
}

module.exports = {
  postIsValid: postIsValid,
  signupInputIsValid: signupInputIsValid,
};
