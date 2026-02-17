<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const logo = '/images/brand/logo-main.png';

	const templateFields = [
		{ label: 'Plaintiff Name', type: 'Text' },
		{ label: 'Date of Incident', type: 'Date' },
		{ label: 'Injuries Sustained', type: 'List' },
		{ label: 'Treating Physicians', type: 'List' },
		{ label: 'Total Medical Bills', type: 'Currency' }
	];

	const extractedData = [
		{ field: 'Plaintiff Name', value: 'Jane M. Doe' },
		{ field: 'Date of Incident', value: '03/12/2024' },
		{ field: 'Injuries Sustained', value: 'Herniated Disc L4-L5, Cervical Strain' },
		{ field: 'Treating Physicians', value: 'Dr. Chen, Dr. Patel, Dr. Rodriguez' },
		{ field: 'Total Medical Bills', value: '$47,832.00' }
	];
</script>

<AnimationStage durations={[3000, 6000, 5000, 6000, 4000]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Source Documents -->
		{#if step === 0}
			<PhaseWrapper caption="Select Your Source Documents">
				<div class="xd-source-scene">
					<div class="xd-doc-grid">
						{#each [
							{ name: 'Medical Records', icon: '🏥', color: '#dc2626' },
							{ name: 'Police Report', icon: '📋', color: '#2563eb' },
							{ name: 'Insurance Claim', icon: '📄', color: '#059669' },
							{ name: 'Billing Records', icon: '💰', color: '#7c3aed' }
						] as doc, i}
							<div class="xd-source-doc" style="animation-delay: {300 + i * 200}ms; --doc-color: {doc.color}">
								<span class="xd-doc-icon">{doc.icon}</span>
								<span class="xd-doc-name">{doc.name}</span>
								<div class="xd-doc-check">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
										<path d="M5 13l4 4L19 7" />
									</svg>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Template Creation -->
		{#if step === 1}
			<PhaseWrapper caption="Define Your Report Template">
				<div class="xd-template-scene">
					<div class="xd-template-card">
						<div class="xd-template-header">
							<span class="xd-template-title">Demand Letter Template</span>
							<span class="xd-template-badge">Reusable</span>
						</div>
						<div class="xd-template-fields">
							{#each templateFields as field, i}
								<div class="xd-template-field" style="animation-delay: {600 + i * 500}ms">
									<span class="xd-field-name">{field.label}</span>
									<span class="xd-field-type" style="background: {['#dbeafe', '#fef3c7', '#d1fae5', '#d1fae5', '#ede9fe'][i]}; color: {['#216fed', '#92400e', '#065f46', '#065f46', '#5b21b6'][i]}">{field.type}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: AI Extraction -->
		{#if step === 2}
			<PhaseWrapper caption="XD Agents Extract Your Data">
				<div class="xd-processing-scene">
					<div class="xd-processing-card">
						<div class="xd-processing-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="xd-processing-status">
							<span class="xd-processing-text">Extracting data from documents...</span>
						</div>
						<div class="xd-processing-bar">
							<div class="xd-processing-fill"></div>
						</div>
						<div class="xd-processing-docs">
							{#each ['Medical Records', 'Police Report', 'Insurance Claim', 'Billing Records'] as doc, i}
								<div class="xd-processing-doc" style="animation-delay: {800 + i * 800}ms">
									<span class="xd-pdoc-name">{doc}</span>
									<span class="xd-pdoc-status">&#10003;</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Extracted Data -->
		{#if step === 3}
			<PhaseWrapper caption="Review Extracted Data">
				<div class="xd-data-scene">
					<div class="xd-data-card">
						<div class="xd-data-title">Extracted Fields</div>
						<div class="xd-data-fields">
							{#each extractedData as item, i}
								<div class="xd-data-row" style="animation-delay: {500 + i * 500}ms">
									<span class="xd-data-label">{item.field}</span>
									<span class="xd-data-value">{item.value}</span>
								</div>
							{/each}
						</div>
						<div class="xd-data-edit-hint">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8181ac" stroke-width="2">
								<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
							<span>Click any field to edit</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Generated Report -->
		{#if step === 4}
			<PhaseWrapper caption="Download Your Custom Report">
				<div class="xd-report-scene">
					<div class="xd-report-card">
						<div class="xd-report-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="xd-report-title">Demand Letter — Doe v. Smith</div>
						<div class="xd-report-preview">
							<div class="xd-report-line xd-report-bold">RE: Jane M. Doe — DOI: 03/12/2024</div>
							<div class="xd-report-line">Dear Claims Adjuster,</div>
							<div class="xd-report-line xd-report-dim">This office represents Jane M. Doe in connection with injuries sustained...</div>
							<div class="xd-report-line xd-report-dim">Total medical expenses to date: $47,832.00...</div>
						</div>
						<div class="xd-report-formats">
							{#each [{ label: 'Word', color: '#2B78B1', letter: 'W' }, { label: 'PDF', color: '#E2574C', letter: 'P' }] as fmt, i}
								<div class="xd-format-btn" style="animation-delay: {1000 + i * 300}ms; border-color: {fmt.color}40">
									<div class="xd-format-icon" style="background: {fmt.color}">{fmt.letter}</div>
									<span style="color: {fmt.color}">{fmt.label}</span>
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
	@keyframes xdFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes xdFadeInUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes xdFadeInScale {
		0% { opacity: 0; transform: scale(0.85); }
		100% { opacity: 1; transform: scale(1); }
	}

	/* =============================
	   Phase 0: Source Documents
	   ============================= */
	.xd-source-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.xd-doc-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		max-width: 320px;
	}

	.xd-source-doc {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 14px 12px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		position: relative;
		opacity: 0;
		animation: xdFadeInUp 0.5s ease-out forwards;
	}

	.xd-doc-icon {
		font-size: 24px;
	}

	.xd-doc-name {
		font-size: 10px;
		font-weight: 600;
		color: #282876;
		text-align: center;
	}

	.xd-doc-check {
		position: absolute;
		top: -4px;
		right: -4px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--doc-color);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: xdCheckAppear 0.3s ease-out forwards;
		animation-delay: inherit;
	}

	@keyframes xdCheckAppear {
		0% { opacity: 0; transform: scale(0); }
		100% { opacity: 1; transform: scale(1); }
	}

	/* =============================
	   Phase 1: Template
	   ============================= */
	.xd-template-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.xd-template-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 360px;
		width: 100%;
		overflow: hidden;
		animation: xdFadeInScale 0.6s ease-out forwards;
	}

	.xd-template-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 18px;
		border-bottom: 1px solid #e5e7eb;
	}

	.xd-template-title {
		font-size: 14px;
		font-weight: 700;
		color: #2B78B1;
	}

	.xd-template-badge {
		font-size: 9px;
		font-weight: 600;
		color: #059669;
		background: #d1fae5;
		padding: 2px 8px;
		border-radius: 8px;
	}

	.xd-template-fields {
		padding: 12px 18px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.xd-template-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 12px;
		background: #f4f5fd;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
		opacity: 0;
		animation: xdFadeInUp 0.4s ease-out forwards;
	}

	.xd-field-name {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	.xd-field-type {
		font-size: 8px;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 6px;
	}

	/* =============================
	   Phase 2: AI Extraction
	   ============================= */
	.xd-processing-scene {
		display: flex;
		justify-content: center;
	}

	.xd-processing-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 18px 22px;
		min-width: 280px;
		max-width: 320px;
		animation: xdFadeInScale 0.6s ease-out forwards;
	}

	.xd-processing-header {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 12px;
	}

	.xd-processing-status {
		text-align: center;
		margin-bottom: 8px;
	}

	.xd-processing-text {
		font-size: 12px;
		font-weight: 600;
		color: #2B78B1;
	}

	.xd-processing-bar {
		height: 5px;
		background: #e5e7eb;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 14px;
	}

	.xd-processing-fill {
		height: 100%;
		background: linear-gradient(90deg, #2B78B1, #7c3aed);
		border-radius: 3px;
		width: 0%;
		animation: xdProgressFill 4s ease-in-out 0.3s forwards;
	}

	@keyframes xdProgressFill {
		0% { width: 0%; }
		100% { width: 100%; }
	}

	.xd-processing-docs {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.xd-processing-doc {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 10px;
		background: #f4f5fd;
		border-radius: 6px;
		opacity: 0;
		animation: xdFadeInUp 0.4s ease-out forwards;
	}

	.xd-pdoc-name {
		font-size: 10px;
		color: #8181ac;
	}

	.xd-pdoc-status {
		font-size: 12px;
		color: #059669;
		font-weight: 700;
	}

	/* =============================
	   Phase 3: Extracted Data
	   ============================= */
	.xd-data-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.xd-data-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 380px;
		width: 100%;
		padding: 14px 22px;
		animation: xdFadeInScale 0.6s ease-out forwards;
	}

	.xd-data-title {
		font-size: 14px;
		font-weight: 700;
		color: #2B78B1;
		text-align: center;
		margin-bottom: 10px;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
	}

	.xd-data-fields {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 10px;
	}

	.xd-data-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 12px;
		border-radius: 8px;
		background: #f4f5fd;
		opacity: 0;
		animation: xdFadeInUp 0.4s ease-out forwards;
	}

	.xd-data-label {
		font-size: 10px;
		font-weight: 600;
		color: #8181ac;
	}

	.xd-data-value {
		font-size: 10px;
		font-weight: 600;
		color: #282876;
		text-align: right;
		max-width: 55%;
	}

	.xd-data-edit-hint {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		font-size: 9px;
		color: #8181ac;
		font-style: italic;
		opacity: 0;
		animation: xdFadeIn 0.5s ease-out 3.5s forwards;
	}

	/* =============================
	   Phase 4: Generated Report
	   ============================= */
	.xd-report-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.xd-report-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 360px;
		width: 100%;
		padding: 18px 22px;
		animation: xdFadeInScale 0.6s ease-out forwards;
	}

	.xd-report-header {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 12px;
	}

	.xd-report-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
		text-align: center;
		margin-bottom: 12px;
	}

	.xd-report-preview {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 14px;
		background: #f4f5fd;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
		margin-bottom: 14px;
		opacity: 0;
		animation: xdFadeIn 0.6s ease-out 0.5s forwards;
	}

	.xd-report-line {
		font-size: 10px;
		line-height: 1.6;
		color: #8181ac;
	}

	.xd-report-bold {
		font-weight: 700;
		color: #282876;
	}

	.xd-report-dim {
		color: #8181ac;
	}

	.xd-report-formats {
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.xd-format-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 12px;
		border-radius: 8px;
		border: 1.5px solid;
		font-size: 10px;
		font-weight: 600;
		opacity: 0;
		animation: xdFadeInUp 0.4s ease-out forwards;
	}

	.xd-format-icon {
		width: 20px;
		height: 20px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 10px;
	}
</style>
