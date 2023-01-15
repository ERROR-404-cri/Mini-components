// Elements
const otpContainer = document.querySelector(".otpContainer");
const submitButton = document.querySelector(".submitBtn");
const digitElements = document.querySelectorAll(".digit");
const digitElementsArray = Array.from(digitElements);

// consts
const allowedDigitKeys = [
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
];
const allowedHotKeys = [
  "Backspace",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Delete",
];
const allowedKeys = [...allowedDigitKeys, ...allowedHotKeys];

otpContainer.addEventListener("keydown", (ev) => {
  console.log(ev);
  if (!allowedKeys.includes(ev.code)) {
    ev.preventDefault();
    return;
  }
  if (
    (ev.code === "Backspace" && !ev.target.value) ||
    ev.code === "ArrowLeft"
  ) {
    ev.target.previousElementSibling?.focus();
  } else if (ev.code === "ArrowRight") {
    ev.target.nextElementSibling?.focus();
  }
});

otpContainer.addEventListener("keyup", (ev) => {
  if (ev.target.value && allowedDigitKeys.includes(ev.code)) {
    ev.target.nextElementSibling?.focus();
  }
  updateSubmitButton();
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
