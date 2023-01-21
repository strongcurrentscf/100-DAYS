const inputElement = document.getElementById("product-name");
const remainingCharsElement = document.querySelector(".some-class");
const maxLength = inputElement.maxLength;

function updateRemainingChars(e) {
  const enteredText = e.target.value;
  const enteredTextLength = enteredText.length;

  const remainingChars = maxLength - enteredTextLength;

  remainingCharsElement.textContent = remainingChars;

  //   remainingChars.textContent = maxLength - inputElement.value.length;

  if (remainingChars === 0) {
    inputElement.classList.add("error");
    remainingCharsElement.classList.add("error");
  } else if (remainingChars <= 10) {
    inputElement.classList.add("warn");
    remainingCharsElement.classList.add("warn");
    inputElement.classList.remove("error");
    remainingCharsElement.classList.remove("error");
  } else {
    inputElement.classList.remove("warn");
    remainingCharsElement.classList.remove("warn");
    inputElement.classList.remove("error");
    remainingCharsElement.classList.remove("error");
  }
}

inputElement.addEventListener("input", updateRemainingChars);
