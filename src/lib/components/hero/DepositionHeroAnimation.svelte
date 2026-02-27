<script>
	import PdfDocIcon from '$lib/components/animation/PdfDocIcon.svelte';
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const logo = '/images/brand/logo-main.webp';

	const execSections = [
		{
			title: 'Key Testimony',
			text: 'James Mitchell confirmed he was the driver and did not observe the stop sign prior to the collision.'
		},
		{
			title: 'Disputed Facts',
			text: 'Parties disagree on visibility conditions and posted speed limit at the intersection.'
		},
		{
			title: 'Damages & Injuries',
			text: 'Plaintiff claims cervical strain and $42,000 in medical expenses to date.'
		}
	];

	const tableRows = [
		{
			citation: '5:10-15',
			summary: 'Witness confirmed his identity and employment as a construction site supervisor.',
			topics: ['Identity', 'Employment']
		},
		{
			citation: '5:16-24',
			summary: 'Described the sequence of events at the intersection, stated visibility was clear.',
			topics: ['Accident', 'Visibility']
		},
		{
			citation: '6:1-14',
			summary: 'Acknowledged familiarity with the intersection, drives through it daily.',
			topics: ['Prior Knowledge']
		},
		{
			citation: '6:15-25',
			summary: 'Did not observe the stop sign, traveling at approximately 35 mph.',
			topics: ['Speed', 'Traffic Signs']
		}
	];
</script>

<AnimationStage durations={[4000, 4000, 7000, 8000, 4000, 5000, 6000]} height={460}>
	{#snippet children(step)}
		<!-- Phase 0: Transcript Upload -->
		{#if step === 0}
			<PhaseWrapper caption="Upload Your Deposition Transcript">
				<div class="transcript-scene">
					<div class="pdf-document">
						<div class="pdf-icon">
							<PdfDocIcon height={64} width={50} label="PDF" />
						</div>
						<div class="pdf-info">
							<span class="pdf-name">Deposition of James Mitchell.pdf</span>
							<span class="pdf-meta">127 pages</span>
						</div>
					</div>

					<div class="upload-target">
						<svg
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#216fed"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" />
							<path d="M17 8L12 3L7 8" />
							<path d="M12 3V15" />
						</svg>
						<div class="upload-target-ring"></div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Processing -->
		{#if step === 1}
			<PhaseWrapper caption="AI-Powered Analysis">
				<div class="processing-scene">
					<div class="processing-card">
						<div class="processing-header">
							<img src={logo} alt="Dodonai" width="60" />
						</div>
						<div class="processing-status">
							<span class="processing-text">Analyzing deposition...</span>
						</div>
						<div class="processing-bar">
							<div class="processing-bar-fill"></div>
						</div>
						<div class="processing-transcript">
							{#each Array(6) as _, i}
								<div
									class="transcript-line"
									style="width: {60 + (i * 23) % 35}%; animation-delay: {i * 150}ms"
								></div>
							{/each}
							<div class="processing-scan-line"></div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Executive Summary -->
		{#if step === 2}
			<PhaseWrapper caption="Customizable Executive Summary">
				<div class="exec-scene">
					<div class="exec-card">
						<div class="exec-header">
							<div class="exec-title">Executive Summary</div>
							<div class="exec-template-chip">
								<svg class="exec-template-icon" width="12" height="12" viewBox="0 0 16 16" fill="none">
									<rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
									<line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									<line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									<line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
								Deposition Analysis
							</div>
						</div>
						<div class="exec-sections">
							{#each execSections as section, i}
								<div class="exec-section" style="animation-delay: {800 + i * 1400}ms">
									<div class="exec-section-title">{section.title}</div>
									<div class="exec-section-text">{section.text}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Page-Line Table -->
		{#if step === 3}
			<PhaseWrapper caption="Page-Line Summary with Topics">
				<div class="table-scene">
					<div class="pl-card">
						<div class="pl-title">Page-Line Summary</div>
						<div class="pl-table">
							<div class="pl-header-row">
								<div class="pl-header-cell pl-col-cite">Citation</div>
								<div class="pl-header-cell pl-col-summary">Summary</div>
								<div class="pl-header-cell pl-col-topics">Topics</div>
							</div>
							{#each tableRows as row, i}
								<div
									class="pl-row"
									class:pl-row-even={i % 2 === 1}
									style="animation-delay: {800 + i * 600}ms"
								>
									<div class="pl-cell pl-col-cite">
										<span class="pl-citation">{row.citation}</span>
									</div>
									<div class="pl-cell pl-col-summary">{row.summary}</div>
									<div class="pl-cell pl-col-topics">
										{#each row.topics as topic}
											<span class="pl-topic-badge">{topic}</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Citation Link -->
		{#if step === 4}
			<PhaseWrapper caption="Every Summary Linked to Source">
				<div class="cite-scene">
					<div class="cite-summary-side">
						<div class="cite-summary-label">Summary</div>
						<div class="cite-row-highlight">
							<span class="cite-ref">25:11-19</span>
							<span class="cite-text"
								>Did not observe the stop sign, traveling at approximately 35 mph.</span
							>
						</div>
					</div>

					<div class="cite-connector">
						<svg width="60" height="40" viewBox="0 0 60 40" fill="none">
							<path
								d="M0 20 C20 20, 40 20, 60 20"
								stroke="#216fed"
								stroke-width="2"
								stroke-dasharray="4 3"
								class="cite-connector-path"
							/>
							<circle cx="0" cy="20" r="4" fill="#216fed" class="cite-dot-left" />
							<circle cx="60" cy="20" r="4" fill="#216fed" class="cite-dot-right" />
						</svg>
					</div>

					<div class="cite-transcript-side">
						<div class="cite-transcript-label">Transcript — Page 25</div>
						<div class="cite-transcript-page">
							<div class="cite-line-num">11</div>
							<div class="cite-line-text cite-highlighted">
								Q: Did you see the stop sign?
							</div>
							<div class="cite-line-num">12</div>
							<div class="cite-line-text cite-highlighted">
								A: No, I did not observe the stop
							</div>
							<div class="cite-line-num">13</div>
							<div class="cite-line-text cite-highlighted">sign prior to the collision.</div>
							<div class="cite-line-num">14</div>
							<div class="cite-line-text cite-highlighted">
								Q: How fast were you traveling?
							</div>
							<div class="cite-line-num">15</div>
							<div class="cite-line-text cite-highlighted">
								A: Approximately 35 miles per hour.
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 5: Download -->
		{#if step === 5}
			<PhaseWrapper caption="Download in Multiple Formats">
				<div class="download-scene">
					<div class="download-card">
						<div class="download-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="download-formats">
							{#each [{ label: '.DOCX', color: '#2B78B1', letter: 'W' }, { label: '.PDF', color: '#E2574C', letter: 'P' }, { label: '.TXT', color: '#8181ac', letter: 'T' }] as fmt, i}
								<button
									class="download-format-btn"
									style="animation-delay: {600 + i * 400}ms; --fmt-color: {fmt.color}"
								>
									<div class="download-fmt-icon" style="background: {fmt.color}">
										{fmt.letter}
									</div>
									<span>{fmt.label}</span>
								</button>
							{/each}
						</div>
						<div class="download-success">
							<svg viewBox="0 0 100 100" width="48" height="48">
								<circle cx="50" cy="50" r="36" fill="none" stroke="#e5e7eb" stroke-width="5" />
								<circle
									cx="50"
									cy="50"
									r="36"
									fill="none"
									stroke="#4CAF50"
									stroke-width="5"
									class="download-progress-ring"
								/>
							</svg>
							<span class="download-checkmark">&#10003;</span>
						</div>
						<span class="download-link">
							Download Summary
						</span>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 6: Hold & Reset -->
		{#if step === 6}
			<PhaseWrapper>
				<div class="hold-scene">
					<div class="hold-card">
						<div class="hold-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="hold-title">Deposition Summary Complete</div>
						<div class="hold-file">
							<PdfDocIcon height={40} width={32} color="#2B78B1" foldColor="rgba(0,0,0,0.2)" />
							<div class="hold-file-info">
								<span class="hold-file-name">Mitchell_Depo_Summary.docx</span>
								<span class="hold-file-meta">Executive Summary + Page-Line Table</span>
							</div>
						</div>
						<div class="hold-stats">
							<div class="hold-stat">
								<span class="hold-stat-value">127</span>
								<span class="hold-stat-label">Pages Analyzed</span>
							</div>
							<div class="hold-stat">
								<span class="hold-stat-value">4</span>
								<span class="hold-stat-label">Key Topics</span>
							</div>
							<div class="hold-stat">
								<span class="hold-stat-value">~3 min</span>
								<span class="hold-stat-label">Processing Time</span>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes depoFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes depoFadeInUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes depoFadeInScale {
		0% {
			opacity: 0;
			transform: scale(0.85);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* =============================
	   Phase 0: Transcript Upload
	   ============================= */
	.transcript-scene {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.pdf-document {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		opacity: 0;
		animation: depoSlideInLeft 0.8s ease-out 0.3s forwards;
	}

	@keyframes depoSlideInLeft {
		from {
			opacity: 0;
			transform: translateX(-40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.pdf-icon {
		filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
	}

	.pdf-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.pdf-name {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
		text-align: center;
		max-width: 160px;
	}

	.pdf-meta {
		font-size: 10px;
		color: #8181ac;
	}

	.upload-target {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		border: 2px dashed #216fed;
		border-radius: 16px;
		position: relative;
		opacity: 0;
		animation: depoFadeIn 0.6s ease-out 1s forwards, depoPulse 2s ease-in-out 1.6s infinite;
	}

	.upload-target-ring {
		position: absolute;
		inset: -8px;
		border: 2px solid rgba(33, 111, 237, 0.25);
		border-radius: 20px;
		animation: depoPulse 2s ease-in-out 1.8s infinite;
	}

	@keyframes depoPulse {
		0%,
		100% {
			border-color: rgba(33, 111, 237, 0.25);
			transform: scale(1);
		}
		50% {
			border-color: rgba(33, 111, 237, 0.6);
			transform: scale(1.06);
		}
	}

	/* =============================
	   Phase 1: Processing
	   ============================= */
	.processing-scene {
		display: flex;
		justify-content: center;
	}

	.processing-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 24px;
		min-width: 280px;
		max-width: 320px;
		animation: depoFadeInScale 0.6s ease-out forwards;
	}

	.processing-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 14px;
	}

	.processing-status {
		text-align: center;
		margin-bottom: 10px;
	}

	.processing-text {
		font-size: 13px;
		font-weight: 600;
		color: #216fed;
	}

	.processing-bar {
		height: 5px;
		background: #e5e7eb;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 16px;
	}

	.processing-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, #216fed, #7c3aed);
		border-radius: 3px;
		width: 0%;
		animation: depoProgressFill 3.5s ease-in-out 0.3s forwards;
	}

	@keyframes depoProgressFill {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	.processing-transcript {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 12px;
		background: #f4f5fd;
		border-radius: 8px;
		overflow: hidden;
	}

	.transcript-line {
		height: 4px;
		background: #d1d5db;
		border-radius: 2px;
		opacity: 0.5;
	}

	.processing-scan-line {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #216fed, transparent);
		box-shadow: 0 0 10px rgba(33, 111, 237, 0.4);
		animation: depoScanLine 2s ease-in-out infinite;
	}

	@keyframes depoScanLine {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}

	/* =============================
	   Phase 2: Executive Summary
	   ============================= */
	.exec-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.exec-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 24px;
		max-width: 380px;
		width: 100%;
		animation: depoFadeInScale 0.6s ease-out forwards;
	}

	.exec-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 4px;
	}

	.exec-title {
		font-size: 15px;
		font-weight: 700;
		color: #216fed;
	}

	.exec-template-chip {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 10px;
		font-weight: 600;
		color: #836ae4;
		background: #836ae40f;
		border: 1px solid #836ae425;
		border-radius: 20px;
		padding: 3px 10px 3px 7px;
		opacity: 0;
		animation: depoFadeInUp 0.4s ease-out 0.4s forwards;
	}

	.exec-template-icon {
		color: #836ae4;
		flex-shrink: 0;
	}

	.exec-sections {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.exec-section {
		padding: 10px 12px;
		border-radius: 8px;
		opacity: 0;
		animation: depoExecSectionAppear 0.6s ease-out forwards;
	}

	@keyframes depoExecSectionAppear {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		60% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.exec-section-title {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.exec-section-title::before {
		content: '';
		display: inline-block;
		width: 3px;
		height: 12px;
		border-radius: 2px;
		background: #216fed;
		flex-shrink: 0;
	}

	.exec-section-text {
		font-size: 11px;
		line-height: 1.6;
		color: #8181ac;
		padding-left: 9px;
	}

	/* =============================
	   Phase 3: Page-Line Table
	   ============================= */
	.table-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.pl-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 440px;
		width: 100%;
		overflow: hidden;
		animation: depoFadeInScale 0.6s ease-out forwards;
	}

	.pl-title {
		text-align: center;
		font-size: 15px;
		font-weight: 700;
		color: #216fed;
		padding: 14px 16px 10px;
	}

	.pl-table {
		box-shadow: 0 0 0 1px #d1d5db;
		border-radius: 0 0 12px 12px;
		border-top: 1px solid #d1d5db;
		overflow: hidden;
	}

	.pl-header-row {
		display: flex;
		background: #f4f5fd;
		border-bottom: 1px solid #d1d5db;
		padding: 6px 12px;
		gap: 8px;
	}

	.pl-header-cell {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
	}

	.pl-col-cite {
		width: 60px;
		flex-shrink: 0;
	}

	.pl-col-summary {
		flex: 1;
		min-width: 0;
	}

	.pl-col-topics {
		width: 100px;
		flex-shrink: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 3px;
	}

	.pl-row {
		display: flex;
		padding: 8px 12px;
		gap: 8px;
		border-bottom: 1px solid #e5e7eb;
		align-items: flex-start;
		opacity: 0;
		animation: depoRowAppear 0.5s ease-out forwards;
	}

	.pl-row-even {
		background: #f4f5fd;
	}

	@keyframes depoRowAppear {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.pl-cell {
		font-size: 10px;
		line-height: 1.5;
		color: #8181ac;
	}

	.pl-citation {
		font-weight: 600;
		color: #216fed;
		cursor: default;
	}

	.pl-topic-badge {
		display: inline-block;
		font-size: 8px;
		font-weight: 600;
		padding: 1px 5px;
		border-radius: 6px;
		background: #e8e8f4;
		color: #282876;
		white-space: nowrap;
	}

	/* =============================
	   Phase 4: Citation Link
	   ============================= */
	.cite-scene {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.cite-summary-side {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 14px;
		max-width: 180px;
		opacity: 0;
		animation: depoFadeInUp 0.6s ease-out 0.3s forwards;
	}

	.cite-summary-label {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
		margin-bottom: 8px;
	}

	.cite-row-highlight {
		background: #e8e8f4;
		border-left: 3px solid #216fed;
		padding: 8px 10px;
		border-radius: 0 6px 6px 0;
	}

	.cite-ref {
		display: block;
		font-size: 11px;
		font-weight: 700;
		color: #216fed;
		margin-bottom: 4px;
	}

	.cite-text {
		font-size: 10px;
		line-height: 1.5;
		color: #8181ac;
	}

	.cite-connector {
		flex-shrink: 0;
		opacity: 0;
		animation: depoFadeIn 0.5s ease-out 1s forwards;
	}

	.cite-connector-path {
		stroke-dasharray: 4 3;
		stroke-dashoffset: 60;
		animation: depoDrawConnector 0.8s ease-out 1.2s forwards;
	}

	@keyframes depoDrawConnector {
		to {
			stroke-dashoffset: 0;
		}
	}

	.cite-dot-left,
	.cite-dot-right {
		opacity: 0;
		animation: depoFadeIn 0.3s ease-out 1.4s forwards;
	}

	.cite-transcript-side {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 14px;
		max-width: 200px;
		opacity: 0;
		animation: depoFadeInUp 0.6s ease-out 1.6s forwards;
	}

	.cite-transcript-label {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
		margin-bottom: 8px;
	}

	.cite-transcript-page {
		display: grid;
		grid-template-columns: 20px 1fr;
		gap: 2px 6px;
		font-family: 'Courier New', monospace;
	}

	.cite-line-num {
		font-size: 9px;
		color: #9ca3af;
		text-align: right;
	}

	.cite-line-text {
		font-size: 9px;
		color: #8181ac;
		line-height: 1.6;
	}

	.cite-highlighted {
		background: #fef9c3;
		padding: 0 2px;
		border-radius: 2px;
	}

	/* =============================
	   Phase 5: Download
	   ============================= */
	.download-scene {
		display: flex;
		justify-content: center;
	}

	.download-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 24px;
		min-width: 260px;
		max-width: 300px;
		text-align: center;
		animation: depoFadeInScale 0.6s ease-out forwards;
	}

	.download-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.download-formats {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 18px;
	}

	.download-format-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 10px 14px;
		border-radius: 8px;
		border: 1.5px solid #e5e7eb;
		background: white;
		cursor: default;
		font-size: 11px;
		font-weight: 600;
		color: #8181ac;
		opacity: 0;
		animation: depoFadeInUp 0.4s ease-out forwards;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.download-format-btn:nth-child(1) {
		border-color: #2B78B1;
		box-shadow: 0 0 0 2px rgba(43, 120, 177, 0.15);
	}

	.download-fmt-icon {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 12px;
	}

	.download-success {
		position: relative;
		width: 48px;
		height: 48px;
		margin: 0 auto 12px;
	}

	.download-progress-ring {
		stroke-dasharray: 226.2;
		stroke-dashoffset: 226.2;
		transform-origin: center;
		animation: depoProgressCircle 1.2s ease-in-out 2s forwards;
	}

	@keyframes depoProgressCircle {
		to {
			stroke-dashoffset: 0;
		}
	}

	.download-checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 20px;
		color: #4caf50;
		opacity: 0;
		animation: depoCheckPop 0.3s ease-out 3.2s forwards;
	}

	@keyframes depoCheckPop {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.4);
		}
		100% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.download-link {
		font-size: 13px;
		font-weight: 600;
		color: #216fed;
		text-decoration: none;
		opacity: 0;
		animation: depoFadeIn 0.5s ease-out 3.5s forwards;
	}

	/* =============================
	   Phase 6: Hold & Reset
	   ============================= */
	.hold-scene {
		display: flex;
		justify-content: center;
	}

	.hold-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 24px;
		min-width: 280px;
		max-width: 320px;
		text-align: center;
		animation: depoFadeInScale 0.6s ease-out forwards;
	}

	.hold-header {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 12px;
	}

	.hold-title {
		font-size: 15px;
		font-weight: 700;
		color: #059669;
		margin-bottom: 14px;
	}

	.hold-file {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		background: #f4f5fd;
		border-radius: 8px;
		margin-bottom: 16px;
	}

	.hold-file-info {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.hold-file-name {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	.hold-file-meta {
		font-size: 9px;
		color: #8181ac;
	}

	.hold-stats {
		display: flex;
		justify-content: space-around;
		gap: 8px;
	}

	.hold-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.hold-stat-value {
		font-size: 16px;
		font-weight: 700;
		color: #282876;
	}

	.hold-stat-label {
		font-size: 9px;
		color: #8181ac;
	}
</style>
