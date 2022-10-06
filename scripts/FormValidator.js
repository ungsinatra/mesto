class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }
  enableValidation() {
    this._setListenerInputs(this._form);
  }
  _hideError(formInput) {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._selectors.popupInputError);
    formInput.classList.remove(this._selectors.popupInputTypeEror);
  }
  _showError(formInput, errorMessage) {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._selectors.popupInputTypeEror);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.popupInputError);
    return errorElement;
  }
  _hasInvalidInputs(inputLists) {
    return inputLists.some((input) => {
      return !input.validity.valid;
    });
  }
  _toggleSubmitBtn(inputList, btn) {
    if (this._hasInvalidInputs(inputList)) {
      btn.setAttribute("disabled", true);
      btn.classList.add(this._selectors.popupInactiveBtn);
    } else {
      btn.removeAttribute("disabled");
      btn.classList.remove(this._selectors.popupInactiveBtn);
    }
  }
  _validationForms(formInput) {
    if (!formInput.validity.valid) {
      this._showError(formInput, formInput.validationMessage);
    } else {
      this._hideError(formInput);
    }
  }
  _setListenerInputs(formElement) {
    const submitButton = formElement.getElementsByTagName(
      this._selectors.button
    )[0];
    const inputList = Array.from(
      formElement.querySelectorAll(this._selectors.popupInput)
    );
    this._toggleSubmitBtn(inputList, submitButton);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._validationForms(input);
        this._toggleSubmitBtn(inputList, submitButton);
      });
    });
  }
}
export { FormValidator };
