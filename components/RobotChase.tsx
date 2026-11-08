// A little easter egg: a hovering egg-bot chases a boxy trash-bot, who is
// chasing a seedling hopping along in an old boot. Original line art in the
// spirit of a certain robot movie. Pinned to the bottom of the viewport so it
// stays put while the page scrolls. All motion lives in styles/robot-chase.css.

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
			{/* Speed lines: only show while she darts forward */}
			<path className="rc-speed" d="M1 22 L7 22 M3 28 L8 28 M1 34 L6 34"/>
			{/* Floating head with visor; it lags the body slightly (follow-through) */}
			<g className="rc-egg-head">
				<ellipse cx="24" cy="11" rx="10" ry="7.5"/>
				{/* Soft, gently curved "happy" eyes. No visor outline: in line art it
				    reads as a grimacing mouth, and slanted dashes read as angry brows. */}
				<path d="M20.5 11.8 Q22.3 9.6 24.1 11.8" strokeWidth="1.4"/>
				<path d="M26.3 11.3 Q28.1 9.1 29.9 11.3" strokeWidth="1.4"/>
			</g>
			{/* Egg body, no legs */}
			<path d="M14.5 23 Q24 19 33.5 23 Q35 37 24 45 Q13 37 14.5 23 Z"/>
			{/* Arms: trailing arm sweeps back on each dart, front arm reaches */}
			<path className="rc-egg-arm-back" d="M14.5 25 Q9 31 11.5 37"/>
			<path className="rc-egg-arm-front" d="M33.5 25 Q40 27 42 23"/>
		</g>
	</svg>
);

const RobotChase = (): JSX.Element => (
	<div className="rc-stage text-ink dark:text-bone" aria-hidden="true">
		<div className="rc-ground"/>
		<div className="rc-runners">
			<div className="rc-egg-wrap"><EggBot/></div>
			<TrashBot/>
			<div className="rc-plant-wrap"><Seedling/></div>
		</div>
	</div>
);

export default RobotChase;
