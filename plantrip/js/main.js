"use strict";

const inputs = [].slice.call(document.querySelectorAll(`.input`));
const passwordSwitchers = [].slice.call(document.querySelectorAll(`.auth__password-switcher`));
const registerLink = document.querySelector(`#register`);
const forgotLink = document.querySelector(`#forgot`);
const backArrows = [].slice.call(document.querySelectorAll(`.auth__back-arrow`));

function inputPlaceholderHandler() {
    this.value ? this.classList.add(`input--filled`) : this.classList.remove(`input--filled`);
};
function passwordViewSwitch() {
    const passwordInput = this.parentNode.querySelector(`.auth__input--password`);

    if (this.classList.contains(`auth__password-switcher--active`)) {
        passwordInput.type = `password`;
        this.classList.remove(`auth__password-switcher--active`);
    } else {
        passwordInput.type = `text`;
        this.classList.add(`auth__password-switcher--active`);
    }
}

function changeActiveAuthForm(activeFormId) {
    const authForms = [].slice.call(document.querySelectorAll(`.auth__wrapper`));
    const activeForm = document.querySelector(`#${activeFormId}`);
    
    authForms.forEach(function(item) {
        item.classList.remove(`auth__wrapper--active`);
    });

    activeForm.classList.add(`auth__wrapper--active`);

}

inputs.forEach(function(item) {
    item.addEventListener(`input`, inputPlaceholderHandler);
});

passwordSwitchers.forEach(function(item) {
    item.addEventListener(`click`, passwordViewSwitch);
});

registerLink.addEventListener(`click`, changeActiveAuthForm.bind(null, `authRegister`));
forgotLink.addEventListener(`click`, changeActiveAuthForm.bind(null, `authReset`));

backArrows.forEach(function(item) {
    item.addEventListener('click', changeActiveAuthForm.bind(null, `auth`))
})


