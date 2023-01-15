// Elements
const otpContainer = document.querySelector(".otpContainer");
const submitButton = document.querySelector(".submitBtn");
const digitElements = document.querySelectorAll(".digit");
const digitElementsArray = Array.from(digitElements);

// consts
const allowedDigitKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allowedHotKeys = [
  "Backspace",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Delete",
];
const allowedKeys = [...allowedDigitKeys, ...allowedHotKeys];

otpContainer.addEventListener("keydown", (ev) => {
  if (!allowedKeys.includes(ev.key)) {
    ev.preventDefault();
    return;
  }
  if ((ev.key === "Backspace" && !ev.target.value) || ev.key === "ArrowLeft") {
    ev.target.previousElementSibling?.focus();
  } else if (ev.key === "ArrowRight") {
    ev.target.nextElementSibling?.focus();
  }
});

otpContainer.addEventListener("keyup", (ev) => {
  if (ev.target.value && allowedDigitKeys.includes(ev.key)) {
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
