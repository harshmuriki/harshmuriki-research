// A little easter egg: a seedling in an old boot that visitors can drag
// anywhere on screen. A boxy trash-bot chases the boot, and a hovering egg-bot
// chases the trash-bot. Original line art in the spirit of a certain robot
// movie. Everything lives in a fixed full-screen layer, so it stays put while
// the page scrolls.
//
// Motion: the robots use simple "arrive" steering (desired velocity toward a
// target, slowing near it, with capped acceleration), which gives them weight
// and a natural ease-in/ease-out. The egg-bot's lean, head and arms are driven
// from her velocity and acceleration each frame. Small idle loops (tread roll,
// hover bob, leaf sway) live in styles/robot-chase.css.

import {useEffect, useRef, useState} from 'react';

const stroke = {
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.5,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
};

const Seedling = (): JSX.Element => (
	<svg className="rc-plant" viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
		<g {...stroke}>
			{/* Stem and two leaves */}
			<path d="M10 18 L10 9"/>
			<path className="rc-leaf" d="M10 12 Q5 11 3.5 6.5 Q8.5 7 10 12"/>
			<path className="rc-leaf rc-leaf-2" d="M10 10 Q14 6.5 17.5 4 Q16 9 10 10"/>
			{/* Boot */}
			<path d="M5 18 L15 18 L15 25 L20 25.5 Q22.5 26 22.5 28.5 L22.5 30.5 L5 30.5 Z"/>
			<path d="M5 21 L15 21"/>
		</g>
	</svg>
);

const TrashBot = (): JSX.Element => (
	<svg className="rc-trash" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
		<g {...stroke}>
			{/* Treads */}
			<rect x="5" y="37" width="30" height="9" rx="4.5"/>
			<rect className="rc-tread" x="7" y="39" width="26" height="5" rx="2.5" strokeDasharray="2 2.5"/>
			<circle cx="10" cy="41.5" r="1.6"/>
			<circle cx="30" cy="41.5" r="1.6"/>
			{/* Boxy body */}
			<g className="rc-trash-body">
				<rect x="8" y="19" width="24" height="18" rx="2"/>
				<path d="M8 24 L32 24"/>
				<path d="M13 28 L19 28 M13 31 L17 31"/>
				{/* Reaching arm */}
				<path d="M32 28 L41 26"/>
				<path d="M41 23.5 L43.5 26 L41 28.5"/>
				{/* Neck + binocular eyes, leaning forward */}
				<path d="M25 19 L27 13"/>
				<g className="rc-eyes">
					<rect x="22" y="5" width="8" height="7" rx="3"/>
					<rect x="31" y="5" width="8" height="7" rx="3"/>
					<circle cx="27.5" cy="8.5" r="1.2" fill="currentColor"/>
					<circle cx="36.5" cy="8.5" r="1.2" fill="currentColor"/>
				</g>
			</g>
		</g>
	</svg>
);

const EggBot = (): JSX.Element => (
	<svg className="rc-egg" viewBox="0 0 44 48" width="44" height="48" aria-hidden="true">
		<g {...stroke}>
			{/* Speed lines: fade in with her speed */}
			<path className="rc-speed" d="M1 22 L7 22 M3 28 L8 28 M1 34 L6 34"/>
			{/* Floating head; it lags her acceleration slightly (follow-through) */}
			<g className="rc-egg-head">
				<ellipse cx="24" cy="11" rx="10" ry="7.5"/>
				{/* Soft, gently curved "happy" eyes. No visor outline: in line art it
				    reads as a grimacing mouth, and slanted dashes read as angry brows. */}
				<path d="M20.5 11.8 Q22.3 9.6 24.1 11.8" strokeWidth="1.4"/>
				<path d="M26.3 11.3 Q28.1 9.1 29.9 11.3" strokeWidth="1.4"/>
			</g>
			{/* Egg body, no legs */}
			<path d="M14.5 23 Q24 19 33.5 23 Q35 37 24 45 Q13 37 14.5 23 Z"/>
			{/* Arms: trailing arm sweeps back with speed, front arm reaches */}
			<path className="rc-egg-arm-back" d="M14.5 25 Q9 31 11.5 37"/>
			<path className="rc-egg-arm-front" d="M33.5 25 Q40 27 42 23"/>
		</g>
	</svg>
);

type Bot = {x: number; y: number; vx: number; vy: number; facing: number};

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

// "Arrive" steering: head for (tx, ty), slow down inside `stop` px, never
// accelerate faster than maxAccel. Returns this frame's acceleration and the
// distance to the target.
const steer = (
	b: Bot, tx: number, ty: number,
	stop: number, maxSpeed: number, maxAccel: number, gain: number, dt: number,
): {ax: number; ay: number; dist: number} => {
	const dx = tx - b.x;
	const dy = ty - b.y;
	const dist = Math.hypot(dx, dy) || 1;
	let dvx = 0;
	let dvy = 0;
	if (dist > stop) {
		const speed = Math.min(maxSpeed, (dist - stop) * gain);
		dvx = dx / dist * speed;
		dvy = dy / dist * speed;
	}

	let ax = (dvx - b.vx) / dt;
	let ay = (dvy - b.vy) / dt;
	const a = Math.hypot(ax, ay);
	if (a > maxAccel) {
		ax *= maxAccel / a;
		ay *= maxAccel / a;
	}

	b.vx += ax * dt;
	b.vy += ay * dt;
	b.x += b.vx * dt;
	b.y += b.vy * dt;
	// Face the target, with a dead zone so they don't flip-flop when close.
	if (Math.abs(dx) > 18) {
		b.facing = dx > 0 ? 1 : -1;
	}

	return {ax, ay, dist};
};

type Bubble = 'hint' | 'eek' | 'phew' | undefined;

const bubbleText: Record<Exclude<Bubble, undefined>, string> = {
	hint: 'Help! These robots are after me. Drag me somewhere safe!',
	eek: 'Eek! Move me!',
	phew: 'Phew!',
};

const HINT_KEY = 'rc-hint-dismissed';

const RobotChase = (): JSX.Element => {
	const shoeRef = useRef<HTMLDivElement>(null);
	const trashRef = useRef<HTMLDivElement>(null);
	const eggRef = useRef<HTMLDivElement>(null);
	const [bubble, setBubble] = useState<Bubble>(undefined);
	const bubbleRef = useRef<Bubble>(undefined);

	useEffect(() => {
		const shoeEl = shoeRef.current;
		const trashEl = trashRef.current;
		const eggEl = eggRef.current;
		if (!shoeEl || !trashEl || !eggEl) {
			return;
		}

		const trashFlip = trashEl.firstElementChild as HTMLElement;
		const eggFlip = eggEl.firstElementChild as HTMLElement;
		const head = eggEl.querySelector<SVGGElement>('.rc-egg-head');
		const armBack = eggEl.querySelector<SVGPathElement>('.rc-egg-arm-back');
		const armFront = eggEl.querySelector<SVGPathElement>('.rc-egg-arm-front');
		const speedLines = eggEl.querySelector<SVGPathElement>('.rc-speed');

		const show = (b: Bubble): void => {
			bubbleRef.current = b;
			setBubble(b);
		};

		let hintDismissed = false;
		try {
			hintDismissed = sessionStorage.getItem(HINT_KEY) === '1';
		} catch {}

		if (!hintDismissed) {
			show('hint');
		}

		// Start: boot near the bottom right, robots rolling in from the left.
		const vw = (): number => window.innerWidth;
		const vh = (): number => window.innerHeight;
		const shoe = {x: Math.min(vw() * 0.8, vw() - 110), y: vh() - 70};
		const trash: Bot = {x: -60, y: vh() - 60, vx: 0, vy: 0, facing: 1};
		const egg: Bot = {x: -150, y: vh() - 100, vx: 0, vy: 0, facing: 1};
		let lean = 8;
		let headTilt = 0;

		let dragging = false;
		let grabDx = 0;
		let grabDy = 0;
		let caught = false;
		let phewTimer: number | undefined;

		const clampShoe = (): void => {
			shoe.x = clamp(shoe.x, 20, vw() - 20);
			shoe.y = clamp(shoe.y, 30, vh() - 24);
		};

		const onDown = (e: PointerEvent): void => {
			e.preventDefault();
			dragging = true;
			caught = false;
			grabDx = e.clientX - shoe.x;
			grabDy = e.clientY - shoe.y;
			shoeEl.setPointerCapture(e.pointerId);
			shoeEl.classList.add('is-dragging');
			window.clearTimeout(phewTimer);
			show(undefined);
			try {
				sessionStorage.setItem(HINT_KEY, '1');
			} catch {}
		};

		const onMove = (e: PointerEvent): void => {
			if (!dragging) {
				return;
			}

			shoe.x = e.clientX - grabDx;
			shoe.y = e.clientY - grabDy;
			clampShoe();
		};

		const onUp = (e: PointerEvent): void => {
			if (!dragging) {
				return;
			}

			dragging = false;
			shoeEl.classList.remove('is-dragging');
			if (shoeEl.hasPointerCapture(e.pointerId)) {
				shoeEl.releasePointerCapture(e.pointerId);
			}

			// A quick "phew" if it got away from the trash-bot.
			if (Math.hypot(trash.x - shoe.x, trash.y - shoe.y) > 140) {
				show('phew');
				phewTimer = window.setTimeout(() => {
					if (bubbleRef.current === 'phew') {
						show(undefined);
					}
				}, 1400);
			}
		};

		shoeEl.addEventListener('pointerdown', onDown);
		shoeEl.addEventListener('pointermove', onMove);
		shoeEl.addEventListener('pointerup', onUp);
		shoeEl.addEventListener('pointercancel', onUp);
		window.addEventListener('resize', clampShoe);

		let last = performance.now();
		let raf = 0;
		const tick = (now: number): void => {
			const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
			last = now;
			const t = now / 1000;

			// Trash-bot goes for the boot; it is steady and a bit slower.
			const r1 = steer(trash, shoe.x, shoe.y + 6, 50, 230, 520, 2.4, dt);
			// Egg-bot follows the trash-bot, hovering above and behind it with
			// a slow figure-eight drift so she never sits perfectly still.
			const r2 = steer(
				egg,
				trash.x - trash.facing * 20 + Math.sin(t * 1.3) * 10,
				trash.y - 36 + Math.cos(t * 0.9) * 8,
				36, 330, 760, 3, dt,
			);

			// Caught up with the boot and nobody's helping? Ask again.
			const trashSpeed = Math.hypot(trash.vx, trash.vy);
			if (!dragging && !caught && r1.dist < 62 && trashSpeed < 40) {
				caught = true;
				if (bubbleRef.current !== 'hint') {
					show('eek');
				}
			}

			// Trash-bot
			trashEl.style.transform = `translate(${trash.x - 24}px, ${trash.y - 24}px)`;
			trashFlip.style.transform = `scaleX(${trash.facing})`;
			trashEl.classList.toggle('is-moving', trashSpeed > 12);

			// Egg-bot: lean into speed, head lags acceleration, arms trail.
			const eggSpeed = Math.hypot(egg.vx, egg.vy);
			const forward = egg.vx * egg.facing;
			const targetLean = 8 + clamp(forward / 330 * 18, -14, 18);
			lean += (targetLean - lean) * Math.min(1, dt * 6);
			const accelForward = r2.ax * egg.facing;
			const targetHead = clamp(-accelForward / 760 * 4, -4, 4);
			headTilt += (targetHead - headTilt) * Math.min(1, dt * 8);
			const sp = clamp(eggSpeed / 330, 0, 1);

			eggEl.style.transform = `translate(${egg.x - 22}px, ${egg.y - 24}px)`;
			eggFlip.style.transform = `scaleX(${egg.facing}) rotate(${lean.toFixed(2)}deg)`;
			if (head) {
				head.style.transform = `rotate(${headTilt.toFixed(2)}deg)`;
			}

			if (armBack) {
				armBack.style.transform = `rotate(${(sp * 28).toFixed(2)}deg)`;
			}

			if (armFront) {
				armFront.style.transform = `rotate(${(-sp * 14).toFixed(2)}deg)`;
			}

			if (speedLines) {
				speedLines.style.opacity = String(clamp((eggSpeed - 60) / 270, 0, 1) * 0.55);
			}

			// Boot
			shoeEl.style.transform = `translate(${shoe.x - 20}px, ${shoe.y - 24}px)`;

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			window.clearTimeout(phewTimer);
			shoeEl.removeEventListener('pointerdown', onDown);
			shoeEl.removeEventListener('pointermove', onMove);
			shoeEl.removeEventListener('pointerup', onUp);
			shoeEl.removeEventListener('pointercancel', onUp);
			window.removeEventListener('resize', clampShoe);
		};
	}, []);

	return (
		<div className="rc-layer text-ink dark:text-bone">
			<div ref={eggRef} className="rc-actor rc-egg-actor" aria-hidden="true">
				<div className="rc-flip"><EggBot/></div>
			</div>
			<div ref={trashRef} className="rc-actor rc-trash-actor" aria-hidden="true">
				<div className="rc-flip"><TrashBot/></div>
			</div>
			<div
				ref={shoeRef}
				className="rc-actor rc-shoe"
				role="img"
				aria-label="A seedling in a boot you can drag around the page"
				title="Drag me!"
			>
				{bubble && (
					<div className="rc-bubble bg-paper dark:bg-charcoal" role="status">
						{bubbleText[bubble]}
					</div>
				)}
				<div className="rc-plant-wrap"><Seedling/></div>
			</div>
		</div>
	);
};

export default RobotChase;
