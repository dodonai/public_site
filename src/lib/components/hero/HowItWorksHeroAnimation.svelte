<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const paralegalSteps = [
		'Read the document',
		'Classify the matter',
		'Compute the deadline',
		'Draft the notice'
	];

	const engagementPhases = [
		{ label: 'Blueprint', duration: '2 to 3 weeks', accent: '#216fed' },
		{ label: 'Build', duration: '4 to 8 weeks', accent: '#836ae4' },
		{ label: 'Managed', duration: 'Monthly', accent: '#10b981' }
	];

	const tierCards = [
		{ title: 'Crawl', detail: '1 agent, about 4 weeks', meter: 33 },
		{ title: 'Walk', detail: '3 to 6 agents, 8 to 12 weeks', meter: 66 },
		{ title: 'Run', detail: 'Managed program, ongoing', meter: 100 }
	];
</script>

<AnimationStage durations={[4200, 5400, 5600]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Paralegal Test -->
		{#if step === 0}
			<PhaseWrapper caption="If a paralegal can follow the steps, we can build the agent.">
				<div class="scene">
					<div class="test-card">
						<div class="card-header">
							<span class="card-title">The Paralegal Test</span>
							<span class="card-tag">Step 1</span>
						</div>
						<div class="request-pill">
							<div class="request-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
							</div>
							<div class="request-body">
								<div class="request-label">Incoming matter</div>
								<div class="request-text">Medical records arrived — calendar SOL</div>
							</div>
						</div>
						<div class="step-list">
							{#each paralegalSteps as step_text, i}
								<div class="step-row" style="animation-delay: {250 + i * 340}ms">
									<span class="step-check" style="animation-delay: {520 + i * 340}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
									<span class="step-text">{step_text}</span>
								</div>
							{/each}
						</div>
						<div class="verdict" style="animation-delay: 1900ms">
							<span class="verdict-dot"></span>
							<span class="verdict-text">Can a paralegal do it? Yes — it's an agent.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Blueprint → Build → Managed -->
		{#if step === 1}
			<PhaseWrapper caption="Every engagement runs through the same three phases.">
				<div class="scene">
					<div class="engagement-card">
						<div class="card-header">
							<span class="card-title">Engagement Path</span>
							<span class="card-tag card-tag-violet">3 phases</span>
						</div>
						<div class="timeline">
							<div class="timeline-track">
								<div class="timeline-fill"></div>
							</div>
							<div class="timeline-nodes">
								{#each engagementPhases as phase, i}
									<div class="timeline-node" style="animation-delay: {300 + i * 800}ms">
										<div class="node-dot" style="background: {phase.accent}; animation-delay: {550 + i * 800}ms"></div>
										<div class="node-label">{phase.label}</div>
										<div class="node-duration">{phase.duration}</div>
									</div>
								{/each}
							</div>
						</div>
						<div class="detail-row">
							<div class="detail-card" style="animation-delay: 3000ms">
								<div class="detail-line"><span class="detail-accent blueprint">B</span> Workflow audit + plan</div>
								<div class="detail-line"><span class="detail-accent build">B</span> 3 to 6 agents, shadow run</div>
								<div class="detail-line"><span class="detail-accent managed">M</span> Monthly review + upgrades</div>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Crawl / Walk / Run tiers -->
		{#if step === 2}
			<PhaseWrapper caption="Pick the size that fits. Most firms start small and grow.">
				<div class="scene">
					<div class="tiers-card">
						<div class="card-header">
							<span class="card-title">Engagement Tiers</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Scales with you
							</span>
						</div>
						<div class="tier-list">
							{#each tierCards as tier, i}
								<div class="tier-row" style="animation-delay: {250 + i * 550}ms">
									<div class="tier-head">
										<span class="tier-title">{tier.title}</span>
										<span class="tier-detail">{tier.detail}</span>
									</div>
									<div class="tier-meter">
										<div class="tier-fill" style="width: {tier.meter}%; animation-delay: {550 + i * 550}ms"></div>
									</div>
								</div>
							{/each}
						</div>
						<div class="tiers-footer" style="animation-delay: 2200ms">
							<span class="footer-note">Stop after any phase. Keep everything we've built.</span>
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

	@keyframes fillRight {
		from { transform: scaleX(0); }
		to { transform: scaleX(1); }
	}

	@keyframes fillMeter {
		from { width: 0; }
	}

	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.test-card,
	.engagement-card,
	.tiers-card {
		background: white;
		border-radius: 14px;
		box-shadow: 0 10px 40px rgba(40, 40, 118, 0.08), 0 2px 8px rgba(40, 40, 118, 0.04);
		padding: 18px 20px;
		width: 100%;
		max-width: 420px;
		max-height: calc(100% - 24px);
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

	/* =============================
	   Phase 0: Paralegal Test
	   ============================= */
	.request-pill {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		margin-bottom: 14px;
	}

	.request-icon {
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 8px;
	}

	.request-icon svg {
		width: 14px;
		height: 14px;
	}

	.request-body {
		flex: 1;
		min-width: 0;
	}

	.request-label {
		font-size: 9px;
		font-weight: 600;
		color: #8181ac;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.request-text {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
		margin-top: 2px;
	}

	.step-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.step-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 8px;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.step-check {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.step-check svg {
		width: 10px;
		height: 10px;
	}

	.step-text {
		font-size: 11px;
		font-weight: 500;
		color: #282876;
	}

	.verdict {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: auto;
		padding-top: 12px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.verdict-dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
	}

	.verdict-text {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	/* =============================
	   Phase 1: Engagement timeline
	   ============================= */
	.timeline {
		position: relative;
		padding: 18px 8px 10px;
	}

	.timeline-track {
		position: absolute;
		top: 30px;
		left: 24px;
		right: 24px;
		height: 3px;
		background: #eef0fa;
		border-radius: 2px;
		overflow: hidden;
	}

	.timeline-fill {
		height: 100%;
		background: linear-gradient(to right, #216fed, #836ae4, #10b981);
		transform-origin: left center;
		transform: scaleX(0);
		animation: fillRight 2.4s ease-out 0.4s forwards;
	}

	.timeline-nodes {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.timeline-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
		flex: 1;
	}

	.node-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 0 0 2px currentColor;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.node-label {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		margin-top: 4px;
	}

	.node-duration {
		font-size: 9px;
		color: #8181ac;
	}

	.detail-row {
		margin-top: 18px;
	}

	.detail-card {
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		padding: 10px 12px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.detail-line {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		color: #282876;
		padding: 3px 0;
	}

	.detail-accent {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		color: white;
		font-size: 9px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.detail-accent.blueprint { background: #216fed; }
	.detail-accent.build { background: #836ae4; }
	.detail-accent.managed { background: #10b981; }

	/* =============================
	   Phase 2: Engagement tiers
	   ============================= */
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

	.tier-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.tier-row {
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.tier-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 8px;
	}

	.tier-title {
		font-size: 12px;
		font-weight: 700;
		color: #282876;
	}

	.tier-detail {
		font-size: 10px;
		color: #8181ac;
	}

	.tier-meter {
		width: 100%;
		height: 5px;
		background: #eef0fa;
		border-radius: 3px;
		overflow: hidden;
	}

	.tier-fill {
		height: 100%;
		background: linear-gradient(to right, #216fed, #836ae4);
		border-radius: 3px;
		width: 0;
		animation: fillMeter 0.9s ease-out forwards;
	}

	.tiers-footer {
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}
</style>
