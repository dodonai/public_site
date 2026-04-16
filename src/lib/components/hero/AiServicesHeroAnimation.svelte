<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const nodes = [
		{ label: 'Intake', icon: 'inbox' },
		{ label: 'Matters', icon: 'folder' },
		{ label: 'Docket', icon: 'calendar' },
		{ label: 'Filings', icon: 'file' },
		{ label: 'Billing', icon: 'billing' }
	];

	const agents = [
		{ name: 'Intake Triage', icon: 'inbox', status: 'Scoring new leads' },
		{ name: 'Conflict Check', icon: 'shield', status: 'Scanning prior matters' },
		{ name: 'Docket Monitor', icon: 'calendar', status: 'Tracking SOL deadlines' },
		{ name: 'Deposition Prep', icon: 'docs', status: 'Drafting outlines' },
		{ name: 'Client Updates', icon: 'mail', status: 'Status digests' },
		{ name: 'Matter Health', icon: 'chart', status: 'Case dashboards' }
	];

	const feedItems = [
		{ agent: 'Intake Triage', summary: 'Drafted follow-up for new PI lead (score 84)', time: 'just now' },
		{ agent: 'Docket Monitor', summary: 'Flagged SOL deadline in 14 days on Morales v. Crane', time: '2m ago' },
		{ agent: 'Deposition Prep', summary: 'Built cross-exam outline from Smith transcript (40 pp)', time: '11m ago' },
		{ agent: 'Client Updates', summary: 'Drafted Q2 status letters for 8 matters', time: '24m ago' }
	];

	const stats = [
		{ label: 'Drafts this week', value: '142' },
		{ label: 'Approved', value: '128' },
		{ label: 'Time saved', value: '31 hrs' }
	];
</script>

<AnimationStage durations={[4200, 5400, 5600]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Blueprint -->
		{#if step === 0}
			<PhaseWrapper caption="We map your workflows. The 1% gap is where humans still do the repetitive work.">
				<div class="scene">
					<div class="blueprint-card">
						<div class="card-header">
							<span class="card-title">Your Firm Workflows</span>
							<span class="card-tag">Blueprint</span>
						</div>
						<div class="pipeline">
							{#each nodes as node, i}
								<div class="node" style="animation-delay: {150 + i * 180}ms">
									<div class="node-icon">
										{#if node.icon === 'inbox'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
										{:else if node.icon === 'folder'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
										{:else if node.icon === 'calendar'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
										{:else if node.icon === 'file'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
										{:else if node.icon === 'billing'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
										{/if}
									</div>
									<span class="node-label">{node.label}</span>
									<span class="gap-tag" style="animation-delay: {700 + i * 180}ms">1% gap</span>
								</div>
								{#if i < nodes.length - 1}
									<div class="connector" style="animation-delay: {300 + i * 180}ms"></div>
								{/if}
							{/each}
						</div>
						<div class="blueprint-footer">
							<span class="footer-note">Where repetitive work hides between systems.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Build — agents materialize -->
		{#if step === 1}
			<PhaseWrapper caption="We deploy custom agents tuned to your firm.">
				<div class="scene">
					<div class="roster-card">
						<div class="card-header">
							<span class="card-title">Your Firm's Agents</span>
							<span class="card-tag card-tag-violet">6 deployed</span>
						</div>
						<div class="roster-grid">
							{#each agents as agent, i}
								<div class="agent-card" style="animation-delay: {120 + i * 280}ms">
									<div class="agent-icon">
										{#if agent.icon === 'inbox'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
										{:else if agent.icon === 'shield'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
										{:else if agent.icon === 'calendar'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
										{:else if agent.icon === 'docs'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
										{:else if agent.icon === 'mail'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
										{:else if agent.icon === 'chart'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
										{/if}
									</div>
									<div class="agent-body">
										<div class="agent-name">{agent.name}</div>
										<div class="agent-status">{agent.status}</div>
									</div>
									<div class="agent-badge" style="animation-delay: {500 + i * 280}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Managed — activity feed + stats -->
		{#if step === 2}
			<PhaseWrapper caption="You stay in the pilot seat. Every action is a draft you approve.">
				<div class="scene">
					<div class="feed-card">
						<div class="card-header">
							<span class="card-title">Activity</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Live
							</span>
						</div>
						<div class="feed-list">
							{#each feedItems as item, i}
								<div class="feed-item" style="animation-delay: {250 + i * 900}ms">
									<div class="feed-avatar">{item.agent.charAt(0)}</div>
									<div class="feed-body">
										<div class="feed-line">
											<span class="feed-agent">{item.agent}</span>
											<span class="feed-time">{item.time}</span>
										</div>
										<div class="feed-summary">{item.summary}</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="stats-row">
							{#each stats as stat, i}
								<div class="stat" style="animation-delay: {1500 + i * 180}ms">
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

	@keyframes connectorDraw {
		from { transform: scaleX(0); opacity: 0; }
		to { transform: scaleX(1); opacity: 1; }
	}

	/* =============================
	   Shared scene + card shell
	   ============================= */
	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.blueprint-card,
	.roster-card,
	.feed-card {
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
	   Phase 0: Blueprint pipeline
	   ============================= */
	.pipeline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4px;
		padding: 8px 0 16px;
	}

	.node {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
		flex-shrink: 0;
	}

	.node-icon {
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 10px;
	}

	.node-icon svg {
		width: 18px;
		height: 18px;
	}

	.node-label {
		font-size: 10px;
		font-weight: 600;
		color: #282876;
	}

	.gap-tag {
		font-size: 8px;
		font-weight: 600;
		color: #dc2626;
		background: #fee2e2;
		padding: 2px 6px;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.35s ease-out forwards;
	}

	.connector {
		flex: 1;
		height: 2px;
		background: repeating-linear-gradient(
			to right,
			#cbd5e1 0,
			#cbd5e1 4px,
			transparent 4px,
			transparent 8px
		);
		transform-origin: left center;
		transform: scaleX(0);
		opacity: 0;
		animation: connectorDraw 0.5s ease-out forwards;
		margin-top: -28px;
	}

	.blueprint-footer {
		margin-top: auto;
		padding-top: 10px;
		border-top: 1px solid #eef0fa;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}

	/* =============================
	   Phase 1: Agent roster (3×2)
	   ============================= */
	.roster-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.agent-card {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 8px 10px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.agent-icon {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 8px;
	}

	.agent-icon svg {
		width: 14px;
		height: 14px;
	}

	.agent-body {
		flex: 1;
		min-width: 0;
	}

	.agent-name {
		font-size: 10px;
		font-weight: 700;
		color: #282876;
		margin-bottom: 2px;
		line-height: 1.2;
	}

	.agent-status {
		font-size: 9px;
		color: #8181ac;
		line-height: 1.3;
	}

	.agent-badge {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 14px;
		height: 14px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.agent-badge svg {
		width: 8px;
		height: 8px;
	}

	/* =============================
	   Phase 2: Activity feed + stats
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

	.feed-list {
		display: flex;
		flex-direction: column;
	}

	.feed-item {
		display: flex;
		gap: 10px;
		padding: 8px 0;
		border-bottom: 1px solid #f4f5fd;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.feed-item:last-child {
		border-bottom: none;
	}

	.feed-avatar {
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: linear-gradient(135deg, #836ae4, #6b4fd4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
	}

	.feed-body {
		flex: 1;
		min-width: 0;
	}

	.feed-line {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 2px;
	}

	.feed-agent {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.feed-time {
		font-size: 9px;
		color: #a0a0c0;
		flex-shrink: 0;
	}

	.feed-summary {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.4;
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
		font-size: 16px;
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
