class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputLists = Array.from(this._form.querySelectorAll(this._selectors.popupInput));
    this._saveButton = this._form.querySelector(this._selectors.buttonSave);
  }
  enableValidation() {
    this._setListenerInputs();
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
  _hasInvalidInputs() {
    return this._inputLists.some((input) => {
      return !input.validity.valid;
    });
  }
  _toggleSubmitBtn() {
    if (this._hasInvalidInputs()) {
      this._saveButton.setAttribute("disabled", true);
      this._saveButton.classList.add(this._selectors.popupInactiveBtn);
    } else {
      this._saveButton.removeAttribute("disabled");
      this._saveButton.classList.remove(this._selectors.popupInactiveBtn);
    }
  }
  _validationForms(formInput) {
    if (!formInput.validity.valid) {
      this._showError(formInput, formInput.validationMessage);
    } else {
      this._hideError(formInput);
    }
  }
  _setListenerInputs() {
    this._toggleSubmitBtn();
    this._inputLists.forEach((input) => {
      input.addEventListener("input", () => {
        this._validationForms(input);
        this._toggleSubmitBtn();
      });
    });
  }
}
export { FormValidator };
