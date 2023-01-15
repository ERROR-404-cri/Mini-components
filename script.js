// Elements
const otpContainer = document.querySelector(".otpContainer");
const submitButton = document.querySelector(".submitBtn");
const digitElements = document.querySelectorAll(".digit");
const digitElementsArray = Array.from(digitElements);

// consts
const allowedDigitKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const allowedHotKeys = [8, 9, 37, 39, 46];
const allowedKeys = [...allowedDigitKeys, ...allowedHotKeys];

otpContainer.addEventListener("keydown", (ev) => {
  console.log(ev);
  if (!allowedKeys.includes(ev.keyCode)) {
    ev.preventDefault();
    return;
  }
  if ((ev.keyCode === 8 && !ev.target.value) || ev.keyCode === 37) {
    ev.target.previousElementSibling?.focus();
  } else if (ev.keyCode === 39) {
    ev.target.nextElementSibling?.focus();
  }
});

otpContainer.addEventListener("keyup", (ev) => {
  if (ev.target.value && allowedDigitKeys.includes(ev.keyCode)) {
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
