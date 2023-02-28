function getSessionErrorData(req, defaultValues) {
  let sessionErrorData = req.session.inputData;

  if (!sessionErrorData) {
    sessionErrorData = {
      hasError: false,
      ...defaultValues,
    };
  }

  req.session.inputData = null;

  return sessionErrorData;
}

function flashErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };

  req.session.save(action);
}

function getSignupErrorData(inputData) {
  let errorLog = {
    hasError: true,
    message: "Invalid data input - please check your data.",
    email: inputData.enteredEmail,
    confirmEmail: inputData.enteredConfirmEmail,
    password: inputData.enteredPassword,
  };

  if (inputData.enteredPassword.trim().length < 6) {
    errorLog.message = "Password must be at least 6 characters long.";
  }
  if (inputData.enteredEmail !== inputData.enteredConfirmEmail) {
    errorLog.message = "Please confirm email inputs are matching.";
  }

  return errorLog;
}

function getExistingUser() {}

// function flashSignupErrorsToSession(req, data, error, action) {
//   const userData = req.body;
//   const enteredEmail = userData.email;
//   const enteredConfirmEmail = userData["confirm-email"];
//   const enteredPassword = userData.password;

//   req.session.inputData = {
//     hasError: true,
//     errorMessage: error,
//     ...data,
//   };

//   if (
//     !enteredEmail ||
//     !enteredConfirmEmail ||
//     !enteredPassword ||
//     !enteredEmail.includes("@")
//   ) {
//     sessionErrorData.message = "Invalid data input - please check your data.";
//   } else if (enteredPassword.trim().length < 6) {
//     sessionErrorData.message = "Password must be at least 6 characters long.";
//   } else if (enteredEmail !== enteredConfirmEmail) {
//     sessionErrorData.message = "Please confirm email inputs are matching.";
//   }

//   req.session.save(action);
// }

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
  getSignupErrorData: getSignupErrorData,
  // flashSignupErrorsToSession: flashSignupErrorsToSession,
};
