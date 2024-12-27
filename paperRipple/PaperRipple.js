'use strict';

class RippleEffect {
	constructor(el) {
		this.el = el;
		this.wavesContainer = this.createWavesContainer();
		this.rippleElement();
	}

	setCoordinates(e, wave, keyboard = false) {
		const { x, y, width, height } = e.target.getBoundingClientRect();

		const max = Math.max(width, height);

		wave.style.setProperty('--max-value', `${max}px`);

		const xCoordinate = !keyboard
			? (e.clientX - x - max / 2).toFixed(2)
			: max / 2 - width / 2;
		const yCoordinate = !keyboard
			? (e.clientY - y - max / 2).toFixed(2)
			: max / 2 - height / 2;

		const hypotenus = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
		const rippleScale = (hypotenus + 5) / max;
		const customXCoordinate = !keyboard ? xCoordinate : -xCoordinate;
		const customYCoordinate = !keyboard ? yCoordinate : -yCoordinate;

		wave.style.setProperty('--x', `${customXCoordinate}px`);
		wave.style.setProperty('--y', `${customYCoordinate}px`);
		wave.style.setProperty('--paper-ripple-scale', `${rippleScale.toFixed(2)}`);
	}

	createWavesContainer() {
		const ripple = document.createElement('div');

		ripple.classList.add('mdc-ripple');
		this.el.prepend(ripple);

		return ripple;
	}

	createWave() {
		const wave = document.createElement('div');
		wave.classList.add('mdc-ripple-wave');
		wave.classList.add('mdc-ripple-wave-animation');

		this.wavesContainer.appendChild(wave);

		return wave;
	}

	handleRippleEvent(keyboard = false, e) {
		if (keyboard === true) {
			if (e.key !== ' ' && e.key !== 'Enter') return;
			if (e.target !== this.el) return;
			if (e.repeat) return;

			const wave = this.createWave();

			this.setCoordinates(e, wave, true);

			const rippleRemoverFunction = this.removeRippleFunc.bind(this, wave);

			this.el.addEventListener('keyup', rippleRemoverFunction, { once: true });
		} else {
			const e = arguments[0];
			if (e.target !== this.el) return;
			if (e.buttons !== 1) return;

			const wave = this.createWave();
			this.setCoordinates(e, wave);

			const rippleRemoverFunction = this.removeRippleFunc.bind(this, wave);

			this.el.addEventListener('pointerup', rippleRemoverFunction, {
				once: true,
			});
			this.el.addEventListener('pointerleave', rippleRemoverFunction, {
				once: true,
			});
			this.el.addEventListener('dragend', rippleRemoverFunction, {
				once: true,
			});
		}
	}

	removeRippleFunc(wave, e) {
		const styles = window.getComputedStyle(e.target);

		const waveRemoveDelay = styles.getPropertyValue(
			'--paper-ripple-duration-wms'
		);
		const waveOpacityMS = styles.getPropertyValue(
			'--paper-ripple-opacity-duration-wms'
		);

		setTimeout(() => {
			wave.classList.add('mdc-ripple-wave-opacity-animation');
			setTimeout(() => {
				wave.remove();
			}, waveOpacityMS);
		}, waveRemoveDelay);
	}

	rippleElement() {
		this.el.classList.add('ripple');

		this.el.addEventListener('pointerdown', this.handleRippleEvent.bind(this));
		this.el.addEventListener(
			'keydown',
			this.handleRippleEvent.bind(this, true)
		);
	}
}

const btn = document.querySelectorAll('button');
const anchors = document.querySelectorAll('a');

btn.forEach(btn => {
	new RippleEffect(btn);
});
anchors.forEach(anchor => {
	new RippleEffect(anchor);
});

export default function rippleElement(el) {
	const elType = el.tagName.toLowerCase();
	const elStatement = elType === 'button' || elType === 'a';

	if (elStatement) return;

	new RippleEffect(el);
}
