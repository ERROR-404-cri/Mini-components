// Elements
const otpContainer = document.querySelector(".otpContainer");
const submitButton = document.querySelector(".submitBtn");
const digitElements = document.querySelectorAll(".digit");
const digitElementsArray = Array.from(digitElements);

// consts
const allowedDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allowedHotKeys = [8, 9, 37, 39, 46]; // backspace, tab, arrowLeft, arrowRight, delete
const allowedKeys = [...allowedDigits, ...allowedHotKeys];
const hotKeysMapping = {
  backspace: 8,
};

otpContainer.addEventListener("keyup", (ev) => {
  if (
    !allowedKeys.includes(ev.target.value) &&
    !allowedKeys.includes(ev.keyCode)
  ) {
    ev.target.value = "";
    return;
  }

  if (ev.key === "ArrowLeft") {
    ev.target.previousElementSibling?.focus();
  } else if (
    ev.key === "ArrowRight" ||
    (ev.target.value && allowedDigits.includes(ev.target.value))
  ) {
    ev.target.nextElementSibling?.focus();
  }
  updateSubmitButton();
});

otpContainer.addEventListener("keydown", (ev) => {
  if (ev.keyCode === hotKeysMapping.backspace && !ev.target.value) {
    ev.target.previousElementSibling?.focus();
  } else if (ev.keyCode === hotKeysMapping.backspace && ev.target.value) {
    ev.target.value = "";
  }
});

submitButton.addEventListener("click", () => {
  clearOtpsOnSubmit();
  updateSubmitButton();
});

const isOtpValidated = () => {
  return digitElementsArray.every((digitElement) => !!digitElement.value);
};

const updateSubmitButton = () => {
  const isOtpValid = isOtpValidated();
  if (isOtpValid) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }
};

const clearOtpsOnSubmit = () => {
  digitElements.forEach((digitEle) => (digitEle.value = ""));
};

// paste functionality if the input is correct (6 numbers). // todo
// change for mweb
