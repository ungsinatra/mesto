function showInputError(formElement, formInput, errorMessage) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("poup__input-error");
  return errorElement;
}

function hideInputError(formElement, formInput) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("poup__input-error");
  formInput.classList.remove("popup__input_type_error");
}

function hasInvalidInputs(inputLists) {
  return inputLists.some((input) => {
    return !input.validity.valid;
  });
}

function toggleSubmitBtn(inputList, btn) {
  if (hasInvalidInputs(inputList)) {
    btn.setAttribute("disabled", true);
    btn.classList.add("popup__btn-inactive");
  } else {
    btn.removeAttribute("disabled");
    btn.classList.remove("popup__btn-inactive");
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
  const submitButton = formElement.getElementsByTagName("button")[0];
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.popupInput)
  );
  toggleSubmitBtn(inputList, submitButton);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      validationForms(formElement, input);
      toggleSubmitBtn(inputList, submitButton);
    });
  });
}

function enableValidation() {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    setListenerInputs(form);
  });
}
enableValidation();
