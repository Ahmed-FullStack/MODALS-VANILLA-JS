import rippleElement from './paperRipple/PaperRipple.js';
const ripples = document.querySelectorAll(`.ripple`);
const openModal = document.querySelector('.true');
const body = document.querySelector('body');
const closeModal = document.querySelector('.false');
const backDrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal-box');
const focusableEls = modal.querySelectorAll(
	'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
);
const firstFocusableEl = focusableEls[0];
const lastFocusableEl = focusableEls[focusableEls.length - 1];
ripples.forEach(rippleEl => {
	rippleElement(rippleEl);
});

let unfocusEl = el => {
	const interactiveELement =
		el.nodeName !== `H1` &&
		el.nodeName !== `H2` &&
		el.nodeName !== `H3` &&
		el.nodeName !== `H4` &&
		el.nodeName !== `H5` &&
		el.nodeName !== `H6` &&
		el.nodeName !== `P` &&
		el.nodeName !== `DIV`;

	interactiveELement && el.setAttribute(`disabled`, true);
	const modalChild = [...el.children];
	modalChild.forEach(unfocusEl);

	modal.setAttribute(`aria-hidden`, true);
};
unfocusEl(modal);

let focusEl = el => {
	el.removeAttribute(`disabled`, ``);
	const modalChild = [...el.children];
	modalChild.forEach(focusEl);
};
function openModalBox() {
	modal.setAttribute(`aria-hidden`, false);
	backDrop.classList.remove('disappear');
	backDrop.classList.add('appear');
	modal.classList.add('show');
	modal.classList.remove('disappear');
	body.classList.add('freeze-scroll');
	modal.classList.remove('appear');

	focusEl(modal);
	trapFocus(modal);
}
openModal.addEventListener('click', e => {
	openModalBox();
});
// setTimeout(() => {
// 	openModalBox()
// }, 2000)

function closeModalBox() {
	openModal.focus();
	modal.setAttribute(`aria-hidden`, true);
	modal.removeAttribute(`tabindex`, ``);

	backDrop.classList.remove('appear');
	backDrop.classList.add('disappear');
	modal.classList.add('disappear');
	body.classList.remove('freeze-scroll');
	modal.classList.remove('appear');

	unfocusEl(modal);

	modal.removeEventListener('keydown', handleFocusTrap);
}

closeModal.addEventListener('click', e => {
	closeModalBox();
});

backDrop.addEventListener('click', e => {
	closeModalBox();
});

document.addEventListener('keydown', e => {
	switch (e.key) {
		case 'Escape':
			closeModalBox();
			break;

		default:
			break;
	}
});

function trapFocus(element) {
	firstFocusableEl.focus();
	element.addEventListener('keydown', handleFocusTrap);
}

function handleFocusTrap(e) {
	const isTabPressed = e.key === 'Tab';

	if (!isTabPressed) return;
	const shiftKey = e.shiftKey === true;
	const notShiftKey = e.shiftKey === false;

	if (shiftKey && document.activeElement === firstFocusableEl) {
		e.preventDefault();
		lastFocusableEl.focus();
		return;
	}
	if (notShiftKey && document.activeElement === lastFocusableEl) {
		e.preventDefault();
		firstFocusableEl.focus();
	}
}
