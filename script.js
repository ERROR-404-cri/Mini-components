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
  tab: 9,
  leftShift: 16,
};

otpContainer.addEventListener("keyup", (ev) => {
  if (
    !allowedKeys.includes(ev.target.value) &&
    !allowedKeys.includes(ev.keyCode)
  ) {
    ev.target.value = "";
    return;
  }
  if (
    ev.keyCode === hotKeysMapping.tab ||
    ev.keyCode === hotKeysMapping.leftShift
  ) {
    return;
  } else if (ev.key === "ArrowLeft") {
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
  // backspace handling only
  if (ev.keyCode === hotKeysMapping.backspace && !ev.target.value) {
    ev.target.previousElementSibling?.focus();
  } else if (ev.keyCode === hotKeysMapping.backspace && ev.target.value) {
    ev.target.value = "";
  }
});

submitButton.addEventListener("click", () => {
  clearOtpsOnSubmit();
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
  updateSubmitButton();
};

const fillOtpsOnPaste = (digits) => {
  digitElements.forEach((digitEle, index) => (digitEle.value = digits[index]));
  updateSubmitButton();
};

otpContainer.addEventListener("paste", async (ev) => {
  ev.preventDefault();
  try {
    const clipBoardText = await navigator.clipboard.readText();
    if (clipBoardText && clipBoardText.length === 6) {
      const copiedTextArray = clipBoardText.split("");
      const isValidText = copiedTextArray.every((text) =>
        allowedDigits.includes(text)
      );
      if (isValidText) {
        fillOtpsOnPaste(copiedTextArray);
        submitButton.focus();
      }
    }
  } catch {}
});
