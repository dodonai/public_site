<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const safetyChecks = [
		{ label: 'Citation verified', detail: 'Shepard + Lexis pass' },
		{ label: 'ABA Opinion 512 audit', detail: 'Competence, candor, supervision' },
		{ label: 'Confidentiality scope', detail: 'No data left your tenant' },
		{ label: 'Reviewer gate', detail: 'Attorney approval required' }
	];

	const auditEntries = [
		{ time: '08:14', model: 'Claude Sonnet 4.5', action: 'Drafted demand letter', matter: 'Matter #1429' },
		{ time: '08:16', model: 'Claude Sonnet 4.5', action: 'Verified 4 citations', matter: 'Matter #1429' },
		{ time: '08:17', model: 'Reviewer', action: 'Approved, 1 edit', matter: 'K. Parks' },
		{ time: '08:18', model: 'System', action: 'Draft routed to client', matter: 'Sent manually' }
	];
</script>

<AnimationStage durations={[4200, 5400, 5600]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Gate — draft flows into safety layer -->
		{#if step === 0}
			<PhaseWrapper caption="Every draft passes through the safety layer before a person reviews it.">
				<div class="scene">
					<div class="gate-card">
						<div class="card-header">
							<span class="card-title">Draft Flow</span>
							<span class="card-tag card-tag-violet">Safety Layer</span>
						</div>
						<div class="flow">
							<div class="flow-node source" style="animation-delay: 150ms">
								<div class="flow-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
								</div>
								<div class="flow-label">Draft</div>
								<div class="flow-sub">Agent output</div>
							</div>
							<div class="flow-arrow" style="animation-delay: 500ms">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
							</div>
							<div class="flow-node gate" style="animation-delay: 900ms">
								<div class="flow-icon gate-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
								</div>
								<div class="flow-label">Safety Gate</div>
								<div class="flow-sub">4 checks</div>
							</div>
							<div class="flow-arrow" style="animation-delay: 1400ms">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
							</div>
							<div class="flow-node review" style="animation-delay: 1800ms">
								<div class="flow-icon review-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
								</div>
								<div class="flow-label">You</div>
								<div class="flow-sub">Attorney review</div>
							</div>
						</div>
						<div class="footer-line" style="animation-delay: 2400ms">
							<span class="footer-dot"></span>
							<span class="footer-note">Nothing reaches a client, court, or outside party without approval.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Checks animate with green badges -->
		{#if step === 1}
			<PhaseWrapper caption="The gate runs 4 checks before a draft reaches your inbox.">
				<div class="scene">
					<div class="checks-card">
						<div class="card-header">
							<span class="card-title">Safety Checks</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Running
							</span>
						</div>
						<div class="check-list">
							{#each safetyChecks as check, i}
								<div class="check-row" style="animation-delay: {250 + i * 700}ms">
									<span class="check-badge" style="animation-delay: {600 + i * 700}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
									<div class="check-body">
										<div class="check-label">{check.label}</div>
										<div class="check-detail">{check.detail}</div>
									</div>
									<span class="check-pass" style="animation-delay: {900 + i * 700}ms">Pass</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Audit trail -->
		{#if step === 2}
			<PhaseWrapper caption="Every AI-assisted action writes to an audit log your firm controls.">
				<div class="scene">
					<div class="audit-card">
						<div class="card-header">
							<span class="card-title">Audit Trail</span>
							<span class="card-tag">ABA Op. 512</span>
						</div>
						<div class="audit-list">
							{#each auditEntries as entry, i}
								<div class="audit-row" style="animation-delay: {200 + i * 850}ms">
									<span class="audit-time">{entry.time}</span>
									<div class="audit-body">
										<div class="audit-top">
											<span class="audit-model">{entry.model}</span>
											<span class="audit-matter">{entry.matter}</span>
										</div>
										<div class="audit-action">{entry.action}</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="audit-footer" style="animation-delay: 3900ms">
							<span class="footer-note">Logged. Timestamped. Exportable.</span>
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

	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.gate-card,
	.checks-card,
	.audit-card {
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
	   Phase 0: Gate flow
	   ============================= */
	.flow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
		padding: 20px 0 16px;
	}

	.flow-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.flow-icon {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 12px;
	}

	.flow-icon svg {
		width: 20px;
		height: 20px;
	}

	.gate-icon {
		background: #10b9811a;
		color: #10b981;
		box-shadow: 0 0 0 3px #10b9811a;
	}

	.review-icon {
		background: #216fed1a;
		color: #216fed;
	}

	.flow-label {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.flow-sub {
		font-size: 9px;
		color: #8181ac;
	}

	.flow-arrow {
		color: #c0c3de;
		opacity: 0;
		animation: fadeInUp 0.3s ease-out forwards;
	}

	.flow-arrow svg {
		width: 18px;
		height: 18px;
	}

	.footer-line {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: auto;
		padding-top: 14px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.footer-dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}

	/* =============================
	   Phase 1: Checks list
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

	.check-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.check-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.check-badge {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.check-badge svg {
		width: 11px;
		height: 11px;
	}

	.check-body {
		flex: 1;
		min-width: 0;
	}

	.check-label {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		line-height: 1.2;
	}

	.check-detail {
		font-size: 10px;
		color: #8181ac;
		margin-top: 2px;
	}

	.check-pass {
		flex-shrink: 0;
		font-size: 9px;
		font-weight: 700;
		color: #10b981;
		background: #10b9811a;
		padding: 3px 8px;
		border-radius: 10px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		opacity: 0;
		animation: fadeInUp 0.3s ease-out forwards;
	}

	/* =============================
	   Phase 2: Audit trail
	   ============================= */
	.audit-list {
		display: flex;
		flex-direction: column;
	}

	.audit-row {
		display: flex;
		gap: 10px;
		padding: 10px 0;
		border-bottom: 1px solid #f4f5fd;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.audit-row:last-child {
		border-bottom: none;
	}

	.audit-time {
		flex-shrink: 0;
		font-family: 'SFMono-Regular', Consolas, monospace;
		font-size: 10px;
		font-weight: 600;
		color: #836ae4;
		padding-top: 1px;
	}

	.audit-body {
		flex: 1;
		min-width: 0;
	}

	.audit-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 2px;
	}

	.audit-model {
		font-size: 10px;
		font-weight: 700;
		color: #282876;
	}

	.audit-matter {
		font-size: 9px;
		color: #a0a0c0;
	}

	.audit-action {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.3;
	}

	.audit-footer {
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}
</style>
