"use strict";

const auth = document.querySelector(`.auth`);
const inputs = [].slice.call(document.querySelectorAll(`.input,.textarea`));
const displayButtonContainer = document.querySelector(`.displayButtons`); 
const listSortArrow = document.querySelector(`.list__sort-arrow`);
const menuButton = document.querySelector(`#menuButton`);
const createNewButton = document.querySelector(`#createNew`);

if (auth) {
	const passwordSwitchers = [].slice.call(
		document.querySelectorAll(`.auth__password-switcher`)
	);
	const registerLink = auth.querySelector(`#register`);
	const forgotLink = auth.querySelector(`#forgot`);
	const backArrows = [].slice.call(
		auth.querySelectorAll(`.auth__back-arrow`)
	);

	function passwordViewSwitch() {
		const passwordInput = this.parentNode.querySelector(
			`.auth__input--password`
		);

		if (this.classList.contains(`auth__password-switcher--active`)) {
			passwordInput.type = `password`;
			this.classList.remove(`auth__password-switcher--active`);
		} else {
			passwordInput.type = `text`;
			this.classList.add(`auth__password-switcher--active`);
		}
	}

	function changeActiveAuthForm(activeFormId) {
		const authForms = [].slice.call(
			document.querySelectorAll(`.auth__wrapper`)
		);
		const activeForm = document.querySelector(`#${activeFormId}`);

		authForms.forEach(function(item) {
			item.classList.remove(`auth__wrapper--active`);
		});

		activeForm.classList.add(`auth__wrapper--active`);
	}

	passwordSwitchers.forEach(function(item) {
		item.addEventListener(`click`, passwordViewSwitch);
	});

	registerLink.addEventListener(
		`click`,
		changeActiveAuthForm.bind(null, `authRegister`)
	);
	forgotLink.addEventListener(
		`click`,
		changeActiveAuthForm.bind(null, `authReset`)
	);

	backArrows.forEach(function(item) {
		item.addEventListener(`click`, changeActiveAuthForm.bind(null, `auth`));
	});
}

if (inputs) {
	function inputPlaceholderHandler() {
		this.value
			? this.classList.add(`input--filled`)
			: this.classList.remove(`input--filled`);
	}
	inputs.forEach(function(item) {
		item.addEventListener(`input`, inputPlaceholderHandler);
	});
}

if (displayButtonContainer) {
    function changeListStyle(event) {
        const element = event.target.closest(`.displayButtons__button`);
        const listContent = document.querySelector(`.list__content`);
        const buttons = [].slice.call(displayButtonContainer.querySelectorAll(`.displayButtons__button`));

        if (element) {
            if (element.id === `displayButtonGrid`) {
                listContent.classList.add(`list__content--grid`);
                buttons.forEach(function(item) {
                    item.classList.remove(`displayButtons__button--active`);
                });
                element.classList.add(`displayButtons__button--active`);
            } else {
                listContent.classList.remove(`list__content--grid`);
                buttons.forEach(function(item) {
                    item.classList.remove(`displayButtons__button--active`);
                });
                element.classList.add(`displayButtons__button--active`);
            }
        }

    }

    displayButtonContainer.addEventListener(`click`, changeListStyle);
}

if (listSortArrow) {
    function changeArrowDirection() {
        this.classList.toggle(`list__sort-arrow--up`);
    }
    listSortArrow.addEventListener(`click`, changeArrowDirection);
}

if (menuButton) {
	const sidebar = document.querySelector(`.sidebar`);
	const overlay = document.querySelector(`.overlay`);
	const body = document.querySelector(`body`);
	const sidebarCloseBtn = sidebar.querySelector(`.sidebar__close-btn`);

	function openSidebar() {
		sidebar.classList.add(`sidebar--open`);
		overlay.classList.add(`overlay--active`);
		body.classList.add(`body--overflowHidden`);
	}

	function closeSidebar() {
		sidebar.classList.remove(`sidebar--open`);
		overlay.classList.remove(`overlay--active`);
		body.classList.remove(`body--overflowHidden`);
	}

	menuButton.addEventListener(`click`, openSidebar);
	sidebarCloseBtn.addEventListener(`click`, closeSidebar);
}

if (createNewButton) {
	const backArrow = document.querySelector('.sidebar__arrow');
	const mainSidebar = document.querySelector(`#sidebarMain`);
	const sidebarCreateNew = document.querySelector('#sidebarNew');

	function openCreateNewBlock() {
		mainSidebar.classList.add('sidebar__list--disable');
		sidebarCreateNew.classList.add('sidebar__new--active');
	}
	function closeCreateNewBlock() {
		mainSidebar.classList.remove('sidebar__list--disable');
		sidebarCreateNew.classList.remove('sidebar__new--active');
	}

	createNewButton.addEventListener('click', openCreateNewBlock);
	backArrow.addEventListener('click', closeCreateNewBlock);
}