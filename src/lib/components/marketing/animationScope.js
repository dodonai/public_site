// Bind design animations to a page lifetime. Navigating away cancels all work.
export function animationScope() {
	const timers = new Set(),
		frames = new Set(),
		observers = new Set();
	const events = new AbortController();
	return {
		setTimeout(fn, ms) {
			const id = window.setTimeout(() => {
				timers.delete(id);
				fn();
			}, ms);
			timers.add(id);
			return id;
		},
		setInterval(fn, ms) {
			const id = window.setInterval(fn, ms);
			timers.add(id);
			return id;
		},
		clearInterval(id) {
			window.clearInterval(id);
			timers.delete(id);
		},
		requestAnimationFrame(fn) {
			const id = window.requestAnimationFrame((ts) => {
				frames.delete(id);
				fn(ts);
			});
			frames.add(id);
			return id;
		},
		IntersectionObserver: class extends window.IntersectionObserver {
			constructor(...args) {
				super(...args);
				observers.add(this);
			}
		},
		addEventListener(type, fn, options = {}) {
			window.addEventListener(type, fn, { ...options, signal: events.signal });
		},
		destroy() {
			timers.forEach(window.clearInterval);
			frames.forEach(window.cancelAnimationFrame);
			observers.forEach((o) => o.disconnect());
			events.abort();
		}
	};
}
