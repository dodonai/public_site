<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';
	import PdfDocIcon from '$lib/components/animation/PdfDocIcon.svelte';

	const logo = '/images/brand/logo-main.webp';

	const transcriptLines = [
		{ line: 5, q: true, text: 'Could you state your full name for the record?' },
		{ line: 6, q: false, text: 'James Allen Mitchell.' },
		{ line: 7, q: true, text: 'And your current occupation?' },
		{ line: 8, q: false, text: 'I am a construction site supervisor for' },
		{ line: 9, q: false, text: 'Meridian Builders, Inc.' },
		{ line: 10, q: true, text: 'How long have you held that position?' },
		{ line: 11, q: false, text: 'Approximately seven years.' }
	];

	const chatMessages = [
		{ role: 'user', text: 'What did the witness say about the stop sign?' },
		{
			role: 'ai',
			text: 'The witness stated he did not observe the stop sign prior to the collision (25:11-15). He was traveling approximately 35 mph at the time.'
		}
	];
</script>

<AnimationStage durations={[3000, 6000, 7000, 5000, 5000, 4000]} height={460}>
	{#snippet children(step)}
		<!-- Phase 0: Upload Transcripts -->
		{#if step === 0}
			<PhaseWrapper caption="Upload Your Deposition Transcripts">
				<div class="tm-upload-scene">
					<div class="tm-file-stack">
						{#each ['Mitchell Depo.pdf', 'Rodriguez Depo.pdf', 'Chen Depo.txt'] as name, i}
							<div class="tm-file-item" style="animation-delay: {300 + i * 250}ms">
								<PdfDocIcon height={36} width={28} label={name.endsWith('.txt') ? 'TXT' : 'PDF'} />
								<div class="tm-file-info">
									<span class="tm-file-name">{name}</span>
									<span class="tm-file-size">{['127 pages', '89 pages', '54 pages'][i]}</span>
								</div>
							</div>
						{/each}
					</div>
					<div class="tm-upload-arrow">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#216fed" stroke-width="2" stroke-linecap="round">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
					<div class="tm-platform-icon">
						<img src={logo} alt="Dodonai" width="60" />
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Transcript Viewer -->
		{#if step === 1}
			<PhaseWrapper caption="Interactive Transcript Viewer">
				<div class="tm-viewer-scene">
					<div class="tm-viewer-card">
						<div class="tm-viewer-header">
							<span class="tm-viewer-title">Mitchell Deposition — Page 5</span>
							<span class="tm-viewer-badge">127 pages</span>
						</div>
						<div class="tm-viewer-body">
							{#each transcriptLines as tl, i}
								<div class="tm-line" style="animation-delay: {400 + i * 300}ms">
									<span class="tm-line-num">{tl.line}</span>
									<span class="tm-line-text" class:tm-line-q={tl.q}>
										{tl.q ? 'Q: ' : 'A: '}{tl.text}
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: AI Chat -->
		{#if step === 2}
			<PhaseWrapper caption="AI Chat Copilot">
				<div class="tm-chat-scene">
					<div class="tm-chat-card">
						<div class="tm-chat-header">
							<img src={logo} alt="Dodonai" width="40" />
							<span class="tm-chat-title">Deposition Chat</span>
						</div>
						<div class="tm-chat-messages">
							{#each chatMessages as msg, i}
								<div
									class="tm-chat-bubble"
									class:tm-chat-user={msg.role === 'user'}
									class:tm-chat-ai={msg.role === 'ai'}
									style="animation-delay: {600 + i * 1500}ms"
								>
									{#if msg.role === 'ai'}
										<div class="tm-ai-label">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#216fed" stroke-width="2">
												<path d="M12 2a4 4 0 014 4v1h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2V6a4 4 0 014-4z" />
											</svg>
											AI
										</div>
									{/if}
									<span class="tm-chat-text">{msg.text}</span>
								</div>
							{/each}
						</div>
						<div class="tm-chat-input">
							<span class="tm-chat-placeholder">Ask about the deposition...</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Blue Book Citations -->
		{#if step === 3}
			<PhaseWrapper caption="Automated Blue Book Citations">
				<div class="tm-cite-scene">
					<div class="tm-cite-card">
						<div class="tm-cite-header">Blue Book Citation</div>
						<div class="tm-cite-highlight">
							<span class="tm-cite-selected">
								"I did not observe the stop sign prior to the collision."
							</span>
						</div>
						<div class="tm-cite-output">
							<div class="tm-cite-label">Generated Citation</div>
							<div class="tm-cite-text">
								<span class="tm-cite-formatted">
									Dep. of James Mitchell, 25:11-13 (Mar. 20, 2024).
								</span>
							</div>
							<button class="tm-cite-copy">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
									<rect x="9" y="9" width="13" height="13" rx="2" />
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
								</svg>
								Copy
							</button>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Full-Text Search -->
		{#if step === 4}
			<PhaseWrapper caption="Full-Text Search Across Transcripts">
				<div class="tm-search-scene">
					<div class="tm-search-card">
						<div class="tm-search-bar">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round">
								<circle cx="11" cy="11" r="8" />
								<path d="M21 21l-4.35-4.35" />
							</svg>
							<span class="tm-search-query">stop sign</span>
						</div>
						<div class="tm-search-results">
							{#each [
								{ depo: 'Mitchell', cite: '25:11', text: '...did not observe the stop sign prior...' },
								{ depo: 'Mitchell', cite: '31:4', text: '...stop sign was obscured by vegetation...' },
								{ depo: 'Rodriguez', cite: '12:8', text: '...I saw the stop sign clearly from...' }
							] as result, i}
								<div class="tm-search-result" style="animation-delay: {600 + i * 400}ms">
									<div class="tm-result-header">
										<span class="tm-result-depo">{result.depo}</span>
										<span class="tm-result-cite">{result.cite}</span>
									</div>
									<span class="tm-result-text">{result.text}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 5: Complete -->
		{#if step === 5}
			<PhaseWrapper caption="Your Complete Transcript Toolkit">
				<div class="tm-complete-scene">
					<div class="tm-complete-card">
						<div class="tm-complete-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="tm-complete-stats">
							{#each [
								{ value: '3', label: 'Transcripts' },
								{ value: '270', label: 'Pages' },
								{ value: '12', label: 'Annotations' }
							] as stat, i}
								<div class="tm-stat" style="animation-delay: {400 + i * 300}ms">
									<span class="tm-stat-value">{stat.value}</span>
									<span class="tm-stat-label">{stat.label}</span>
								</div>
							{/each}
						</div>
						<div class="tm-complete-features">
							{#each ['AI Chat', 'Citations', 'Search', 'Annotations'] as feature, i}
								<span class="tm-feature-tag" style="animation-delay: {1200 + i * 200}ms">{feature}</span>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes tmFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes tmFadeInUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes tmFadeInScale {
		0% { opacity: 0; transform: scale(0.85); }
		100% { opacity: 1; transform: scale(1); }
	}

	/* =============================
	   Phase 0: Upload
	   ============================= */
	.tm-upload-scene {
		display: flex;
		align-items: center;
		gap: 24px;
		justify-content: center;
	}

	.tm-file-stack {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tm-file-item {
		display: flex;
		align-items: center;
		gap: 10px;
		background: white;
		border-radius: 10px;
		padding: 10px 14px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		opacity: 0;
		animation: tmFadeInUp 0.5s ease-out forwards;
	}

	.tm-file-info {
		display: flex;
		flex-direction: column;
	}

	.tm-file-name {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	.tm-file-size {
		font-size: 9px;
		color: #8181ac;
	}

	.tm-upload-arrow {
		opacity: 0;
		animation: tmFadeIn 0.5s ease-out 1s forwards;
	}

	.tm-platform-icon {
		background: white;
		border-radius: 12px;
		padding: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		opacity: 0;
		animation: tmFadeInScale 0.5s ease-out 1.3s forwards;
	}

	/* =============================
	   Phase 1: Transcript Viewer
	   ============================= */
	.tm-viewer-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.tm-viewer-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		overflow: hidden;
		animation: tmFadeInScale 0.6s ease-out forwards;
	}

	.tm-viewer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: #f4f5fd;
		border-bottom: 1px solid #e5e7eb;
	}

	.tm-viewer-title {
		font-size: 12px;
		font-weight: 700;
		color: #282876;
	}

	.tm-viewer-badge {
		font-size: 9px;
		font-weight: 600;
		color: #216fed;
		background: #e8e8f4;
		padding: 2px 8px;
		border-radius: 8px;
	}

	.tm-viewer-body {
		padding: 12px 16px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.tm-line {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		opacity: 0;
		animation: tmFadeInUp 0.4s ease-out forwards;
	}

	.tm-line-num {
		font-size: 9px;
		color: #9ca3af;
		width: 20px;
		text-align: right;
		flex-shrink: 0;
		font-family: 'Courier New', monospace;
		padding-top: 1px;
	}

	.tm-line-text {
		font-size: 10px;
		line-height: 1.6;
		color: #8181ac;
	}

	.tm-line-q {
		font-weight: 600;
		color: #282876;
	}

	/* =============================
	   Phase 2: AI Chat
	   ============================= */
	.tm-chat-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.tm-chat-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 380px;
		width: 100%;
		overflow: hidden;
		animation: tmFadeInScale 0.6s ease-out forwards;
	}

	.tm-chat-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.tm-chat-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.tm-chat-messages {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: 180px;
	}

	.tm-chat-bubble {
		max-width: 85%;
		padding: 10px 14px;
		border-radius: 12px;
		font-size: 11px;
		line-height: 1.6;
		opacity: 0;
		animation: tmFadeInUp 0.5s ease-out forwards;
	}

	.tm-chat-user {
		align-self: flex-end;
		background: #216fed;
		color: white;
		border-bottom-right-radius: 4px;
	}

	.tm-chat-ai {
		align-self: flex-start;
		background: #f4f5fd;
		color: #8181ac;
		border-bottom-left-radius: 4px;
	}

	.tm-ai-label {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 9px;
		font-weight: 700;
		color: #216fed;
		margin-bottom: 4px;
	}

	.tm-chat-text {
		font-size: 10px;
	}

	.tm-chat-input {
		padding: 10px 16px;
		border-top: 1px solid #e5e7eb;
		background: #f4f5fd;
	}

	.tm-chat-placeholder {
		font-size: 11px;
		color: #9ca3af;
	}

	/* =============================
	   Phase 3: Blue Book Citations
	   ============================= */
	.tm-cite-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.tm-cite-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 380px;
		width: 100%;
		padding: 18px 22px;
		animation: tmFadeInScale 0.6s ease-out forwards;
	}

	.tm-cite-header {
		font-size: 14px;
		font-weight: 700;
		color: #2B78B1;
		text-align: center;
		margin-bottom: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
	}

	.tm-cite-highlight {
		background: #fef9c3;
		border-left: 3px solid #d97706;
		padding: 10px 14px;
		border-radius: 0 8px 8px 0;
		margin-bottom: 14px;
		opacity: 0;
		animation: tmFadeIn 0.5s ease-out 0.5s forwards;
	}

	.tm-cite-selected {
		font-size: 11px;
		line-height: 1.6;
		color: #8181ac;
		font-style: italic;
	}

	.tm-cite-output {
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 8px;
		padding: 12px 14px;
		opacity: 0;
		animation: tmFadeInUp 0.5s ease-out 1.5s forwards;
	}

	.tm-cite-label {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #059669;
		margin-bottom: 6px;
	}

	.tm-cite-text {
		margin-bottom: 8px;
	}

	.tm-cite-formatted {
		font-size: 11px;
		font-family: Georgia, serif;
		color: #282876;
		font-style: italic;
	}

	.tm-cite-copy {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 10px;
		border-radius: 6px;
		border: 1px solid #d1d5db;
		background: white;
		font-size: 10px;
		font-weight: 600;
		color: #8181ac;
		cursor: default;
	}

	/* =============================
	   Phase 4: Full-Text Search
	   ============================= */
	.tm-search-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.tm-search-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 380px;
		width: 100%;
		overflow: hidden;
		animation: tmFadeInScale 0.6s ease-out forwards;
	}

	.tm-search-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-bottom: 2px solid #216fed;
		background: #f4f5fd;
	}

	.tm-search-query {
		font-size: 13px;
		font-weight: 600;
		color: #282876;
	}

	.tm-search-results {
		padding: 10px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tm-search-result {
		padding: 10px 12px;
		background: #f4f5fd;
		border-radius: 8px;
		border-left: 3px solid #216fed;
		opacity: 0;
		animation: tmFadeInUp 0.4s ease-out forwards;
	}

	.tm-result-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 4px;
	}

	.tm-result-depo {
		font-size: 10px;
		font-weight: 700;
		color: #282876;
	}

	.tm-result-cite {
		font-size: 10px;
		font-weight: 600;
		color: #216fed;
	}

	.tm-result-text {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.5;
	}

	/* =============================
	   Phase 5: Complete
	   ============================= */
	.tm-complete-scene {
		display: flex;
		justify-content: center;
	}

	.tm-complete-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 28px;
		min-width: 280px;
		max-width: 320px;
		text-align: center;
		animation: tmFadeInScale 0.6s ease-out forwards;
	}

	.tm-complete-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.tm-complete-stats {
		display: flex;
		justify-content: space-around;
		margin-bottom: 16px;
	}

	.tm-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		opacity: 0;
		animation: tmFadeInUp 0.4s ease-out forwards;
	}

	.tm-stat-value {
		font-size: 18px;
		font-weight: 700;
		color: #282876;
	}

	.tm-stat-label {
		font-size: 9px;
		color: #8181ac;
	}

	.tm-complete-features {
		display: flex;
		justify-content: center;
		gap: 6px;
		flex-wrap: wrap;
	}

	.tm-feature-tag {
		font-size: 9px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 10px;
		background: #e8e8f4;
		color: #282876;
		opacity: 0;
		animation: tmFadeIn 0.3s ease-out forwards;
	}
</style>
