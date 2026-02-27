<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const logo = '/images/brand/logo-main.webp';

	const searchResults = [
		{
			name: 'Email — Johnson to CFO',
			date: '02/14/2024',
			relevance: 94,
			snippet: '...discussed the revised Q4 revenue figures before the audit...'
		},
		{
			name: 'Board Meeting Minutes',
			date: '02/20/2024',
			relevance: 87,
			snippet: '...motion to approve adjusted financial statements was tabled...'
		},
		{
			name: 'Slack DM — Finance Team',
			date: '02/22/2024',
			relevance: 82,
			snippet: '...make sure the numbers match what we sent to investors...'
		}
	];
</script>

<AnimationStage durations={[3000, 6000, 6000, 6000, 4000]} height={460}>
	{#snippet children(step)}
		<!-- Phase 0: Document Pool -->
		{#if step === 0}
			<PhaseWrapper caption="Ingest Your Entire Document Pool">
				<div class="ed-pool-scene">
					<div class="ed-pool-grid">
						{#each [
							{ icon: '📧', label: 'Emails', count: '12,400' },
							{ icon: '📄', label: 'Documents', count: '3,200' },
							{ icon: '📊', label: 'Spreadsheets', count: '850' },
							{ icon: '💬', label: 'Messages', count: '28,000' },
							{ icon: '🎥', label: 'Media', count: '120' },
							{ icon: '📁', label: 'Other ESI', count: '1,600' }
						] as item, i}
							<div class="ed-pool-item" style="animation-delay: {200 + i * 150}ms">
								<span class="ed-pool-icon">{item.icon}</span>
								<span class="ed-pool-label">{item.label}</span>
								<span class="ed-pool-count">{item.count}</span>
							</div>
						{/each}
					</div>
					<div class="ed-pool-total">46,170 items indexed</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Semantic Search -->
		{#if step === 1}
			<PhaseWrapper caption="AI-Powered Semantic Search">
				<div class="ed-search-scene">
					<div class="ed-search-card">
						<div class="ed-search-header">
							<img src={logo} alt="Dodonai" width="40" />
							<span class="ed-search-title">eDiscovery Search</span>
						</div>
						<div class="ed-search-bar">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round">
								<circle cx="11" cy="11" r="8" />
								<path d="M21 21l-4.35-4.35" />
							</svg>
							<span class="ed-search-query">financial irregularities before audit</span>
							<span class="ed-search-semantic-tag">Semantic</span>
						</div>
						<div class="ed-search-info">
							<span class="ed-search-note">
								AI understands intent, not just keywords
							</span>
						</div>
						<div class="ed-search-scanning">
							<div class="ed-scan-bar">
								<div class="ed-scan-fill"></div>
							</div>
							<span class="ed-scan-text">Searching 46,170 documents...</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: AI Relevance Scoring -->
		{#if step === 2}
			<PhaseWrapper caption="AI Relevance Scoring & Analysis">
				<div class="ed-results-scene">
					<div class="ed-results-card">
						<div class="ed-results-header">
							<span class="ed-results-count">47 relevant documents found</span>
						</div>
						<div class="ed-results-list">
							{#each searchResults as result, i}
								<div class="ed-result-item" style="animation-delay: {600 + i * 600}ms">
									<div class="ed-result-top">
										<span class="ed-result-name">{result.name}</span>
										<span class="ed-result-relevance" style="background: {result.relevance >= 90 ? '#dcfce7' : result.relevance >= 85 ? '#dbeafe' : '#fef3c7'}; color: {result.relevance >= 90 ? '#166534' : result.relevance >= 85 ? '#1e40af' : '#92400e'}">
											{result.relevance}%
										</span>
									</div>
									<span class="ed-result-date">{result.date}</span>
									<span class="ed-result-snippet">{result.snippet}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Document Review -->
		{#if step === 3}
			<PhaseWrapper caption="Review & Tag Documents">
				<div class="ed-review-scene">
					<div class="ed-review-card">
						<div class="ed-review-header">
							<span class="ed-review-title">Email — Johnson to CFO</span>
							<span class="ed-review-relevance">94% match</span>
						</div>
						<div class="ed-review-meta">
							<div class="ed-meta-row">
								<span class="ed-meta-label">From:</span>
								<span class="ed-meta-value">r.johnson@company.com</span>
							</div>
							<div class="ed-meta-row">
								<span class="ed-meta-label">To:</span>
								<span class="ed-meta-value">cfo@company.com</span>
							</div>
							<div class="ed-meta-row">
								<span class="ed-meta-label">Date:</span>
								<span class="ed-meta-value">Feb 14, 2024</span>
							</div>
						</div>
						<div class="ed-review-body">
							<span class="ed-body-text">...we should discuss the <span class="ed-highlight">revised Q4 revenue figures</span> before the <span class="ed-highlight">audit committee meeting</span> next week. The current numbers don't reflect...</span>
						</div>
						<div class="ed-review-tags">
							{#each ['Relevant', 'Privileged Review', 'Key Document'] as tag, i}
								<span class="ed-tag" style="animation-delay: {2000 + i * 400}ms">{tag}</span>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Export -->
		{#if step === 4}
			<PhaseWrapper caption="Export Your Discovery Results">
				<div class="ed-export-scene">
					<div class="ed-export-card">
						<div class="ed-export-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="ed-export-stats">
							{#each [
								{ value: '46K', label: 'Docs Searched' },
								{ value: '47', label: 'Relevant' },
								{ value: '12', label: 'Key Docs' }
							] as stat, i}
								<div class="ed-stat" style="animation-delay: {400 + i * 300}ms">
									<span class="ed-stat-value">{stat.value}</span>
									<span class="ed-stat-label">{stat.label}</span>
								</div>
							{/each}
						</div>
						<div class="ed-export-ring-wrap">
							<svg viewBox="0 0 100 100" width="48" height="48">
								<circle cx="50" cy="50" r="36" fill="none" stroke="#e5e7eb" stroke-width="5" />
								<circle cx="50" cy="50" r="36" fill="none" stroke="#4CAF50" stroke-width="5" class="ed-progress-ring" />
							</svg>
							<span class="ed-checkmark">&#10003;</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes edFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes edFadeInUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes edFadeInScale {
		0% { opacity: 0; transform: scale(0.85); }
		100% { opacity: 1; transform: scale(1); }
	}

	/* =============================
	   Phase 0: Document Pool
	   ============================= */
	.ed-pool-scene {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.ed-pool-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		max-width: 360px;
	}

	.ed-pool-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 12px 10px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		opacity: 0;
		animation: edFadeInUp 0.4s ease-out forwards;
	}

	.ed-pool-icon {
		font-size: 20px;
	}

	.ed-pool-label {
		font-size: 9px;
		font-weight: 600;
		color: #282876;
	}

	.ed-pool-count {
		font-size: 11px;
		font-weight: 700;
		color: #2B78B1;
	}

	.ed-pool-total {
		font-size: 11px;
		font-weight: 600;
		color: #059669;
		background: #d1fae5;
		padding: 4px 14px;
		border-radius: 10px;
		opacity: 0;
		animation: edFadeIn 0.5s ease-out 1.5s forwards;
	}

	/* =============================
	   Phase 1: Semantic Search
	   ============================= */
	.ed-search-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ed-search-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 380px;
		width: 100%;
		overflow: hidden;
		animation: edFadeInScale 0.6s ease-out forwards;
	}

	.ed-search-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.ed-search-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.ed-search-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-bottom: 2px solid #2B78B1;
		background: #f4f5fd;
	}

	.ed-search-query {
		font-size: 12px;
		font-weight: 600;
		color: #282876;
		flex: 1;
	}

	.ed-search-semantic-tag {
		font-size: 8px;
		font-weight: 700;
		color: #7c3aed;
		background: #ede9fe;
		padding: 2px 6px;
		border-radius: 6px;
	}

	.ed-search-info {
		padding: 8px 16px;
	}

	.ed-search-note {
		font-size: 10px;
		color: #8181ac;
		font-style: italic;
	}

	.ed-search-scanning {
		padding: 12px 16px;
	}

	.ed-scan-bar {
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 6px;
	}

	.ed-scan-fill {
		height: 100%;
		background: linear-gradient(90deg, #2B78B1, #7c3aed);
		border-radius: 2px;
		width: 0%;
		animation: edScanFill 4.5s ease-in-out 0.5s forwards;
	}

	@keyframes edScanFill {
		0% { width: 0%; }
		100% { width: 100%; }
	}

	.ed-scan-text {
		font-size: 10px;
		color: #2B78B1;
		font-weight: 600;
	}

	/* =============================
	   Phase 2: Relevance Scoring
	   ============================= */
	.ed-results-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ed-results-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		overflow: hidden;
		animation: edFadeInScale 0.6s ease-out forwards;
	}

	.ed-results-header {
		padding: 12px 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.ed-results-count {
		font-size: 12px;
		font-weight: 700;
		color: #059669;
	}

	.ed-results-list {
		padding: 10px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ed-result-item {
		padding: 10px 12px;
		background: #f4f5fd;
		border-radius: 8px;
		border-left: 3px solid #2B78B1;
		opacity: 0;
		animation: edFadeInUp 0.5s ease-out forwards;
	}

	.ed-result-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3px;
	}

	.ed-result-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.ed-result-relevance {
		font-size: 9px;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 6px;
	}

	.ed-result-date {
		font-size: 9px;
		color: #8181ac;
		display: block;
		margin-bottom: 4px;
	}

	.ed-result-snippet {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.5;
		font-style: italic;
	}

	/* =============================
	   Phase 3: Document Review
	   ============================= */
	.ed-review-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ed-review-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		padding: 16px 20px;
		animation: edFadeInScale 0.6s ease-out forwards;
	}

	.ed-review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
	}

	.ed-review-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.ed-review-relevance {
		font-size: 10px;
		font-weight: 700;
		color: #166534;
		background: #dcfce7;
		padding: 2px 8px;
		border-radius: 8px;
	}

	.ed-review-meta {
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-bottom: 10px;
		padding: 8px 10px;
		background: #f4f5fd;
		border-radius: 6px;
		opacity: 0;
		animation: edFadeIn 0.5s ease-out 0.5s forwards;
	}

	.ed-meta-row {
		display: flex;
		gap: 6px;
		font-size: 10px;
	}

	.ed-meta-label {
		font-weight: 600;
		color: #8181ac;
		width: 36px;
	}

	.ed-meta-value {
		color: #282876;
	}

	.ed-review-body {
		padding: 10px 12px;
		background: #fffbeb;
		border-radius: 6px;
		border: 1px solid #fde68a;
		margin-bottom: 10px;
		opacity: 0;
		animation: edFadeIn 0.5s ease-out 1s forwards;
	}

	.ed-body-text {
		font-size: 10px;
		line-height: 1.6;
		color: #8181ac;
	}

	.ed-highlight {
		background: #fef08a;
		padding: 0 2px;
		border-radius: 2px;
		font-weight: 600;
	}

	.ed-review-tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.ed-tag {
		font-size: 9px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 10px;
		background: #e8e8f4;
		color: #282876;
		opacity: 0;
		animation: edFadeIn 0.3s ease-out forwards;
	}

	/* =============================
	   Phase 4: Export
	   ============================= */
	.ed-export-scene {
		display: flex;
		justify-content: center;
	}

	.ed-export-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 28px;
		min-width: 280px;
		max-width: 320px;
		text-align: center;
		animation: edFadeInScale 0.6s ease-out forwards;
	}

	.ed-export-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.ed-export-stats {
		display: flex;
		justify-content: space-around;
		margin-bottom: 16px;
	}

	.ed-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		opacity: 0;
		animation: edFadeInUp 0.4s ease-out forwards;
	}

	.ed-stat-value {
		font-size: 18px;
		font-weight: 700;
		color: #282876;
	}

	.ed-stat-label {
		font-size: 9px;
		color: #8181ac;
	}

	.ed-export-ring-wrap {
		position: relative;
		width: 48px;
		height: 48px;
		margin: 0 auto;
	}

	.ed-progress-ring {
		stroke-dasharray: 226.2;
		stroke-dashoffset: 226.2;
		transform-origin: center;
		animation: edProgressCircle 1.5s ease-in-out 1.5s forwards;
	}

	@keyframes edProgressCircle {
		to { stroke-dashoffset: 0; }
	}

	.ed-checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 20px;
		color: #4caf50;
		opacity: 0;
		animation: edCheckPop 0.3s ease-out 3s forwards;
	}

	@keyframes edCheckPop {
		0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
		100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
	}
</style>
