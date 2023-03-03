function postIsValid(title, content) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function signupInputIsValid(email, confirmEmail, password) {
  return email && confirmEmail && password && email.includes("@");
}

module.exports = {
  postIsValid: postIsValid,
  signupInputIsValid: signupInputIsValid,
};
