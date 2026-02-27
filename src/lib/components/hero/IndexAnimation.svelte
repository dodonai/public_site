<script>
	import PdfDocIcon from '$lib/components/animation/PdfDocIcon.svelte';
	import PhaseCaption from '$lib/components/animation/PhaseCaption.svelte';
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const chaosDocuments = [
		{ name: 'Medical Record', rotation: -12, x: -180, y: -100 },
		{ name: 'Bill', rotation: 8, x: 120, y: -80 },
		{ name: 'Deposition', rotation: -5, x: -80, y: 60 },
		{ name: 'Lab Report', rotation: 15, x: 160, y: 90 },
		{ name: 'Imaging', rotation: -18, x: -200, y: 20 },
		{ name: 'Rx Record', rotation: 10, x: 50, y: -120 },
		{ name: 'Operative Note', rotation: -8, x: 200, y: -30 },
		{ name: 'Discharge', rotation: 20, x: -40, y: 130 },
		{ name: 'Progress Note', rotation: -15, x: 100, y: 140 },
		{ name: 'Pathology', rotation: 6, x: -150, y: -60 }
	];

	const documentCategories = [
		{ name: 'Medical', color: '#4CAF50', icon: '🏥' },
		{ name: 'Legal', color: '#2B78B1', icon: '⚖️' },
		{ name: 'Financial', color: '#9333ea', icon: '💰' },
		{ name: 'Insurance', color: '#e67e22', icon: '🛡️' }
	];

	const templateOptions = [
		{
			name: 'Organized Package',
			sub: 'Sorted, filtered & indexed',
			color: '#2B78B1',
			iconPath: 'M3 6h18M3 12h18M3 18h18'
		},
		{
			name: 'Summary',
			sub: 'Analysis & key insights',
			color: '#836ae4',
			iconPath:
				'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8'
		},
		{
			name: 'Data Extraction',
			sub: 'Structured data output',
			color: '#059669',
			iconPath: 'M3 3h18v18H3zM3 9h18M9 3v18'
		},
		{
			name: 'Document Index',
			sub: 'Categorized reference table',
			color: '#9333ea',
			iconPath: 'M3 6h18M3 12h12M3 18h18'
		},
		{
			name: 'Chronology',
			sub: 'Customized per document type',
			color: '#e67e22',
			iconPath: 'M4 6h16M4 10h16M4 14h16M4 18h16'
		},
		{
			name: 'Timeline',
			sub: 'Graphical event timeline',
			color: '#d97706',
			iconPath: 'M3 18h18M6 14l6-6 6 3'
		}
	];

	const logo = '/images/brand/logo-main.webp';
</script>

<AnimationStage durations={[3000, 9000, 3000, 10000, 5000, 6000, 6000, 6000, 8000, 6000]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Document Chaos -->
		{#if step === 0}
			<PhaseWrapper caption="Thousands of unorganized documents...">
				<div class="chaos-field">
					{#each chaosDocuments as doc, i}
						<div
							class="chaos-doc"
							style="
								--rot: {doc.rotation}deg;
								--x: {doc.x}px;
								--y: {doc.y}px;
								--i: {i};
								animation-delay: {i * 100}ms;
							"
						>
							<PdfDocIcon height={50} width={40} />
							<div class="chaos-label">{doc.name}</div>
						</div>
					{/each}
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Solution Showcase -->
		{#if step === 1}
			<PhaseWrapper caption="From Chaos to Clarity">
				<div class="solution-scene">
					<div class="solution-chaos-mini">
						{#each chaosDocuments as doc, i}
							<div
								class="mini-chaos-doc"
								style="
									--rot: {doc.rotation}deg;
									--x-start: {doc.x}px;
									--y-start: {doc.y}px;
									--x-end: {doc.x * 0.3}px;
									--y-end: {doc.y * 0.3}px;
									--i: {i};
								"
							>
								<PdfDocIcon height={24} width={18} />
							</div>
						{/each}
					</div>

					<div class="solution-arrow">
						<svg width="60" height="24" viewBox="0 0 60 24" fill="none">
							<path
								d="M0 12H50M50 12L42 4M50 12L42 20"
								stroke="#2B78B1"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="solution-arrow-path"
							/>
						</svg>
					</div>

					<div class="solution-deliverables">
						<div class="solution-package">
							<div class="solution-package-header">
								<img src={logo} alt="Dodonai" width="50px" />
							</div>

							<div class="solution-item" style="animation-delay: 3000ms">
								<div class="solution-item-icon" style="background: #2B78B1">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18" /><path d="M8 6v12" /></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Organized Package</span>
									<span class="solution-item-sub">Sorted, filtered & indexed with TOC</span>
								</div>
							</div>

							<div class="solution-item" style="animation-delay: 3600ms">
								<div class="solution-item-icon" style="background: #836ae4">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path
											d="M14 2v6h6"
										/><path d="M16 13H8" /><path d="M16 17H8" /></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Summary</span>
									<span class="solution-item-sub">Customizable analysis & insights</span>
								</div>
							</div>

							<div class="solution-item" style="animation-delay: 4200ms">
								<div class="solution-item-icon" style="background: #059669">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										><rect x="3" y="3" width="18" height="18" rx="2" /><path
											d="M3 9h18M9 3v18"
										/></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Data Extraction</span>
									<span class="solution-item-sub">Structured data from every document</span>
								</div>
							</div>

							<div class="solution-item" style="animation-delay: 4800ms">
								<div class="solution-item-icon" style="background: #9333ea">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										><path d="M3 6h18M3 12h12M3 18h18" /><circle cx="19" cy="12" r="2" /></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Document Index</span>
									<span class="solution-item-sub">Categorized reference table</span>
								</div>
							</div>

							<div class="solution-item" style="animation-delay: 5400ms">
								<div class="solution-item-icon" style="background: #e67e22">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										><path d="M4 6h16M4 10h16M4 14h16M4 18h16" /><circle
											cx="8"
											cy="6"
											r="1.5"
											fill="white"
										/><circle cx="8" cy="10" r="1.5" fill="white" /><circle
											cx="8"
											cy="14"
											r="1.5"
											fill="white"
										/><circle cx="8" cy="18" r="1.5" fill="white" /></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Chronology</span>
									<span class="solution-item-sub">Entries customized per document type</span>
								</div>
							</div>

							<div class="solution-item" style="animation-delay: 6000ms">
								<div class="solution-item-icon" style="background: #d97706">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										><path d="M3 18h18" /><circle cx="6" cy="14" r="2" /><circle
											cx="12"
											cy="8"
											r="2"
										/><circle cx="18" cy="11" r="2" /><path d="M6 14l6-6 6 3" /></svg
									>
								</div>
								<div class="solution-item-text">
									<span class="solution-item-title">Timeline</span>
									<span class="solution-item-sub">Graphical timeline of events</span>
								</div>
							</div>

							<div class="solution-linked" style="animation-delay: 6800ms">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#2B78B1"
									stroke-width="2"
									><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
										d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
									/></svg
								>
								<span>Every output linked to source documents</span>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: How It Works -->
		{#if step === 2}
			<PhaseWrapper>
				<div class="how-it-works-scene">
					<div class="how-title">How It Works</div>
					<div class="how-steps">
						<div class="how-step" style="animation-delay: 400ms">
							<div class="how-step-num">1</div>
							<span>Setup</span>
						</div>
						<div class="how-divider" style="animation-delay: 700ms">
							<svg width="12" height="24" viewBox="0 0 12 24"
								><path
									d="M6 0v18m0 0l-4-5m4 5l4-5"
									stroke="#2B78B1"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/></svg
							>
						</div>
						<div class="how-step" style="animation-delay: 800ms">
							<div class="how-step-num">2</div>
							<span>Upload</span>
						</div>
						<div class="how-divider" style="animation-delay: 1100ms">
							<svg width="12" height="24" viewBox="0 0 12 24"
								><path
									d="M6 0v18m0 0l-4-5m4 5l4-5"
									stroke="#2B78B1"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/></svg
							>
						</div>
						<div class="how-step" style="animation-delay: 1200ms">
							<div class="how-step-num">3</div>
							<span>Process</span>
						</div>
						<div class="how-divider" style="animation-delay: 1500ms">
							<svg width="12" height="24" viewBox="0 0 12 24"
								><path
									d="M6 0v18m0 0l-4-5m4 5l4-5"
									stroke="#2B78B1"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/></svg
							>
						</div>
						<div class="how-step" style="animation-delay: 1600ms">
							<div class="how-step-num">4</div>
							<span>Download</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Setup / Onboarding -->
		{#if step === 3}
			<PhaseWrapper caption="Tell Us How You Want Your Output" subcaption="We configure your custom rule engine">
				<div class="setup-scene">
					<div class="setup-items">
						<div class="setup-item" style="animation-delay: 400ms">
							<div class="setup-item-card">
								<PdfDocIcon height={36} width={28} />
								<span class="setup-item-label">Example Output</span>
							</div>
							<span class="setup-item-desc">Show us what you want back</span>
						</div>

						<div class="setup-item" style="animation-delay: 1200ms">
							<div class="setup-item-card">
								<svg
									width="28"
									height="36"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#a994fa"
									stroke-width="1.5"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" />
									<line x1="7" y1="8" x2="17" y2="8" /><line
										x1="7"
										y1="12"
										x2="17"
										y2="12"
									/><line x1="7" y1="16" x2="12" y2="16" />
								</svg>
								<span class="setup-item-label">Output Templates</span>
							</div>
							<span class="setup-item-desc">Share your preferred format</span>
						</div>

						<div class="setup-item" style="animation-delay: 2000ms">
							<div class="setup-item-card">
								<svg
									width="28"
									height="36"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#4CAF50"
									stroke-width="1.5"
								>
									<path
										d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
									/>
									<rect x="9" y="3" width="6" height="4" rx="1" />
									<path d="M9 12l2 2 4-4" />
								</svg>
								<span class="setup-item-label">Instructions</span>
							</div>
							<span class="setup-item-desc">Tell us what data matters</span>
						</div>
					</div>

					<div class="setup-flow">
						<div class="setup-arrow" style="animation-delay: 3000ms">
							<svg width="40" height="24" viewBox="0 0 40 24" fill="none">
								<path
									d="M0 12H32M32 12L24 4M32 12L24 20"
									stroke="#2B78B1"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>

					<div class="setup-result" style="animation-delay: 3500ms">
						<div class="setup-rule-result" style="animation-delay: 4200ms">
							<div class="setup-rule-card">
								<div class="setup-rule-header">Custom Templates</div>
								<div class="setup-rule-branches">
									{#each documentCategories as cat, i}
										<div class="setup-rule-branch" style="animation-delay: {4800 + i * 500}ms">
											<div class="setup-rule-connector" style="background: {cat.color}"></div>
											<span
												class="setup-rule-label"
												style="border-color: {cat.color}; color: {cat.color}"
												>{cat.icon} {cat.name}</span
											>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Upload Flow -->
		{#if step === 4}
			<PhaseWrapper>
				<div class="upload-scene">
					{#each chaosDocuments.slice(0, 8) as doc, i}
						<div
							class="converge-doc"
							style="
								--start-x: {doc.x}px;
								--start-y: {doc.y}px;
								--i: {i};
							"
						>
							<PdfDocIcon height={40} width={32} />
						</div>
					{/each}
					<div class="upload-zone">
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
								stroke="#2B78B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M17 8L12 3L7 8"
								stroke="#2B78B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 3V15"
								stroke="#2B78B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="upload-ring"></div>
					</div>
				</div>
				<PhaseCaption caption="Upload your documents" />
				<div class="upload-compliance">
					<div class="compliance-badge" style="animation-delay: 800ms">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#059669"
							stroke-width="2"
							><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path
								d="M9 12l2 2 4-4"
							/></svg
						>
						<span>HIPAA Compliant</span>
					</div>
					<div class="compliance-badge" style="animation-delay: 1200ms">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#059669"
							stroke-width="2"
							><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path
								d="M9 12l2 2 4-4"
							/></svg
						>
						<span>SOC-2 Certified</span>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 5: OCR Processing -->
		{#if step === 5}
			<PhaseWrapper caption="AI-Powered Text Extraction">
				<div class="ocr-scene">
					<div class="ocr-page">
						<div class="ocr-line" style="top: 10%; width: 80%"></div>
						<div class="ocr-line" style="top: 16%; width: 65%"></div>
						<div class="ocr-line" style="top: 22%; width: 75%"></div>
						<div class="ocr-line" style="top: 28%; width: 55%"></div>
						<div class="ocr-line" style="top: 34%; width: 70%"></div>

						<div class="ocr-inline-image">
							<svg width="48" height="36" viewBox="0 0 48 36" fill="none">
								<rect
									x="1"
									y="1"
									width="46"
									height="34"
									rx="2"
									stroke="#c4c4c4"
									stroke-width="1"
									fill="#f0f4f8"
								/>
								<circle cx="16" cy="13" r="4" fill="#93c5fd" />
								<path d="M4 28 L16 18 L24 24 L34 12 L44 22 L44 33 L4 33 Z" fill="#bfdbfe" />
								<path d="M24 24 L34 12 L44 22 L44 33 L24 33 Z" fill="#93c5fd" />
							</svg>
						</div>

						<div class="ocr-line" style="top: 62%; width: 72%"></div>
						<div class="ocr-line" style="top: 68%; width: 60%"></div>

						<div class="ocr-page-handwriting">
							<svg width="120" height="36" viewBox="0 0 120 36" fill="none">
								<path
									d="M4 12 C12 4, 20 18, 28 10 S44 6, 52 14 S64 18, 72 8 S84 4, 92 12"
									stroke="#4a5568"
									stroke-width="1"
									fill="none"
									opacity="0.5"
								/>
								<path
									d="M4 24 C16 16, 24 28, 36 20 S52 18, 60 24"
									stroke="#4a5568"
									stroke-width="1"
									fill="none"
									opacity="0.5"
								/>
								<path
									d="M72 22 C78 14, 86 26, 94 18 S106 28, 114 16"
									stroke="#4a5568"
									stroke-width="1.2"
									fill="none"
									opacity="0.6"
								/>
							</svg>
						</div>

						<div class="scan-line"></div>
					</div>
					<div class="ocr-extractions">
						<div class="ocr-extraction-item" style="animation-delay: 300ms">
							<div class="ocr-extraction-badge text-badge">Text</div>
							<div class="ocr-extract-text w-50">
								{#each 'Patient presented with acute lower back pain following MVA on 03/12/2023'.split('') as char, i}<span
										class="text-extract-char"
										style="animation-delay: {400 + i * 35}ms">{char}</span
									>{/each}
							</div>
						</div>

						<div class="ocr-extraction-item" style="animation-delay: 2200ms">
							<div class="ocr-extraction-badge image-badge">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" /><circle
										cx="8.5"
										cy="8.5"
										r="1.5"
									/><path d="M21 15l-5-5L5 21" />
								</svg>
								Image
							</div>
							<div class="ocr-extract-text ocr-image-text">
								{#each 'X-Ray of right fibula showing non-displaced fracture at the distal third'.split('') as char, i}<span
										class="text-extract-char"
										style="animation-delay: {2400 + i * 30}ms">{char}</span
									>{/each}
							</div>
						</div>

						<div class="ocr-extraction-item" style="animation-delay: 4000ms">
							<div class="ocr-extraction-badge handwriting-badge">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
								</svg>
								Handwriting
							</div>
							<div class="ocr-extract-text ocr-handwriting">
								{#each 'Pt to follow up in 2 wks. - Dr. Williams'.split('') as char, i}<span
										class="text-extract-char"
										style="animation-delay: {4200 + i * 40}ms">{char}</span
									>{/each}
								<span class="ocr-signature" style="animation-delay: 5800ms">
									<svg width="80" height="24" viewBox="0 0 80 24" fill="none">
										<path
											d="M2 18 C10 4, 18 20, 26 10 S42 2, 50 14 S62 22, 72 8"
											stroke="#1e3a5f"
											stroke-width="1.5"
											fill="none"
											class="signature-path"
										/>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 6: Document Indexing -->
		{#if step === 6}
			<PhaseWrapper caption="Intelligent Document Organization">
				<div class="index-scene">
					{#each Array(9) as _, i}
						<div class="index-card" style="--ic: {i}; animation-delay: {i * 200}ms">
							<div class="index-card-icon">
								<PdfDocIcon height={24} width={20} color={['#4CAF50', '#2B78B1', '#9333ea', '#e67e22'][i % 4]} foldColor="rgba(0,0,0,0.2)" />
							</div>
							<div class="index-card-meta">
								<div class="meta-badge type-badge" style="animation-delay: {i * 200 + 600}ms">
									{[
										'Medical',
										'Legal',
										'Financial',
										'Insurance',
										'Medical',
										'Legal',
										'Financial',
										'Insurance',
										'Medical'
									][i]}
								</div>
								<div class="meta-badge date-badge" style="animation-delay: {i * 200 + 900}ms">
									{[
										'01/15',
										'02/20',
										'03/10',
										'04/05',
										'05/18',
										'06/22',
										'07/01',
										'08/14',
										'09/30'
									][i]}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 7: Template Selection -->
		{#if step === 7}
			<PhaseWrapper caption="Choose Your Output Formats" subcaption="Each with fully customizable templates">
				<div class="template-scene">
					<div class="tpl-list">
						{#each templateOptions as tpl, i}
							<div class="tpl-row" style="animation-delay: {i * 150}ms; --row-i: {i}">
								<div class="tpl-checkbox" style="--check-delay: {1200 + i * 600}ms">
									<svg width="16" height="16" viewBox="0 0 16 16">
										<rect
											x="1"
											y="1"
											width="14"
											height="14"
											rx="3"
											fill="white"
											stroke="#d1d5db"
											stroke-width="1.5"
											class="tpl-check-box"
										/>
										<rect
											x="1"
											y="1"
											width="14"
											height="14"
											rx="3"
											fill="#2B78B1"
											class="tpl-check-fill"
										/>
										<path
											d="M4 8l3 3 5-6"
											fill="none"
											stroke="white"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="tpl-check-mark"
										/>
									</svg>
								</div>
								<div class="tpl-row-icon" style="background: {tpl.color}">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d={tpl.iconPath} /></svg
									>
								</div>
								<div class="tpl-row-text">
									<span class="tpl-row-name">{tpl.name}</span>
									<span class="tpl-row-sub">{tpl.sub}</span>
								</div>
								<div class="tpl-row-custom" style="animation-delay: {i * 150 + 800}ms">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
											d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
										/></svg
									>
									<span>Custom Template</span>
								</div>
							</div>
						{/each}
						<div class="tpl-cursor">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
								<path
									d="M5 3L19 12L12 13L8 21L5 3Z"
									fill="#333"
									stroke="#333"
									stroke-width="1"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 8: AI Summarization -->
		{#if step === 8}
			<PhaseWrapper caption="Dodonai Processes Your Documents">
				<div class="ai-scene">
					<div class="ai-template">
						<div class="ai-template-header">
							<img src={logo} alt="Dodonai" width="80px" />
						</div>
						<div class="ai-template-body">
							{#each ['Patient Name', 'Date of Service', 'Provider', 'Summary'] as field, i}
								<div class="ai-field" style="animation-delay: {1500 + i * 800}ms">
									<span class="ai-field-label">{field}:</span>
									<span class="ai-field-value">
										<span class="typing-effect" style="animation-delay: {1800 + i * 800}ms">
											{['John Smith', '05/12/2023', 'Dr. Williams', 'Patient presented with...'][
												i
											]}
										</span>
									</span>
								</div>
							{/each}
						</div>
						<div class="ai-progress-bar">
							<div class="ai-progress-fill"></div>
						</div>
					</div>

					<div class="neural-net">
						{#each Array(8) as _, i}
							<div class="neural-node" style="--ni: {i}; animation-delay: {i * 300}ms"></div>
						{/each}
						{#each Array(6) as _, i}
							<div class="neural-line" style="--nli: {i}; animation-delay: {i * 400}ms"></div>
						{/each}
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 9: Final Output -->
		{#if step === 9}
			<PhaseWrapper caption="Professional, Branded Deliverables">
				<div class="output-scene">
					<div class="final-doc">
						<div class="final-doc-header">
							<img src={logo} alt="Dodonai" width="60px" />
						</div>
						<div class="final-doc-lines">
							{#each Array(5) as _, i}
								<div
									class="final-line"
									style="width: {70 + (i * 17) % 25}%; animation-delay: {i * 100}ms"
								></div>
							{/each}
						</div>
						<div class="success-check">
							<svg viewBox="0 0 100 100" width="60" height="60">
								<circle cx="50" cy="50" r="40" fill="none" stroke="#E4E7E7" stroke-width="6" />
								<circle
									cx="50"
									cy="50"
									r="40"
									fill="none"
									stroke="#4CAF50"
									stroke-width="6"
									class="output-progress"
								/>
							</svg>
							<span class="output-checkmark">&#10003;</span>
						</div>
					</div>

					<div class="output-formats">
						{#each [{ label: 'PDF', color: '#E2574C' }, { label: 'Word', color: '#2B78B1' }, { label: 'Excel', color: '#20744A' }] as fmt, i}
							<div
								class="output-format"
								style="animation-delay: {1500 + i * 300}ms; --fmt-color: {fmt.color}"
							>
								<div class="fmt-icon" style="background: {fmt.color}">{fmt.label[0]}</div>
								<span>{fmt.label}</span>
							</div>
						{/each}
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	/* Shared animation keyframes */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeInScale {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Phase 0: Document Chaos */
	.chaos-field {
		position: relative;
		width: 100%;
		max-width: 420px;
		height: 320px;
	}

	.chaos-doc {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rot));
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		animation: floatChaos 3s ease-in-out infinite, chaosAppear 0.5s ease-out forwards;
		animation-delay: calc(var(--i) * 100ms), calc(var(--i) * 100ms);
	}

	@keyframes chaosAppear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.chaos-label {
		font-size: 9px;
		color: #8181ac;
		margin-top: 2px;
		white-space: nowrap;
	}

	@keyframes floatChaos {
		0%,
		100% {
			transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rot));
		}
		50% {
			transform: translate(calc(-50% + var(--x) + 5px), calc(-50% + var(--y) - 8px))
				rotate(calc(var(--rot) + 3deg));
		}
	}

	/* Phase 1: Solution Showcase */
	.solution-scene {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		width: 100%;
	}

	@media (max-width: 640px) {
		.solution-scene {
			transform: scale(0.78);
		}
	}

	@media (max-width: 480px) {
		.solution-scene {
			transform: scale(0.62);
		}
	}

	.solution-chaos-mini {
		position: relative;
		width: 120px;
		height: 140px;
		flex-shrink: 0;
	}

	.mini-chaos-doc {
		position: absolute;
		top: 50%;
		left: 50%;
		opacity: 0.8;
		animation: chaosConverge 1.8s ease-in-out calc(var(--i) * 80ms) both;
	}

	@keyframes chaosConverge {
		0% {
			transform: translate(calc(-50% + var(--x-start)), calc(-50% + var(--y-start)))
				rotate(var(--rot)) scale(1.6);
			opacity: 0.9;
		}
		30% {
			transform: translate(calc(-50% + var(--x-start)), calc(-50% + var(--y-start)))
				rotate(var(--rot)) scale(1.6);
			opacity: 0.9;
		}
		100% {
			transform: translate(calc(-50% + var(--x-end)), calc(-50% + var(--y-end))) rotate(0deg)
				scale(1);
			opacity: 0.5;
		}
	}

	.solution-arrow {
		flex-shrink: 0;
		animation: solutionArrowAppear 0.8s ease-out 2s both;
	}

	.solution-arrow-path {
		stroke-dasharray: 60;
		stroke-dashoffset: 60;
		animation: solutionArrowDraw 0.8s ease-out 2.2s forwards;
	}

	@keyframes solutionArrowDraw {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes solutionArrowAppear {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.solution-deliverables {
		flex-shrink: 0;
		opacity: 0;
		animation: solutionDeliverableAppear 0.6s ease-out 2.6s forwards;
	}

	@keyframes solutionDeliverableAppear {
		from {
			opacity: 0;
			transform: translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.solution-package {
		background: white;
		border-radius: 12px;
		padding: 12px 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		min-width: 220px;
	}

	.solution-package-header {
		display: flex;
		justify-content: center;
		margin-bottom: 8px;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
	}

	.solution-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 3px 0;
		opacity: 0;
		animation: solutionItemAppear 500ms ease-out forwards;
	}

	@keyframes solutionItemAppear {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.solution-item-icon {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.solution-item-text {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.solution-item-title {
		font-size: 12px;
		font-weight: 600;
		color: #282876;
		line-height: 1.5;
	}

	.solution-item-sub {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.5;
	}

	.solution-linked {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 6px;
		padding-top: 6px;
		border-top: 1px dashed #d1d5db;
		font-size: 10px;
		color: #2b78b1;
		font-weight: 500;
		opacity: 0;
		animation: solutionItemAppear 500ms ease-out forwards;
	}

	/* Phase 2: How It Works */
	.how-it-works-scene {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		height: 100%;
	}

	.how-title {
		font-size: 28px;
		font-weight: 700;
		color: #282876;
		opacity: 0;
		animation: howTitleAppear 0.8s ease-out forwards;
	}

	@keyframes howTitleAppear {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.how-steps {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.how-step {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 600;
		color: #8181ac;
		opacity: 0;
		animation: solutionItemAppear 0.5s ease-out forwards;
	}

	.how-step-num {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: #2b78b1;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
	}

	.how-divider {
		opacity: 0;
		animation: fadeIn 0.3s ease-out forwards;
	}

	/* Phase 3: Setup / Onboarding */
	.setup-scene {
		display: flex;
		align-items: stretch;
		gap: 20px;
	}

	.setup-items {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.setup-item {
		opacity: 0;
		animation: setupItemAppear 0.6s ease-out forwards;
	}

	@keyframes setupItemAppear {
		0% {
			opacity: 0;
			transform: translateX(-20px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.setup-item-card {
		display: flex;
		align-items: center;
		gap: 10px;
		background: white;
		padding: 10px 16px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		border-left: 3px solid #2b78b1;
	}

	.setup-item-label {
		font-size: 13px;
		font-weight: 600;
		color: #282876;
	}

	.setup-item-desc {
		font-size: 11px;
		color: #8181ac;
		padding-left: 54px;
		margin-top: 2px;
		display: block;
	}

	.setup-flow {
		display: flex;
		align-items: center;
	}

	.setup-arrow {
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	.setup-result {
		display: flex;
		flex-direction: column;
		justify-content: center;
		opacity: 0;
		animation: setupResultAppear 0.6s ease-out forwards;
	}

	@keyframes setupResultAppear {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.setup-rule-result {
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		height: 100%;
	}

	.setup-rule-card {
		background: white;
		border: 1.5px solid #e5e7eb;
		border-radius: 8px;
		padding: 10px 14px;
		min-width: 130px;
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
	}

	.setup-rule-header {
		font-size: 10px;
		font-weight: 700;
		color: #2b78b1;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 6px;
		padding-bottom: 4px;
		border-bottom: 1px solid #e5e7eb;
	}

	.setup-rule-branches {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		flex: 1;
	}

	.setup-rule-branch {
		display: flex;
		align-items: center;
		gap: 6px;
		opacity: 0;
		animation: fadeIn 0.4s ease-out forwards;
	}

	.setup-rule-connector {
		width: 16px;
		height: 2px;
		border-radius: 1px;
	}

	.setup-rule-label {
		font-size: 10px;
		font-weight: 600;
		border: 1px solid;
		border-radius: 4px;
		padding: 1px 6px;
	}

	/* Phase 4: Upload */
	.upload-scene {
		position: relative;
		width: 100%;
		max-width: 360px;
		height: 260px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.converge-doc {
		position: absolute;
		left: 50%;
		top: 50%;
		opacity: 0;
		animation: convergeToCenter 2s ease-in-out forwards;
		animation-delay: calc(var(--i) * 150ms);
	}

	@keyframes convergeToCenter {
		0% {
			transform: translate(calc(-50% + var(--start-x)), calc(-50% + var(--start-y)));
			opacity: 0.7;
		}
		70% {
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%);
			opacity: 0;
		}
	}

	.upload-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		border: 2px dashed #2b78b1;
		border-radius: 16px;
		animation: dropZonePulse 2s ease-in-out infinite;
		position: relative;
	}

	.upload-ring {
		position: absolute;
		inset: -8px;
		border: 2px solid rgba(43, 120, 177, 0.3);
		border-radius: 20px;
		animation: dropZonePulse 2s ease-in-out infinite 0.5s;
	}

	@keyframes dropZonePulse {
		0%,
		100% {
			border-color: rgba(43, 120, 177, 0.3);
			transform: scale(1);
		}
		50% {
			border-color: rgba(43, 120, 177, 0.8);
			transform: scale(1.05);
		}
	}

	.upload-compliance {
		display: flex;
		gap: 20px;
		margin-top: 6px;
		padding: 6px 16px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(6px);
		border-radius: 8px;
	}

	.compliance-badge {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 600;
		color: #059669;
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	/* Phase 5: OCR */
	.ocr-scene {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.ocr-page {
		position: relative;
		width: 140px;
		height: 220px;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.ocr-line {
		position: absolute;
		left: 10%;
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
	}

	.ocr-inline-image {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translateX(-50%);
	}

	.ocr-page-handwriting {
		position: absolute;
		bottom: 8px;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.7;
	}

	.scan-line {
		position: absolute;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, transparent, #2b78b1, transparent);
		box-shadow: 0 0 12px rgba(43, 120, 177, 0.5);
		animation: scanLine 3s ease-in-out infinite;
	}

	@keyframes scanLine {
		0% {
			top: 5%;
		}
		100% {
			top: 95%;
		}
	}

	.ocr-extractions {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 230px;
		overflow: hidden;
	}

	.ocr-extraction-item {
		opacity: 0;
		animation: fadeIn 0.4s ease-out forwards;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ocr-extraction-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		padding: 2px 8px;
		border-radius: 4px;
		width: fit-content;
	}

	.text-badge {
		background: #e8e8f4;
		color: #282876;
	}

	.image-badge {
		background: #fef3c7;
		color: #92400e;
	}

	.handwriting-badge {
		background: #ede9fe;
		color: #5b21b6;
	}

	.ocr-extract-text {
		line-height: 1.3;
		font-size: 11px;
		font-family: 'Georgia', serif;
		color: #1e3a5f;
	}

	.ocr-image-text {
		font-style: italic;
		color: #78350f;
	}

	.ocr-handwriting {
		font-family: 'Segoe Script', 'Comic Sans MS', cursive;
		font-size: 13px;
		color: #1e3a5f;
	}

	.text-extract-char {
		opacity: 0;
		animation: charAppear 0.15s ease-out forwards;
	}

	@keyframes charAppear {
		0% {
			opacity: 0;
			color: #2b78b1;
		}
		50% {
			color: #2b78b1;
		}
		100% {
			opacity: 1;
			color: inherit;
		}
	}

	.ocr-signature {
		display: inline-block;
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
		vertical-align: middle;
		margin-left: 4px;
	}

	.signature-path {
		stroke-dasharray: 200;
		stroke-dashoffset: 200;
		animation: drawSignature 1.2s ease-in-out forwards;
		animation-delay: 5900ms;
	}

	@keyframes drawSignature {
		to {
			stroke-dashoffset: 0;
		}
	}

	/* Phase 6: Indexing */
	.index-scene {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		max-width: 420px;
		width: 100%;
	}

	.index-card {
		background: white;
		border-radius: 6px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
		padding: 10px;
		display: flex;
		align-items: center;
		gap: 8px;
		opacity: 0;
		animation: gridFormation 0.5s ease-out forwards;
	}

	@keyframes gridFormation {
		0% {
			opacity: 0;
			transform: translateY(20px) scale(0.8);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.index-card-icon {
		flex-shrink: 0;
	}

	.index-card-meta {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.meta-badge {
		font-size: 9px;
		font-weight: 600;
		padding: 1px 6px;
		border-radius: 8px;
		opacity: 0;
		animation: fadeIn 0.4s ease-out forwards;
	}

	.type-badge {
		background: #e0f2fe;
		color: #2b78b1;
	}

	.date-badge {
		background: #f4f5fd;
		color: #8181ac;
	}

	/* Phase 7: Template Selection */
	.template-scene {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;
	}

	.tpl-list {
		background: white;
		border-radius: 12px;
		padding: 10px 14px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		min-width: 300px;
		max-width: 400px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
	}

	.tpl-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		border-radius: 8px;
		opacity: 0;
		animation: solutionItemAppear 400ms ease-out forwards;
		transition: background 0.3s, box-shadow 0.3s;
	}

	.tpl-row:nth-child(1) {
		animation: solutionItemAppear 400ms ease-out forwards,
			tplRowHighlight 0.4s ease-out 1.2s forwards;
	}
	.tpl-row:nth-child(2) {
		animation: solutionItemAppear 400ms ease-out 150ms forwards,
			tplRowHighlight 0.4s ease-out 1.8s forwards;
	}
	.tpl-row:nth-child(3) {
		animation: solutionItemAppear 400ms ease-out 300ms forwards,
			tplRowHighlight 0.4s ease-out 2.4s forwards;
	}
	.tpl-row:nth-child(4) {
		animation: solutionItemAppear 400ms ease-out 450ms forwards,
			tplRowHighlight 0.4s ease-out 3s forwards;
	}
	.tpl-row:nth-child(5) {
		animation: solutionItemAppear 400ms ease-out 600ms forwards,
			tplRowHighlight 0.4s ease-out 3.6s forwards;
	}
	.tpl-row:nth-child(6) {
		animation: solutionItemAppear 400ms ease-out 750ms forwards,
			tplRowHighlight 0.4s ease-out 4.2s forwards;
	}

	@keyframes tplRowHighlight {
		from {
			background: transparent;
		}
		to {
			background: #f0f7ff;
		}
	}

	.tpl-checkbox {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
	}

	.tpl-check-fill {
		opacity: 0;
		animation: tplCheckFill 0.2s ease-out var(--check-delay) forwards;
	}

	.tpl-check-mark {
		opacity: 0;
		animation: tplCheckMark 0.3s ease-out var(--check-delay) forwards;
	}

	.tpl-check-box {
		animation: tplCheckBoxHide 0.1s ease-out var(--check-delay) forwards;
	}

	@keyframes tplCheckFill {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes tplCheckMark {
		from {
			opacity: 0;
			stroke-dasharray: 20;
			stroke-dashoffset: 20;
		}
		to {
			opacity: 1;
			stroke-dasharray: 20;
			stroke-dashoffset: 0;
		}
	}

	@keyframes tplCheckBoxHide {
		to {
			stroke: #2b78b1;
		}
	}

	.tpl-row-icon {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.tpl-row-text {
		display: flex;
		flex-direction: column;
		gap: 1px;
		flex: 1;
	}

	.tpl-row-name {
		font-size: 12px;
		font-weight: 600;
		color: #282876;
		line-height: 1.3;
	}

	.tpl-row-sub {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.3;
	}

	.tpl-row-custom {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 9px;
		color: #8181ac;
		white-space: nowrap;
		opacity: 0;
		animation: tplCustomAppear 400ms ease-out forwards;
	}

	@keyframes tplCustomAppear {
		from {
			opacity: 0;
			transform: translateX(6px);
		}
		to {
			opacity: 0.7;
			transform: translateX(0);
		}
	}

	.tpl-cursor {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		opacity: 0;
		animation: tplCursorMove 4.8s ease-in-out 0.8s forwards;
	}

	@keyframes tplCursorMove {
		0% {
			opacity: 0;
			transform: translate(100px, 80px);
		}
		5% {
			opacity: 1;
			transform: translate(100px, 80px);
		}
		15% {
			transform: translate(26px, 28px);
		}
		28% {
			transform: translate(26px, 84px);
		}
		41% {
			transform: translate(26px, 140px);
		}
		54% {
			transform: translate(26px, 196px);
		}
		67% {
			transform: translate(26px, 252px);
		}
		80% {
			transform: translate(26px, 308px);
		}
		95% {
			transform: translate(26px, 308px);
		}
		100% {
			opacity: 0;
			transform: translate(26px, 308px);
		}
	}

	/* Phase 8: AI Summarization */
	.ai-scene {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.ai-template {
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		padding: 16px;
		min-width: 240px;
	}

	.ai-template-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.ai-template-body {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ai-field {
		display: flex;
		gap: 8px;
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	.ai-field-label {
		font-weight: 600;
		color: #8181ac;
		font-size: 12px;
		white-space: nowrap;
	}

	.ai-field-value {
		font-size: 12px;
		color: #282876;
	}

	.typing-effect {
		opacity: 0;
		animation: typeIn 0.8s ease-out forwards;
		border-right: 2px solid #2b78b1;
	}

	@keyframes typeIn {
		0% {
			opacity: 0;
			max-width: 0;
		}
		100% {
			opacity: 1;
			max-width: 200px;
			border-right-color: transparent;
		}
	}

	.ai-progress-bar {
		margin-top: 16px;
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
		overflow: hidden;
	}

	.ai-progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #2b78b1, #836ae4);
		border-radius: 2px;
		width: 0%;
		animation: progressFill 6s ease-in-out 0.5s forwards;
	}

	@keyframes progressFill {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	.neural-net {
		position: relative;
		width: 120px;
		height: 200px;
	}

	.neural-node {
		position: absolute;
		width: 10px;
		height: 10px;
		background: #836ae4;
		border-radius: 50%;
		opacity: 0;
		animation: neuralPulse 2s ease-in-out infinite;
	}

	.neural-node:nth-child(1) {
		left: 20px;
		top: 10px;
	}
	.neural-node:nth-child(2) {
		left: 100px;
		top: 10px;
	}
	.neural-node:nth-child(3) {
		left: 20px;
		top: 60px;
	}
	.neural-node:nth-child(4) {
		left: 100px;
		top: 60px;
	}
	.neural-node:nth-child(5) {
		left: 20px;
		top: 110px;
	}
	.neural-node:nth-child(6) {
		left: 100px;
		top: 110px;
	}
	.neural-node:nth-child(7) {
		left: 20px;
		top: 160px;
	}
	.neural-node:nth-child(8) {
		left: 100px;
		top: 160px;
	}

	@keyframes neuralPulse {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1.3);
		}
	}

	.neural-line {
		position: absolute;
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, #836ae4, #a994fa);
		opacity: 0;
		animation: neuralLineAnim 2s ease-in-out infinite;
	}

	.neural-line:nth-child(9) {
		left: 30px;
		top: 15px;
		transform: rotate(30deg);
	}
	.neural-line:nth-child(10) {
		left: 30px;
		top: 65px;
		transform: rotate(-15deg);
	}
	.neural-line:nth-child(11) {
		left: 30px;
		top: 115px;
		transform: rotate(20deg);
	}
	.neural-line:nth-child(12) {
		left: 30px;
		top: 40px;
		transform: rotate(-30deg);
	}
	.neural-line:nth-child(13) {
		left: 30px;
		top: 90px;
		transform: rotate(10deg);
	}
	.neural-line:nth-child(14) {
		left: 30px;
		top: 140px;
		transform: rotate(-20deg);
	}

	@keyframes neuralLineAnim {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.8;
		}
	}

	/* Phase 9: Final Output */
	.output-scene {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.final-doc {
		background: white;
		border-radius: 8px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		padding: 20px;
		min-width: 200px;
		position: relative;
		animation: fadeInScale 0.8s ease-out forwards;
	}

	.final-doc-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 12px;
	}

	.final-doc-lines {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.final-line {
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
		animation: fadeIn 0.3s ease-out forwards;
	}

	.success-check {
		display: flex;
		justify-content: center;
		margin-top: 16px;
		position: relative;
		width: 60px;
		height: 60px;
		margin-left: auto;
		margin-right: auto;
	}

	.output-progress {
		stroke-dasharray: 251.2;
		stroke-dashoffset: 251.2;
		transform-origin: center;
		animation: progressCircle 1.5s ease-in-out 0.5s forwards;
	}

	@keyframes progressCircle {
		0% {
			stroke-dashoffset: 251.2;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	.output-checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 24px;
		color: #4caf50;
		opacity: 0;
		animation: fadeInCheck 0.3s ease-in-out 2s forwards;
	}

	@keyframes fadeInCheck {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.5);
		}
		100% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.output-formats {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.output-format {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 16px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		font-size: 14px;
		font-weight: 600;
		color: #282876;
		opacity: 0;
		animation: fadeInScale 0.5s ease-out forwards;
		border-left: 3px solid var(--fmt-color);
	}

	.fmt-icon {
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
</style>
