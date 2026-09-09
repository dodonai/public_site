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

	// semantic Q&A typewriter
	const q = root.querySelectorId('qaQ');
	if (q && !reduce) {
		const qs = [
			'What did we agree to in the Singh fee agreement?',
			'Which matters are waiting on records right now?',
			'When is the expert deadline in Cruz?'
		];
		let qi = 0;
		setInterval(() => {
			qi = (qi + 1) % qs.length;
			const t = qs[qi];
			let c = 0;
			const iv = setInterval(() => {
				c++;
				q.textContent = t.slice(0, c);
				if (c >= t.length) clearInterval(iv);
			}, 40);
		}, 8000);
	}
	// dashboard counters (illustrative)
	function countTo(id, target, fmt) {
		const e = root.querySelectorId(id);
		if (!e) return;
		let s0 = null;
		requestAnimationFrame(function st(ts) {
			if (!s0) s0 = ts;
			const p = Math.min((ts - s0) / 1600, 1);
			const v = target * (1 - Math.pow(1 - p, 3));
			e.textContent = fmt(v);
			if (p < 1) requestAnimationFrame(st);
		});
	}
	const run = () => {
		countTo('kRuns', 1284, (v) => Math.round(v).toLocaleString());
		countTo('kHrs', 312, (v) => Math.round(v));
		countTo('kDrafts', 417, (v) => Math.round(v));
		countTo('kCost', 0.42, (v) => '$' + (0.9 - v).toFixed(2));
	};
	if (!reduce) {
		run();
	} else {
		const staticKpis = { kRuns: '1,284', kHrs: '312', kDrafts: '417', kCost: '$0.48' };
		Object.entries(staticKpis).forEach(([id, value]) => {
			const el = root.querySelectorId(id);
			if (el) el.textContent = value;
		});
	}

	// reuse the full Blueprint and orchestration animations in the homepage switcher
	const blueprintSlot = root.querySelector('[data-blueprint-slot]');
	const blueprintAnimation = root.querySelector('#blueprint .bp-svg');
	if (blueprintSlot && blueprintAnimation) blueprintSlot.replaceChildren(blueprintAnimation);
	const orchestrationSlot = root.querySelector('[data-orchestration-slot]');
	const orchestrationAnimation = root.querySelector('#orchestrate .xform .xcol:last-child');
	if (orchestrationSlot && orchestrationAnimation)
		orchestrationSlot.replaceChildren(orchestrationAnimation);

	// homepage method switcher
	const methodButtons = [...root.querySelectorAll('[data-method]')];
	const methodPanels = [...root.querySelectorAll('[data-method-panel]')];
	methodButtons.forEach((button) =>
		button.addEventListener('click', () => {
			const target = button.dataset.method;
			methodButtons.forEach((item) => {
				const selected = item === button;
				item.classList.toggle('active', selected);
				item.setAttribute('aria-selected', String(selected));
			});
			methodPanels.forEach((panel) => {
				const selected = panel.dataset.methodPanel === target;
				panel.hidden = !selected;
				panel.classList.toggle('active', selected);
			});
		})
	);

	// self-updating year
	const yr = root.querySelectorId('yr');
	if (yr) yr.textContent = new Date().getFullYear();
	// scroll reveal (applied only when motion allowed)
	if (!reduce && 'IntersectionObserver' in window) {
		const els = root.querySelectorAll(
			'.head,.split2>div,.orow,.dlv2,.excard,.bigvp2,.sec-card,.bpdoc,.rcheck,.ragent,.xform>*,.dash,.appwin,.faq details,.whyquote,.aside2,.fgrid>.card,.origin-copy'
		);
		els.forEach((el, i) => {
			el.classList.add('pre');
			el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
		});
		const io = new IntersectionObserver(
			(es) =>
				es.forEach((e) => {
					if (e.isIntersecting) {
						io.unobserve(e.target);
						e.target.classList.remove('pre');
						e.target.classList.add('in');
					}
				}),
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);
		els.forEach((el) => io.observe(el));
	}
	// the handwritten line writes itself when it arrives
	const pen = root.querySelector('.handwrite'),
		penBox = root.querySelector('.beunique');
	if (pen && penBox && !reduce && 'IntersectionObserver' in window) {
		pen.classList.add('armed');
		const po = new IntersectionObserver(
			(es) =>
				es.forEach((e) => {
					if (e.isIntersecting) {
						po.unobserve(e.target);
						pen.classList.remove('armed');
						pen.classList.add('write');
					}
				}),
			{ threshold: 0.35 }
		);
		po.observe(penBox);
	}

	// v14 hero demo: one causal loop through organize → orchestrate → automate
	(function () {
		const demo = root.querySelectorId('flowdemo');
		if (!demo || reduce) return;
		const $ = (s) => demo.querySelector(s),
			$$ = (s) => [...demo.querySelectorAll(s)];
		const prog = $('#flowProg'),
			status = $('#flowStatus'),
			note = $('#flowNote');
		const inputs = $$('.flow-inputs .flow-row'),
			outputs = $$('.flow-outputs .flow-row');
		const rules = $$('.flow-rule'),
			phEls = $$('.flow-phases em');
		const railL = $('.rail-l'),
			railR = $('.rail-r'),
			apr = $('.apr');
		const T = 16600;
		demo.classList.add('anim');
		const say = (t) => {
			status.style.opacity = 0;
			setTimeout(() => {
				status.textContent = t;
				status.style.opacity = 1;
			}, 240);
		};
		const fire = (r) => {
			r.classList.remove('active');
			void r.offsetWidth;
			r.classList.add('active');
		};
		const ping = (el) => {
			el.classList.add('ping');
			setTimeout(() => el.classList.remove('ping'), 520);
		};
		const phase = (n) => {
			demo.classList.remove('ph1', 'ph2', 'ph3');
			demo.classList.add('ph' + n);
			phEls.forEach((e, i) => {
				e.classList.toggle('on', i === n - 1);
				e.classList.toggle('done', i < n - 1);
			});
		};
		const steps = [
			[
				0,
				() => {
					inputs.forEach((e) => e.classList.remove('set'));
					outputs.forEach((e) => e.classList.remove('born'));
					rules.forEach((e) => e.classList.remove('lit'));
					apr.classList.remove('ok');
					apr.textContent = 'Awaiting approval';
					phase(1);
					say('Gathering files, email, and case data');
					prog.style.transition = 'none';
					prog.style.width = '0%';
					void prog.offsetWidth;
					prog.style.transition = 'width ' + T / 1000 + 's linear';
					prog.style.width = '100%';
				}
			],
			[700, () => inputs[0].classList.add('set')],
			[1300, () => inputs[1].classList.add('set')],
			[1900, () => inputs[2].classList.add('set')],
			[
				2500,
				() => {
					inputs[3].classList.add('set');
					say('1,000+ page claim files indexed and mapped');
				}
			],
			[
				4100,
				() => {
					phase(2);
					say('Connecting SharePoint, Outlook, and the case system');
					ping(inputs[0]);
					fire(railL);
				}
			],
			[
				5000,
				() => {
					rules[0].classList.add('lit');
					ping(inputs[1]);
					fire(railL);
				}
			],
			[
				5900,
				() => {
					rules[1].classList.add('lit');
					ping(inputs[2]);
					fire(railL);
				}
			],
			[
				6800,
				() => {
					rules[2].classList.add('lit');
					ping(inputs[3]);
					fire(railL);
					say('Every system feeding one operating layer');
				}
			],
			[
				8600,
				() => {
					phase(3);
					say('Drafting appeal from your own precedent');
					fire(railR);
				}
			],
			[9500, () => outputs[0].classList.add('born')],
			[10400, () => fire(railR)],
			[
				11300,
				() => {
					outputs[1].classList.add('born');
					say('Draft held for attorney sign-off');
				}
			],
			[
				12700,
				() => {
					apr.classList.add('ok');
					apr.textContent = 'Approved';
					note.classList.remove('flash');
					void note.offsetWidth;
					note.classList.add('flash');
				}
			],
			[
				13400,
				() => {
					fire(railR);
					outputs[2].classList.add('born');
				}
			],
			[
				14300,
				() => {
					fire(railR);
					outputs[3].classList.add('born');
					say('Deadlines checked, calendar and CRM updated');
				}
			],
			[15800, () => say('Cycle complete: 4 items staged for review')]
		];
		const run = () => steps.forEach(([t, fn]) => setTimeout(fn, t));
		run();
		setInterval(run, T + 1200);
	})();

	return () => {
		scope.destroy();
		delete root.querySelectorId;
	};
}
