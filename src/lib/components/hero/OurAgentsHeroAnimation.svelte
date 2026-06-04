<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';
	import data from '$lib/data/services/ai-services/our-agents-animation.json';

	const { roster, rulerMarkers, rulerRange, focus, ticker, footerStats } = data;
	const rulerSpan = rulerRange.end - rulerRange.start;

	function markerLeft(offsetHour) {
		return `${((offsetHour - rulerRange.start) / rulerSpan) * 100}%`;
	}

	const rulerHours = Array.from({ length: 6 }, (_, i) => rulerRange.start + i * 2);
</script>

<AnimationStage durations={[4200, 4400, 4400, 4500]} height={560}>
	{#snippet children(step)}
		<!-- Phase 0: Roster grid -->
		{#if step === 0}
			<PhaseWrapper caption="Dozens of agents. Running every morning. On us.">
				<div class="scene">
					<div class="roster-card">
						<div class="card-header">
							<span class="card-title">Agent Roster</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Live
							</span>
						</div>
						<div class="roster-grid">
							{#each roster as agent, i}
								<div class="roster-chip" style="animation-delay: {80 + i * 140}ms">
									<span class="chip-dot"></span>
									<span class="chip-initials">{agent.initials}</span>
									<span class="chip-name">{agent.short}</span>
								</div>
							{/each}
							<div class="roster-chip ghost" style="animation-delay: {80 + 13 * 140}ms">
								<span class="chip-initials">+1</span>
								<span class="chip-name">You?</span>
							</div>
						</div>
						<div class="roster-footer" style="animation-delay: 2200ms">
							<span class="footer-note">Same architecture, different inputs — that's what your firm gets.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Day-in-the-life ruler -->
		{#if step === 1}
			<PhaseWrapper caption="The morning, laid out on a ruler.">
				<div class="scene">
					<div class="ruler-card">
						<div class="card-header">
							<span class="card-title">Today</span>
							<span class="card-tag">Weekday schedule</span>
						</div>
						<div class="ruler-wrap">
							<div class="ruler-track">
								{#each rulerHours as hour}
									<div class="ruler-tick" style="left: {markerLeft(hour)}">
										<span class="tick-line"></span>
										<span class="tick-label">{hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'p' : 'a'}</span>
									</div>
								{/each}
							</div>
							<div class="ruler-markers">
								{#each rulerMarkers as marker, i}
									<div
										class="ruler-marker"
										style="left: {markerLeft(marker.offsetHour)}; animation-delay: {200 + i * 280}ms"
									>
										<span class="marker-dot"></span>
										<span class="marker-label">{marker.label}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="ruler-notes">
							<div class="ruler-note" style="animation-delay: 3100ms">
								<span class="note-dot blueprint"></span>
								<span>Morning runs write to Slack and drafts before the team is up</span>
							</div>
							<div class="ruler-note" style="animation-delay: 3400ms">
								<span class="note-dot build"></span>
								<span>Nothing sends without Nick's approval</span>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Per-agent focus -->
		{#if step === 2}
			<PhaseWrapper caption="What each agent actually did this morning.">
				<div class="scene">
					<div class="focus-card">
						<div class="card-header">
							<span class="card-title">Agent Outputs</span>
							<span class="card-tag card-tag-violet">Sample of 3</span>
						</div>
						<div class="focus-stack">
							{#each focus as entry, i}
								<div class="focus-row" style="animation-delay: {300 + i * 1100}ms">
									<div class="focus-head">
										<div class="focus-avatar">{entry.agent.charAt(0)}</div>
										<div class="focus-agent">
											<div class="focus-name">{entry.agent}</div>
											<div class="focus-time">{entry.time}</div>
										</div>
									</div>
									<div class="focus-line">
										<span class="focus-tag input">In</span>
										<span class="focus-value">{entry.input}</span>
									</div>
									<div class="focus-line">
										<span class="focus-tag output">Out</span>
										<span class="focus-value">{entry.output}</span>
									</div>
									<div class="focus-line">
										<span class="focus-tag action">Do</span>
										<span class="focus-value">{entry.action}</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Activity ticker + footer stats -->
		{#if step === 3}
			<PhaseWrapper caption="Every morning. Every weekday. Live in production.">
				<div class="scene">
					<div class="ticker-card">
						<div class="card-header">
							<span class="card-title">Today's Activity</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Live
							</span>
						</div>
						<div class="ticker-wrap">
							<div class="ticker-track">
								{#each [...ticker, ...ticker] as item}
									<div class="ticker-item">
										<span class="ticker-dot"></span>
										<span class="ticker-text">{item}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="focus-list">
							{#each ticker.slice(0, 4) as item, i}
								<div class="focus-item-row" style="animation-delay: {300 + i * 350}ms">
									<span class="focus-check">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
									<span class="focus-summary">{item}</span>
								</div>
							{/each}
						</div>
						<div class="stats-row">
							{#each footerStats as stat, i}
								<div class="stat" style="animation-delay: {2000 + i * 180}ms">
									<div class="stat-value">{stat.value}</div>
									<div class="stat-label">{stat.label}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes fadeInScale {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	@keyframes badgePop {
		0% { opacity: 0; transform: scale(0.2); }
		70% { opacity: 1; transform: scale(1.15); }
		100% { opacity: 1; transform: scale(1); }
	}

	@keyframes livePulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
		50% { opacity: 0.85; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
	}

	@keyframes tickerScroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.roster-card,
	.ruler-card,
	.focus-card,
	.ticker-card {
		background: white;
		border-radius: 14px;
		box-shadow: 0 10px 40px rgba(40, 40, 118, 0.08), 0 2px 8px rgba(40, 40, 118, 0.04);
		padding: 18px 20px;
		width: 100%;
		max-width: 440px;
		max-height: 480px;
		overflow: hidden;
		animation: fadeInScale 0.5s ease-out forwards;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #eef0fa;
		margin-bottom: 14px;
	}

	.card-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.card-tag {
		font-size: 10px;
		font-weight: 600;
		color: #216fed;
		background: #216fed15;
		padding: 3px 9px;
		border-radius: 20px;
	}

	.card-tag-violet {
		color: #836ae4;
		background: #836ae415;
	}

	.live-tag {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		font-weight: 600;
		color: #10b981;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		animation: livePulse 1.8s ease-in-out infinite;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}

	/* =============================
	   Phase 0: Roster grid
	   ============================= */
	.roster-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
	}

	.roster-chip {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		padding: 8px 8px 6px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 8px;
		opacity: 0;
		animation: fadeInUp 0.35s ease-out forwards;
		min-width: 0;
	}

	.roster-chip.ghost {
		background: transparent;
		border: 1px dashed #c0c3de;
	}

	.chip-dot {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #10b981;
		animation: livePulse 1.8s ease-in-out infinite;
	}

	.chip-initials {
		font-size: 10px;
		font-weight: 800;
		color: #836ae4;
	}

	.roster-chip.ghost .chip-initials {
		color: #8181ac;
	}

	.chip-name {
		font-size: 8px;
		font-weight: 600;
		color: #282876;
		line-height: 1.15;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.roster-chip.ghost .chip-name {
		color: #8181ac;
	}

	.roster-footer {
		margin-top: auto;
		padding-top: 14px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	/* =============================
	   Phase 1: Ruler
	   ============================= */
	.ruler-wrap {
		position: relative;
		padding: 10px 12px 18px;
	}

	.ruler-track {
		position: relative;
		height: 36px;
		background: linear-gradient(to right, #eef0fa 0%, #eef0fa 100%);
		border-radius: 4px;
	}

	.ruler-tick {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateX(-50%);
	}

	.tick-line {
		width: 1px;
		height: 8px;
		background: #c0c3de;
	}

	.tick-label {
		font-size: 9px;
		color: #8181ac;
		margin-top: 20px;
	}

	.ruler-markers {
		position: relative;
		height: 30px;
		margin-top: 6px;
	}

	.ruler-marker {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		transform: translateX(-50%);
		opacity: 0;
		animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.marker-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #836ae4;
		border: 2px solid white;
		box-shadow: 0 0 0 2px #836ae4;
	}

	.marker-label {
		font-size: 8px;
		font-weight: 700;
		color: #836ae4;
	}

	.ruler-notes {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: auto;
		padding-top: 14px;
		border-top: 1px solid #eef0fa;
	}

	.ruler-note {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 10px;
		color: #282876;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.note-dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.note-dot.blueprint { background: #216fed; }
	.note-dot.build { background: #10b981; }

	/* =============================
	   Phase 2: Focus cards
	   ============================= */
	.focus-stack {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.focus-row {
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.focus-head {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 6px;
	}

	.focus-avatar {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: linear-gradient(135deg, #836ae4, #6b4fd4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: 700;
	}

	.focus-agent {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	.focus-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.focus-time {
		font-size: 9px;
		color: #a0a0c0;
		font-family: 'SFMono-Regular', Consolas, monospace;
	}

	.focus-line {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 2px 0;
	}

	.focus-tag {
		flex-shrink: 0;
		padding: 1px 6px;
		font-size: 8px;
		font-weight: 700;
		color: white;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.focus-tag.input { background: #216fed; }
	.focus-tag.output { background: #836ae4; }
	.focus-tag.action { background: #10b981; }

	.focus-value {
		font-size: 10px;
		color: #282876;
		line-height: 1.3;
	}

	/* =============================
	   Phase 3: Ticker
	   ============================= */
	.ticker-wrap {
		overflow: hidden;
		border-radius: 10px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		padding: 10px 0;
		margin-bottom: 12px;
	}

	.ticker-track {
		display: flex;
		gap: 20px;
		width: max-content;
		animation: tickerScroll 18s linear infinite;
	}

	.ticker-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		background: white;
		border: 1px solid #eef0fa;
		border-radius: 20px;
		font-size: 10px;
		color: #282876;
		white-space: nowrap;
	}

	.ticker-dot {
		flex-shrink: 0;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #836ae4;
	}

	.ticker-text {
		font-weight: 600;
	}

	.focus-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.focus-item-row {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 10px;
		color: #282876;
		padding: 2px 0;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.focus-check {
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.focus-check svg {
		width: 8px;
		height: 8px;
	}

	.focus-summary {
		font-weight: 500;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		padding-top: 12px;
		margin-top: 10px;
		border-top: 1px solid #eef0fa;
	}

	.stat {
		text-align: center;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.stat-value {
		font-size: 15px;
		font-weight: 800;
		color: #282876;
		line-height: 1.1;
	}

	.stat-label {
		font-size: 9px;
		font-weight: 500;
		color: #8181ac;
		margin-top: 2px;
	}
</style>
