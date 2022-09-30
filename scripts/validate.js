const popupSelecors = {
  popupInput: ".popup__input",
  popupInputTypeEror: "popup__input_type_error",
  popupInputError: "poup__input-error",
  popupForm: ".popup__form",
  popupInactiveBtn: "popup__btn-inactive",
  button: "button",
};

function enableValidation(selectorsPopup) {
  const forms = Array.from(document.querySelectorAll(selectorsPopup.popupForm));
  forms.forEach((form) => {
    setListenerInputs(form);
  });
}
function showInputError(formElement, formInput, errorMessage) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(popupSelecors.popupInputTypeEror);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupSelecors.popupInputError);
  return errorElement;
}

function hideInputError(formElement, formInput) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(popupSelecors.popupInputError);
  formInput.classList.remove(popupSelecors.popupInputTypeEror);
}

function hasInvalidInputs(inputLists) {
  return inputLists.some((input) => {
    return !input.validity.valid;
  });
}

function toggleSubmitBtn(inputList, btn) {
  if (hasInvalidInputs(inputList)) {
    btn.setAttribute("disabled", true);
    btn.classList.add(popupSelecors.popupInactiveBtn);
  } else {
    btn.removeAttribute("disabled");
    btn.classList.remove(popupSelecors.popupInactiveBtn);
  }
}

function validationForms(formElement, formInput) {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
}

function setListenerInputs(formElement) {
  const submitButton = formElement.getElementsByTagName(
    popupSelecors.button
  )[0];
  const inputList = Array.from(
    formElement.querySelectorAll(popupSelecors.popupInput)
  );
  toggleSubmitBtn(inputList, submitButton);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      validationForms(formElement, input);
      toggleSubmitBtn(inputList, submitButton);
    });
  });
}

enableValidation(popupSelecors);
