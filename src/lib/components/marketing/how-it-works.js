import { animationScope } from './animationScope.js';
export function initialize(root) {
	const scope = animationScope();
	const {
		setTimeout,
		setInterval,
		clearInterval,
		requestAnimationFrame,
		IntersectionObserver,
		addEventListener
	} = scope;
	root.querySelectorId = (id) => root.querySelector('#' + id);

	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const yr = root.querySelectorId('yr');
	if (yr) yr.textContent = new Date().getFullYear();

	// sticky stage bar: appears once the "Four stages" path has scrolled up past the nav,
	// hides again when the reader scrolls back above it
	const stagenav = root.querySelector('.stagenav');
	const pathline = root.querySelector('.pathline');
	if (stagenav && pathline) {
		let ticking = false;
		const update = () => {
			ticking = false;
			const navH = document.querySelector('[data-site-header]')?.offsetHeight || 68;
			stagenav.style.top = navH + 'px';
			stagenav.classList.toggle('show', pathline.getBoundingClientRect().bottom <= navH);
		};
		addEventListener(
			'scroll',
			() => {
				if (!ticking) {
					ticking = true;
					requestAnimationFrame(update);
				}
			},
			{ passive: true }
		);
		addEventListener('resize', update);
		update();
	}
	// sticky stage bar: highlight the section in view
	const snLinks = [...root.querySelectorAll('.stagenav a')];
	if ('IntersectionObserver' in window && snLinks.length) {
		const secs = snLinks.map((a) => root.querySelector(a.getAttribute('href'))).filter(Boolean);
		const so = new IntersectionObserver(
			(es) => {
				es.forEach((e) => {
					if (e.isIntersecting) {
						snLinks.forEach((a) =>
							a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)
						);
					}
				});
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		secs.forEach((x) => so.observe(x));
	}
	// ready check + drafting agent: play once when scrolled in, then hold the finished state
	const ready = root.querySelector('.ready');
	if (ready && !reduce && 'IntersectionObserver' in window) {
		const ro = new IntersectionObserver(
			(es) =>
				es.forEach((e) => {
					if (e.isIntersecting) {
						ro.disconnect();
						ready.classList.add('anim');
					}
				}),
			{ threshold: 0.35 }
		);
		ro.observe(ready);
	}

	return () => {
		scope.destroy();
		delete root.querySelectorId;
	};
}
