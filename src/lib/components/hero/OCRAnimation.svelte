<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const logo = '/images/brand/logo-main.webp';
</script>

<AnimationStage durations={[3000, 5000, 6000, 6000, 4000]} height={460}>
	{#snippet children(step)}
		<!-- Phase 0: Scanned Document Upload -->
		{#if step === 0}
			<PhaseWrapper caption="Upload Scanned PDFs & Documents">
				<div class="ocr-upload-scene">
					<div class="ocr-scan-doc">
						<div class="ocr-scan-page">
							<div class="ocr-scan-line ocr-blurry" style="width: 80%"></div>
							<div class="ocr-scan-line ocr-blurry" style="width: 65%"></div>
							<div class="ocr-scan-line ocr-blurry" style="width: 90%"></div>
							<div class="ocr-scan-block">
								<div class="ocr-scan-line ocr-blurry short"></div>
								<div class="ocr-scan-line ocr-blurry short"></div>
							</div>
							<div class="ocr-scan-line ocr-blurry" style="width: 70%"></div>
							<div class="ocr-handwriting">Dr. J. Smith</div>
							<div class="ocr-scan-line ocr-blurry" style="width: 55%"></div>
						</div>
						<div class="ocr-doc-label">Scanned Medical Record</div>
					</div>
					<div class="ocr-arrow">
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2B78B1" stroke-width="2" stroke-linecap="round">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
					<div class="ocr-logo-badge">
						<img src={logo} alt="Dodonai" width="50" />
						<span class="ocr-logo-text">AI OCR</span>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: AI Scanning -->
		{#if step === 1}
			<PhaseWrapper caption="AI-Powered Text Recognition">
				<div class="ocr-scanning-scene">
					<div class="ocr-scanning-card">
						<div class="ocr-scanning-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="ocr-scanning-status">
							<span class="ocr-scanning-text">Analyzing document...</span>
						</div>
						<div class="ocr-scanning-progress">
							<div class="ocr-scanning-fill"></div>
						</div>
						<div class="ocr-scanning-preview">
							{#each Array(5) as _, i}
								<div class="ocr-preview-line" style="width: {55 + (i * 19) % 40}%; animation-delay: {i * 120}ms"></div>
							{/each}
							<div class="ocr-scan-beam"></div>
						</div>
						<div class="ocr-scanning-badges">
							{#each ['Text', 'Tables', 'Handwriting'] as label, i}
								<span class="ocr-detect-badge" style="animation-delay: {1500 + i * 600}ms">{label}</span>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Handwriting + Text Extraction -->
		{#if step === 2}
			<PhaseWrapper caption="Handwriting & Text Extraction">
				<div class="ocr-extract-scene">
					<div class="ocr-extract-split">
						<div class="ocr-extract-before">
							<div class="ocr-before-label">Original</div>
							<div class="ocr-before-content">
								<div class="ocr-scan-line ocr-blurry" style="width: 85%"></div>
								<div class="ocr-scan-line ocr-blurry" style="width: 60%"></div>
								<div class="ocr-handwriting-sample">Pt presents w/ acute lower back pain</div>
								<div class="ocr-scan-line ocr-blurry" style="width: 75%"></div>
								<div class="ocr-handwriting-sample">Rx: Ibuprofen 800mg TID</div>
							</div>
						</div>
						<div class="ocr-extract-arrow">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B78B1" stroke-width="2">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</div>
						<div class="ocr-extract-after">
							<div class="ocr-after-label">Extracted</div>
							<div class="ocr-after-content">
								{#each [
									'Patient Information Form',
									'Date: March 12, 2024',
									'Pt presents w/ acute lower back pain',
									'radiating to left leg. Onset 3 days ago.',
									'Rx: Ibuprofen 800mg TID'
								] as line, i}
									<div class="ocr-extracted-line" style="animation-delay: {800 + i * 500}ms">{line}</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Table Detection -->
		{#if step === 3}
			<PhaseWrapper caption="Automatic Table Detection & Formatting">
				<div class="ocr-table-scene">
					<div class="ocr-table-card">
						<div class="ocr-table-title">Detected Table — Lab Results</div>
						<div class="ocr-table-grid">
							<div class="ocr-table-header-row">
								<div class="ocr-th">Test</div>
								<div class="ocr-th">Result</div>
								<div class="ocr-th">Range</div>
								<div class="ocr-th">Flag</div>
							</div>
							{#each [
								{ test: 'WBC', result: '11.2', range: '4.5-11.0', flag: 'H', flagColor: '#dc2626' },
								{ test: 'RBC', result: '4.8', range: '4.2-5.9', flag: '', flagColor: '' },
								{ test: 'Hemoglobin', result: '14.1', range: '12.0-17.5', flag: '', flagColor: '' },
								{ test: 'Platelets', result: '142', range: '150-400', flag: 'L', flagColor: '#d97706' },
								{ test: 'Glucose', result: '118', range: '70-100', flag: 'H', flagColor: '#dc2626' }
							] as row, i}
								<div class="ocr-table-row" style="animation-delay: {600 + i * 400}ms">
									<div class="ocr-td ocr-td-name">{row.test}</div>
									<div class="ocr-td">{row.result}</div>
									<div class="ocr-td ocr-td-range">{row.range}</div>
									<div class="ocr-td">
										{#if row.flag}
											<span class="ocr-flag" style="color: {row.flagColor}; background: {row.flagColor}12">{row.flag}</span>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Multi-Format Export -->
		{#if step === 4}
			<PhaseWrapper caption="Export in Multiple Formats">
				<div class="ocr-export-scene">
					<div class="ocr-export-card">
						<div class="ocr-export-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="ocr-export-ring-wrap">
							<svg viewBox="0 0 100 100" width="52" height="52">
								<circle cx="50" cy="50" r="36" fill="none" stroke="#e5e7eb" stroke-width="5" />
								<circle cx="50" cy="50" r="36" fill="none" stroke="#4CAF50" stroke-width="5" class="ocr-progress-ring" />
							</svg>
							<span class="ocr-checkmark">&#10003;</span>
						</div>
						<div class="ocr-export-formats">
							{#each [
								{ label: 'Word', color: '#2B78B1', letter: 'W' },
								{ label: 'TXT', color: '#8181ac', letter: 'T' },
								{ label: 'PDF', color: '#E2574C', letter: 'P' }
							] as fmt, i}
								<div class="ocr-format-badge" style="animation-delay: {400 + i * 300}ms; background: {fmt.color}12; border-color: {fmt.color}40">
									<div class="ocr-format-icon" style="background: {fmt.color}">{fmt.letter}</div>
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
	@keyframes ocrFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes ocrFadeInUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes ocrFadeInScale {
		0% { opacity: 0; transform: scale(0.85); }
		100% { opacity: 1; transform: scale(1); }
	}

	/* =============================
	   Phase 0: Upload
	   ============================= */
	.ocr-upload-scene {
		display: flex;
		align-items: center;
		gap: 20px;
		justify-content: center;
	}

	.ocr-scan-doc {
		background: white;
		border-radius: 10px;
		box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
		padding: 16px;
		max-width: 160px;
		opacity: 0;
		animation: ocrFadeInUp 0.6s ease-out 0.3s forwards;
	}

	.ocr-scan-page {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 8px;
	}

	.ocr-scan-line {
		height: 4px;
		background: #d1d5db;
		border-radius: 2px;
	}

	.ocr-scan-line.short {
		width: 45%;
	}

	.ocr-blurry {
		filter: blur(0.5px);
		opacity: 0.7;
	}

	.ocr-scan-block {
		display: flex;
		gap: 8px;
	}

	.ocr-handwriting {
		font-family: 'Segoe Script', 'Comic Sans MS', cursive;
		font-size: 10px;
		color: #1a3a5c;
		opacity: 0.8;
		transform: rotate(-1deg);
	}

	.ocr-doc-label {
		font-size: 9px;
		font-weight: 600;
		color: #8181ac;
		text-align: center;
	}

	.ocr-arrow {
		opacity: 0;
		animation: ocrFadeIn 0.5s ease-out 1s forwards;
	}

	.ocr-logo-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		background: white;
		border-radius: 12px;
		padding: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		opacity: 0;
		animation: ocrFadeInScale 0.5s ease-out 1.3s forwards;
	}

	.ocr-logo-text {
		font-size: 11px;
		font-weight: 700;
		color: #2B78B1;
	}

	/* =============================
	   Phase 1: AI Scanning
	   ============================= */
	.ocr-scanning-scene {
		display: flex;
		justify-content: center;
	}

	.ocr-scanning-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 18px 22px;
		min-width: 280px;
		max-width: 320px;
		animation: ocrFadeInScale 0.6s ease-out forwards;
	}

	.ocr-scanning-header {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 12px;
	}

	.ocr-scanning-status {
		text-align: center;
		margin-bottom: 8px;
	}

	.ocr-scanning-text {
		font-size: 12px;
		font-weight: 600;
		color: #2B78B1;
	}

	.ocr-scanning-progress {
		height: 5px;
		background: #e5e7eb;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 14px;
	}

	.ocr-scanning-fill {
		height: 100%;
		background: linear-gradient(90deg, #2B78B1, #836ae4);
		border-radius: 3px;
		width: 0%;
		animation: ocrProgressFill 4s ease-in-out 0.3s forwards;
	}

	@keyframes ocrProgressFill {
		0% { width: 0%; }
		100% { width: 100%; }
	}

	.ocr-scanning-preview {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 10px;
		background: #f4f5fd;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 12px;
	}

	.ocr-preview-line {
		height: 4px;
		background: #d1d5db;
		border-radius: 2px;
		opacity: 0.5;
	}

	.ocr-scan-beam {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #2B78B1, transparent);
		box-shadow: 0 0 10px rgba(43, 120, 177, 0.4);
		animation: ocrScanBeam 1.8s ease-in-out infinite;
	}

	@keyframes ocrScanBeam {
		0% { top: 0; }
		100% { top: 100%; }
	}

	.ocr-scanning-badges {
		display: flex;
		justify-content: center;
		gap: 6px;
	}

	.ocr-detect-badge {
		font-size: 9px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 10px;
		background: #e8e8f4;
		color: #282876;
		opacity: 0;
		animation: ocrFadeIn 0.3s ease-out forwards;
	}

	/* =============================
	   Phase 2: Handwriting + Text
	   ============================= */
	.ocr-extract-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ocr-extract-split {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.ocr-extract-before,
	.ocr-extract-after {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 14px;
		max-width: 170px;
	}

	.ocr-extract-before {
		opacity: 0;
		animation: ocrFadeInUp 0.5s ease-out 0.3s forwards;
	}

	.ocr-extract-after {
		opacity: 0;
		animation: ocrFadeInUp 0.5s ease-out 1s forwards;
	}

	.ocr-before-label,
	.ocr-after-label {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 8px;
	}

	.ocr-before-label {
		color: #9ca3af;
	}

	.ocr-after-label {
		color: #059669;
	}

	.ocr-before-content {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.ocr-handwriting-sample {
		font-family: 'Segoe Script', 'Comic Sans MS', cursive;
		font-size: 9px;
		color: #1a3a5c;
		opacity: 0.7;
		transform: rotate(-0.5deg);
		line-height: 1.4;
	}

	.ocr-extract-arrow {
		flex-shrink: 0;
		opacity: 0;
		animation: ocrFadeIn 0.4s ease-out 0.8s forwards;
	}

	.ocr-after-content {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.ocr-extracted-line {
		font-size: 10px;
		color: #282876;
		line-height: 1.5;
		opacity: 0;
		animation: ocrFadeInUp 0.4s ease-out forwards;
	}

	/* =============================
	   Phase 3: Table Detection
	   ============================= */
	.ocr-table-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ocr-table-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		overflow: hidden;
		animation: ocrFadeInScale 0.6s ease-out forwards;
	}

	.ocr-table-title {
		text-align: center;
		font-size: 14px;
		font-weight: 700;
		color: #2B78B1;
		padding: 14px 16px 10px;
	}

	.ocr-table-grid {
		border-top: 1px solid #d1d5db;
	}

	.ocr-table-header-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1.2fr 0.6fr;
		gap: 4px;
		padding: 6px 14px;
		background: #f4f5fd;
		border-bottom: 1px solid #d1d5db;
	}

	.ocr-th {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
	}

	.ocr-table-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1.2fr 0.6fr;
		gap: 4px;
		padding: 7px 14px;
		border-bottom: 1px solid #e5e7eb;
		opacity: 0;
		animation: ocrFadeInUp 0.4s ease-out forwards;
	}

	.ocr-table-row:nth-child(even) {
		background: #f4f5fd;
	}

	.ocr-td {
		font-size: 10px;
		color: #8181ac;
	}

	.ocr-td-name {
		font-weight: 600;
		color: #282876;
	}

	.ocr-td-range {
		font-size: 9px;
		color: #8181ac;
	}

	.ocr-flag {
		font-size: 9px;
		font-weight: 700;
		padding: 1px 5px;
		border-radius: 4px;
	}

	/* =============================
	   Phase 4: Export
	   ============================= */
	.ocr-export-scene {
		display: flex;
		justify-content: center;
	}

	.ocr-export-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 28px;
		min-width: 260px;
		max-width: 300px;
		text-align: center;
		animation: ocrFadeInScale 0.6s ease-out forwards;
	}

	.ocr-export-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.ocr-export-ring-wrap {
		position: relative;
		width: 52px;
		height: 52px;
		margin: 0 auto 14px;
	}

	.ocr-progress-ring {
		stroke-dasharray: 226.2;
		stroke-dashoffset: 226.2;
		transform-origin: center;
		animation: ocrProgressCircle 1.5s ease-in-out 0.5s forwards;
	}

	@keyframes ocrProgressCircle {
		to { stroke-dashoffset: 0; }
	}

	.ocr-checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 22px;
		color: #4caf50;
		opacity: 0;
		animation: ocrCheckPop 0.3s ease-out 2s forwards;
	}

	@keyframes ocrCheckPop {
		0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
		100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
	}

	.ocr-export-formats {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.ocr-format-badge {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 10px;
		border-radius: 8px;
		border: 1.5px solid;
		font-size: 10px;
		font-weight: 600;
		opacity: 0;
		animation: ocrFadeInUp 0.4s ease-out forwards;
	}

	.ocr-format-icon {
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
