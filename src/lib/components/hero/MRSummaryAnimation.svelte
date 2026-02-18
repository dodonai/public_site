<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const logo = '/images/brand/logo-main.png';

	const execSections = [
		{
			title: 'Patient Demographics',
			text: 'Jane M. Doe (DOB: 04/15/1978), involved in MVA on 03/12/2024. Claim #PI-2024-08172.'
		},
		{
			title: 'Key Diagnoses',
			text: 'Herniated disc L4-L5 (M51.16), cervical strain (S13.4), lumbar radiculopathy (M54.17).'
		},
		{
			title: 'Treatment Summary',
			text: 'ER visit, MRI imaging, PT 3x/week, Cyclobenzaprine 10mg, Gabapentin 300mg. Surgical consult deferred.'
		},
		{
			title: 'Prognosis & Status',
			text: 'Conservative treatment ongoing. ROM decreased 40%. Patient elects continued PT over epidural injection.'
		}
	];

	const chronologyEntries = [
		{
			type: 'ER Visit',
			typeColor: '#dc2626',
			provider: 'Memorial Hospital',
			date: '03/12/24',
			fields: [
				{ label: 'Chief Complaint', value: 'Cervical & lumbar pain post-MVA' },
				{ label: 'Diagnosis', value: 'Cervical strain, lumbar sprain' },
				{ label: 'Treatment', value: 'X-ray, muscle relaxants, follow-up' }
			],
			page: 'p. 3'
		},
		{
			type: 'Diagnostic Study',
			typeColor: '#7c3aed',
			provider: 'Valley Imaging',
			date: '03/15/24',
			fields: [
				{ label: 'Study', value: 'MRI Lumbar Spine' },
				{ label: 'Findings', value: 'Herniated disc L4-L5, nerve impingement' },
				{ label: 'Impression', value: 'Surgical vs. conservative mgmt indicated' }
			],
			page: 'p. 11'
		},
		{
			type: 'Office Visit',
			typeColor: '#2563eb',
			provider: 'Dr. Sarah Chen',
			date: '04/02/24',
			fields: [
				{ label: 'Assessment', value: 'Lumbar radiculopathy, improving' },
				{ label: 'Plan', value: 'PT 3x/week, 6 weeks' },
				{ label: 'Medications', value: 'Add Gabapentin 300mg TID' }
			],
			page: 'p. 17'
		},
		{
			type: 'Lab Work',
			typeColor: '#059669',
			provider: 'Quest Diagnostics',
			date: '04/02/24',
			fields: [
				{ label: 'Test', value: 'CBC, CMP, ESR' },
				{ label: 'Result', value: 'WNL; ESR elevated 28 mm/hr' }
			],
			page: 'p. 23'
		}
	];

	const docIndexRows = [
		{ name: 'Memorial_ER_Visit.pdf', date: '03/12/2024', type: 'ER Notes', typeColor: '#dc2626', pages: '1-8' },
		{ name: 'MRI_Lumbar_Spine.pdf', date: '03/15/2024', type: 'Imaging', typeColor: '#7c3aed', pages: '9-14' },
		{ name: 'Dr_Chen_Progress.pdf', date: '04/02/2024', type: 'Progress', typeColor: '#2563eb', pages: '15-22' },
		{ name: 'Lab_Results_CBC.pdf', date: '03/12/2024', type: 'Lab', typeColor: '#059669', pages: '23-25' },
		{ name: 'PT_Eval_Notes.pdf', date: '04/20/2024', type: 'Therapy', typeColor: '#d97706', pages: '26-34' }
	];

	const timelineRows = [
		{
			date: '03/12/24',
			provider: 'Memorial Hospital ER',
			event: 'MVA - c-spine and lumbar pain. X-ray negative.',
			page: 'p. 3'
		},
		{
			date: '03/15/24',
			provider: 'Valley Imaging Center',
			event: 'MRI: Herniated disc L4-L5, nerve compression.',
			page: 'p. 11'
		},
		{
			date: '04/02/24',
			provider: 'Dr. Sarah Chen, MD',
			event: 'Follow-up: PT 3x/week, continue meds.',
			page: 'p. 17'
		},
		{
			date: '04/20/24',
			provider: 'Apex Physical Therapy',
			event: 'Initial eval. ROM decreased 40%.',
			page: 'p. 28'
		}
	];

	const chronologyRows = [
		{
			date: '03/12/24',
			type: 'Office Visit',
			typeColor: '#2563eb',
			provider: 'Memorial Hospital ER',
			description: 'Initial evaluation post-MVA. Cervical and lumbar pain. X-ray negative for fracture. Prescribed muscle relaxants.',
			page: 'p. 3'
		},
		{
			date: '03/15/24',
			type: 'Diagnostic Study',
			typeColor: '#7c3aed',
			provider: 'Valley Imaging Center',
			description: 'MRI lumbar spine: posterior disc herniation L4-L5 with left L5 nerve root impingement.',
			page: 'p. 11'
		},
		{
			date: '03/22/24',
			type: 'Office Visit',
			typeColor: '#2563eb',
			provider: 'Dr. Sarah Chen, MD',
			description: 'Review MRI results. Referred to PT 3x/week. Continue Cyclobenzaprine, add Gabapentin 300mg.',
			page: 'p. 17'
		},
		{
			date: '04/02/24',
			type: 'Lab Work',
			typeColor: '#059669',
			provider: 'Quest Diagnostics',
			description: 'CBC, CMP within normal limits. ESR slightly elevated at 28 mm/hr.',
			page: 'p. 23'
		},
		{
			date: '04/20/24',
			type: 'Physical Therapy',
			typeColor: '#d97706',
			provider: 'Apex Physical Therapy',
			description: 'Initial PT evaluation. Lumbar ROM decreased 40%. Treatment plan: therapeutic exercises, manual therapy.',
			page: 'p. 28'
		},
		{
			date: '05/01/24',
			type: 'Surgical Consult',
			typeColor: '#dc2626',
			provider: 'Dr. James Park, MD',
			description: 'Discussed epidural steroid injection vs. continued conservative treatment. Patient elects conservative care.',
			page: 'p. 31'
		}
	];

	const uploadDocs = [
		{ label: 'ER Visit Notes', delay: 0 },
		{ label: 'MRI Report', delay: 200 },
		{ label: 'Lab Results', delay: 400 },
		{ label: 'Progress Notes', delay: 600 },
		{ label: 'PT Evaluation', delay: 800 },
		{ label: 'Discharge Summary', delay: 1000 },
		{ label: 'Operative Report', delay: 1200 },
		{ label: 'Rx Records', delay: 1400 }
	];
</script>

<AnimationStage durations={[8000, 7000, 6000, 7000, 8000, 8000, 5000, 4000]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Upload & Processing -->
		{#if step === 0}
			<PhaseWrapper caption="Upload records, get results in minutes">
				<div class="upload-scene">
					<!-- Left: Document stack -->
					<div class="upload-docs">
						{#each uploadDocs as doc, i}
							<div class="upload-doc" style="animation-delay: {doc.delay}ms">
								<svg width="28" height="34" viewBox="0 0 32 40" fill="none">
									<rect x="0" y="0" width="32" height="40" rx="3" fill="white" stroke="#d1d5db" stroke-width="1" />
									<path d="M0 3a3 3 0 013-3h26a3 3 0 013 3v5H0V3z" fill="#e5e7eb" />
									<line x1="6" y1="14" x2="26" y2="14" stroke="#d1d5db" stroke-width="1.5" />
									<line x1="6" y1="19" x2="22" y2="19" stroke="#d1d5db" stroke-width="1.5" />
									<line x1="6" y1="24" x2="24" y2="24" stroke="#d1d5db" stroke-width="1.5" />
								</svg>
								<span class="upload-doc-label">{doc.label}</span>
							</div>
						{/each}
					</div>

					<!-- Center: Processing -->
					<div class="upload-processor">
						<div class="upload-arrow-in">
							<svg width="40" height="24" viewBox="0 0 40 24" fill="none">
								<path d="M0 12h32" stroke="#836ae4" stroke-width="2" stroke-dasharray="4 3" class="upload-arrow-path" />
								<polygon points="30,8 38,12 30,16" fill="#836ae4" />
							</svg>
						</div>
						<div class="upload-card">
							<img src={logo} alt="Dodonai" width="40" class="upload-logo" />
							<div class="upload-status">
								<div class="upload-status-text">Processing 247 pages</div>
								<div class="upload-progress-track">
									<div class="upload-progress-bar"></div>
								</div>
								<div class="upload-page-count">
									<span class="upload-count-num"></span>
								</div>
							</div>
							<div class="upload-complete">
								<span class="upload-check">&#10003;</span>
								<span class="upload-complete-text">Summary Ready</span>
							</div>
						</div>
						<div class="upload-arrow-out">
							<svg width="40" height="24" viewBox="0 0 40 24" fill="none">
								<path d="M0 12h32" stroke="#059669" stroke-width="2" stroke-dasharray="4 3" class="upload-arrow-path-out" />
								<polygon points="30,8 38,12 30,16" fill="#059669" />
							</svg>
						</div>
					</div>

					<!-- Right: Output -->
					<div class="upload-output">
						<div class="upload-output-item" style="animation-delay: 5800ms">
							<div class="upload-output-icon" style="background: #2563eb15; color: #2563eb">&#9776;</div>
							<span>Executive Summary</span>
						</div>
						<div class="upload-output-item" style="animation-delay: 6100ms">
							<div class="upload-output-icon" style="background: #05966915; color: #059669">&#9998;</div>
							<span>Data Extraction</span>
						</div>
						<div class="upload-output-item" style="animation-delay: 6400ms">
							<div class="upload-output-icon" style="background: #7c3aed15; color: #7c3aed">&#8862;</div>
							<span>Chronology</span>
						</div>
						<div class="upload-output-item" style="animation-delay: 6700ms">
							<div class="upload-output-icon" style="background: #2B78B115; color: #2B78B1">&#9866;</div>
							<span>Timeline</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Executive Summary -->
		{#if step === 1}
			<PhaseWrapper caption="Customizable Executive Summary">
				<div class="exec-scene">
					<div class="mr-exec-card">
						<div class="mr-exec-header">
							<div class="mr-exec-title">Executive Summary</div>
							<div class="mr-template-chip">
								<svg class="mr-template-icon" width="12" height="12" viewBox="0 0 16 16" fill="none">
									<rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
									<line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									<line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									<line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
								Medical Record Analysis
							</div>
						</div>
						<div class="mr-exec-sections">
							{#each execSections as section, i}
								<div class="mr-exec-section" style="animation-delay: {800 + i * 1200}ms">
									<div class="mr-exec-section-title">{section.title}</div>
									<div class="mr-exec-section-text">{section.text}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Document Index -->
		{#if step === 2}
			<PhaseWrapper caption="Complete Document Index">
				<div class="docindex-scene">
					<div class="docindex-card">
						<div class="docindex-title">Document Index</div>
						<div class="docindex-table">
							<div class="docindex-header-row">
								<div class="docindex-header-cell docindex-col-name">File Name</div>
								<div class="docindex-header-cell docindex-col-date">Date</div>
								<div class="docindex-header-cell docindex-col-type">Type</div>
								<div class="docindex-header-cell docindex-col-pg">Pg</div>
							</div>
							{#each docIndexRows as row, i}
								<div
									class="docindex-row"
									class:docindex-row-even={i % 2 === 1}
									style="animation-delay: {800 + i * 500}ms"
								>
									<div class="docindex-cell docindex-col-name">
										<span class="docindex-filename">{row.name}</span>
									</div>
									<div class="docindex-cell docindex-col-date">{row.date}</div>
									<div class="docindex-cell docindex-col-type">
										<span class="docindex-type-badge" style="background: {row.typeColor}15; color: {row.typeColor}; border: 1px solid {row.typeColor}30">
											{row.type}
										</span>
									</div>
									<div class="docindex-cell docindex-col-pg">{row.pages}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 3: Extracted Data -->
		{#if step === 3}
			<PhaseWrapper caption="Structured Data Extraction">
				<div class="extracted-scene">
					<div class="extracted-sections">
						<!-- Patient Info -->
						<div class="extracted-section" style="animation-delay: 400ms; --section-color: #2563eb">
							<div class="extracted-section-header">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
									<circle cx="12" cy="7" r="4" />
								</svg>
								<span class="extracted-section-title" style="color: #2563eb">Patient Info</span>
							</div>
							<div class="extracted-fields">
								<div class="extracted-field"><span class="extracted-label">Name:</span> Jane M. Doe</div>
								<div class="extracted-field"><span class="extracted-label">DOB:</span> 04/15/1978</div>
								<div class="extracted-field"><span class="extracted-label">Claim #:</span> PI-2024-08172</div>
							</div>
						</div>

						<!-- Diagnoses -->
						<div class="extracted-section" style="animation-delay: 1900ms; --section-color: #059669">
							<div class="extracted-section-header">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round">
									<path d="M9 12l2 2 4-4" />
									<circle cx="12" cy="12" r="10" />
								</svg>
								<span class="extracted-section-title" style="color: #059669">Diagnoses</span>
							</div>
							<div class="extracted-fields">
								<div class="extracted-field">Herniated Disc L4-L5 <span class="extracted-code">M51.16</span></div>
								<div class="extracted-field">Cervical Strain <span class="extracted-code">S13.4</span></div>
								<div class="extracted-field">Lumbar Radiculopathy <span class="extracted-code">M54.17</span></div>
							</div>
						</div>

						<!-- Medications -->
						<div class="extracted-section" style="animation-delay: 3400ms; --section-color: #7c3aed">
							<div class="extracted-section-header">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round">
									<rect x="3" y="3" width="18" height="18" rx="2" />
									<path d="M3 9h18" />
									<path d="M9 3v18" />
								</svg>
								<span class="extracted-section-title" style="color: #7c3aed">Medications</span>
							</div>
							<div class="extracted-fields">
								<div class="extracted-field">Cyclobenzaprine 10mg TID</div>
								<div class="extracted-field">Naproxen 500mg BID</div>
								<div class="extracted-field">Gabapentin 300mg TID</div>
							</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 4: Medical Chronology (different doc types, different extractions) -->
		{#if step === 4}
			<PhaseWrapper caption="Each Document Type Extracts Different Data">
				<div class="mchrono-scene">
					<div class="mchrono-cards">
						{#each chronologyEntries as entry, i}
							<div class="mchrono-entry-card" style="animation-delay: {400 + i * 1400}ms; --entry-color: {entry.typeColor}">
								<div class="mchrono-entry-header">
									<span class="mchrono-entry-type" style="background: {entry.typeColor}12; color: {entry.typeColor}; border: 1px solid {entry.typeColor}30">
										{entry.type}
									</span>
									<span class="mchrono-entry-date">{entry.date}</span>
									<span class="mchrono-entry-page">{entry.page}</span>
								</div>
								<div class="mchrono-entry-provider">{entry.provider}</div>
								<div class="mchrono-entry-fields">
									{#each entry.fields as field}
										<div class="mchrono-field">
											<span class="mchrono-field-label">{field.label}:</span>
											<span class="mchrono-field-value">{field.value}</span>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 5: Medical Timeline (graphical) -->
		{#if step === 5}
			<PhaseWrapper caption="Visual Medical Timeline">
				<div class="chrono-scene">
					<div class="chrono-card">
						<div class="chrono-title">Medical Timeline</div>
						<div class="chrono-timeline">
							<div class="chrono-connector"></div>
							{#each timelineRows as row, i}
								<div class="chrono-entry" style="animation-delay: {600 + i * 1200}ms">
									<div class="chrono-dot"></div>
									<div class="chrono-date">{row.date}</div>
									<div class="chrono-content">
										<div class="chrono-provider">{row.provider}</div>
										<div class="chrono-event">{row.event}</div>
									</div>
									<div class="chrono-page">{row.page}</div>
								</div>
							{/each}
						</div>
						<div class="chrono-source-note">Every entry linked to source pages</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 6: Source Linking -->
		{#if step === 6}
			<PhaseWrapper caption="Click Any Reference to Navigate to Source">
				<div class="source-scene">
					<div class="source-left">
						<div class="source-label">Chronology</div>
						<div class="source-entry-highlight">
							<span class="source-date-tag">03/15/24</span>
							<span class="source-entry-text">MRI: Herniated disc L4-L5</span>
							<span class="source-page-link">p. 11</span>
						</div>
					</div>

					<div class="source-connector">
						<svg width="70" height="40" viewBox="0 0 70 40" fill="none">
							<path
								d="M0 20 C25 20, 45 20, 70 20"
								stroke="#2B78B1"
								stroke-width="2"
								stroke-dasharray="4 3"
								class="source-connector-path"
							/>
							<circle cx="0" cy="20" r="4" fill="#2B78B1" class="source-dot-left" />
							<polygon points="66,16 70,20 66,24" fill="#2B78B1" class="source-arrow" />
						</svg>
					</div>

					<div class="source-right">
						<div class="source-label">Source Document — Page 11</div>
						<div class="source-doc-page">
							<div class="source-doc-line source-doc-dim">FINDINGS:</div>
							<div class="source-doc-line source-doc-dim">Lumbar Spine MRI dated 03/15/2024</div>
							<div class="source-doc-line source-doc-highlight">L4-L5: Posterior disc herniation</div>
							<div class="source-doc-line source-doc-highlight">with impingement on the left L5</div>
							<div class="source-doc-line source-doc-highlight">nerve root.</div>
							<div class="source-doc-line source-doc-dim">L3-L4: Mild disc bulge, no</div>
							<div class="source-doc-line source-doc-dim">significant stenosis.</div>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 7: Download -->
		{#if step === 7}
			<PhaseWrapper caption="Download Your Complete MR Summary">
				<div class="mr-download-scene">
					<div class="mr-download-card">
						<div class="mr-download-header">
							<img src={logo} alt="Dodonai" width="50" />
						</div>
						<div class="mr-download-ring-wrap">
							<svg viewBox="0 0 100 100" width="56" height="56">
								<circle cx="50" cy="50" r="36" fill="none" stroke="#e5e7eb" stroke-width="5" />
								<circle
									cx="50"
									cy="50"
									r="36"
									fill="none"
									stroke="#4CAF50"
									stroke-width="5"
									class="mr-progress-ring"
								/>
							</svg>
							<span class="mr-checkmark">&#10003;</span>
						</div>
						<div class="mr-download-formats">
							{#each [{ label: 'PDF', color: '#E2574C', letter: 'P' }, { label: 'Word', color: '#2B78B1', letter: 'W' }, { label: 'Excel', color: '#217346', letter: 'X' }] as fmt, i}
								<div
									class="mr-format-badge"
									style="animation-delay: {400 + i * 300}ms; background: {fmt.color}12; border-color: {fmt.color}40"
								>
									<div class="mr-format-icon" style="background: {fmt.color}">{fmt.letter}</div>
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
	@keyframes mrFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes mrFadeInUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes mrFadeInScale {
		0% { opacity: 0; transform: scale(0.85); }
		100% { opacity: 1; transform: scale(1); }
	}

	@keyframes mrSlideIn {
		from { opacity: 0; transform: translateX(-20px); }
		to { opacity: 1; transform: translateX(0); }
	}

	/* =============================
	   Phase 0: Upload & Processing
	   ============================= */
	.upload-scene {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		padding: 0 8px;
	}

	@media (max-width: 640px) {
		.upload-scene {
			transform: scale(0.78);
		}
	}

	@media (max-width: 480px) {
		.upload-scene {
			transform: scale(0.62);
		}
	}

	.upload-docs {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex-shrink: 0;
	}

	.upload-doc {
		display: flex;
		align-items: center;
		gap: 6px;
		opacity: 0;
		animation: mrUploadDocAppear 0.4s ease-out forwards;
	}

	@keyframes mrUploadDocAppear {
		from { opacity: 0; transform: translateX(-20px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.upload-doc-label {
		font-size: 8px;
		font-weight: 600;
		color: #8181ac;
		white-space: nowrap;
	}

	.upload-processor {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.upload-arrow-in {
		opacity: 0;
		animation: mrFadeIn 0.5s ease-out 1.8s forwards;
	}

	.upload-arrow-path {
		stroke-dashoffset: 40;
		animation: mrDrawArrow 0.6s ease-out 2s forwards;
	}

	.upload-arrow-out {
		opacity: 0;
		animation: mrFadeIn 0.5s ease-out 5.5s forwards;
	}

	.upload-arrow-path-out {
		stroke-dashoffset: 40;
		animation: mrDrawArrow 0.6s ease-out 5.7s forwards;
	}

	@keyframes mrDrawArrow {
		to { stroke-dashoffset: 0; }
	}

	.upload-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 14px 18px;
		min-width: 160px;
		text-align: center;
		opacity: 0;
		animation: mrFadeInScale 0.5s ease-out 2.2s forwards;
	}

	.upload-logo {
		margin: 0 auto 8px;
		display: block;
	}

	.upload-status {
		opacity: 0;
		animation: mrFadeIn 0.4s ease-out 2.8s forwards, mrHideStatus 0.3s ease-out 5.2s forwards;
	}

	@keyframes mrHideStatus {
		to { opacity: 0; height: 0; overflow: hidden; }
	}

	.upload-status-text {
		font-size: 9px;
		font-weight: 600;
		color: #836ae4;
		margin-bottom: 6px;
	}

	.upload-progress-track {
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 4px;
	}

	.upload-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #836ae4, #2B78B1);
		border-radius: 2px;
		width: 0%;
		animation: mrProgressFill 2.2s ease-in-out 3s forwards;
	}

	@keyframes mrProgressFill {
		0% { width: 0%; }
		100% { width: 100%; }
	}

	.upload-page-count {
		font-size: 8px;
		color: #8181ac;
	}

	.upload-count-num::after {
		content: '247 / 247 pages';
		animation: mrPageCount 2.2s steps(8) 3s forwards;
	}

	@keyframes mrPageCount {
		0% { content: '0 / 247 pages'; }
		12% { content: '31 / 247 pages'; }
		25% { content: '64 / 247 pages'; }
		37% { content: '102 / 247 pages'; }
		50% { content: '148 / 247 pages'; }
		62% { content: '189 / 247 pages'; }
		75% { content: '221 / 247 pages'; }
		87% { content: '240 / 247 pages'; }
		100% { content: '247 / 247 pages'; }
	}

	.upload-complete {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		opacity: 0;
		animation: mrFadeInScale 0.4s ease-out 5.4s forwards;
	}

	.upload-check {
		font-size: 14px;
		color: #059669;
	}

	.upload-complete-text {
		font-size: 11px;
		font-weight: 700;
		color: #059669;
	}

	.upload-output {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex-shrink: 0;
	}

	.upload-output-item {
		display: flex;
		align-items: center;
		gap: 8px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		padding: 8px 12px;
		font-size: 10px;
		font-weight: 600;
		color: #282876;
		opacity: 0;
		animation: mrFadeInUp 0.4s ease-out forwards;
	}

	.upload-output-icon {
		width: 22px;
		height: 22px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		flex-shrink: 0;
	}

	/* =============================
	   Phase 1: Executive Summary
	   ============================= */
	.exec-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.mr-exec-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 14px 24px;
		max-width: 380px;
		width: 100%;
		animation: mrFadeInScale 0.6s ease-out forwards;
	}

	.mr-exec-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 2px;
	}

	.mr-exec-title {
		font-size: 15px;
		font-weight: 700;
		color: #2B78B1;
	}

	.mr-template-chip {
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
		animation: mrFadeInUp 0.4s ease-out 0.4s forwards;
	}

	.mr-template-icon {
		color: #836ae4;
		flex-shrink: 0;
	}

	.mr-exec-sections {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mr-exec-section {
		padding: 7px 12px;
		border-radius: 8px;
		opacity: 0;
		animation: mrExecSectionAppear 0.6s ease-out forwards;
	}

	@keyframes mrExecSectionAppear {
		0% { opacity: 0; transform: translateY(10px); }
		60% { opacity: 1; transform: translateY(0); }
		100% { opacity: 1; transform: translateY(0); }
	}

	.mr-exec-section-title {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.mr-exec-section-title::before {
		content: '';
		display: inline-block;
		width: 3px;
		height: 12px;
		border-radius: 2px;
		background: #2B78B1;
		flex-shrink: 0;
	}

	.mr-exec-section-text {
		font-size: 11px;
		line-height: 1.6;
		color: #8181ac;
		padding-left: 9px;
	}

	/* =============================
	   Phase 2: Document Index
	   ============================= */
	.docindex-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.docindex-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		max-width: 440px;
		width: 100%;
		overflow: hidden;
		animation: mrFadeInScale 0.6s ease-out forwards;
	}

	.docindex-title {
		text-align: center;
		font-size: 15px;
		font-weight: 700;
		color: #2B78B1;
		padding: 14px 16px 10px;
	}

	.docindex-table {
		border-top: 1px solid #d1d5db;
		overflow: hidden;
	}

	.docindex-header-row {
		display: flex;
		background: #f4f5fd;
		border-bottom: 1px solid #d1d5db;
		padding: 6px 12px;
		gap: 6px;
	}

	.docindex-header-cell {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
	}

	.docindex-col-name {
		flex: 1;
		min-width: 0;
	}

	.docindex-col-date {
		width: 72px;
		flex-shrink: 0;
	}

	.docindex-col-type {
		width: 68px;
		flex-shrink: 0;
	}

	.docindex-col-pg {
		width: 36px;
		flex-shrink: 0;
		text-align: right;
	}

	.docindex-row {
		display: flex;
		padding: 7px 12px;
		gap: 6px;
		border-bottom: 1px solid #e5e7eb;
		align-items: center;
		opacity: 0;
		animation: mrRowAppear 0.5s ease-out forwards;
	}

	.docindex-row-even {
		background: #f4f5fd;
	}

	@keyframes mrRowAppear {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.docindex-cell {
		font-size: 10px;
		line-height: 1.4;
		color: #8181ac;
	}

	.docindex-filename {
		font-weight: 500;
		color: #282876;
		font-size: 9px;
	}

	.docindex-type-badge {
		display: inline-block;
		font-size: 8px;
		font-weight: 600;
		padding: 1px 6px;
		border-radius: 6px;
		white-space: nowrap;
	}

	/* =============================
	   Phase 3: Extracted Data
	   ============================= */
	.extracted-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.extracted-sections {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 340px;
		width: 100%;
	}

	.extracted-section {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 16px;
		border-left: 3px solid var(--section-color);
		opacity: 0;
		animation: mrSlideIn 0.6s ease-out forwards;
	}

	.extracted-section-header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 8px;
	}

	.extracted-section-title {
		font-size: 12px;
		font-weight: 700;
	}

	.extracted-fields {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.extracted-field {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.5;
	}

	.extracted-label {
		font-weight: 600;
		color: #282876;
	}

	.extracted-code {
		font-size: 9px;
		font-family: 'Courier New', monospace;
		background: #f4f5fd;
		padding: 0 4px;
		border-radius: 3px;
		color: #8181ac;
	}

	/* =============================
	   Phase 4: Medical Chronology
	   ============================= */
	.mchrono-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.mchrono-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		max-width: 460px;
		width: 100%;
	}

	.mchrono-entry-card {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		padding: 10px 12px;
		border-left: 3px solid var(--entry-color);
		opacity: 0;
		animation: mrSlideIn 0.6s ease-out forwards;
	}

	.mchrono-entry-header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 6px;
	}

	.mchrono-entry-type {
		font-size: 8px;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 6px;
		white-space: nowrap;
	}

	.mchrono-entry-date {
		font-size: 9px;
		font-weight: 600;
		color: #8181ac;
	}

	.mchrono-entry-page {
		font-size: 9px;
		font-weight: 600;
		color: #2B78B1;
		margin-left: auto;
	}

	.mchrono-entry-provider {
		font-size: 10px;
		font-weight: 600;
		color: #282876;
		margin-bottom: 6px;
	}

	.mchrono-entry-fields {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.mchrono-field {
		font-size: 9px;
		line-height: 1.4;
		color: #8181ac;
	}

	.mchrono-field-label {
		font-weight: 600;
		color: #282876;
	}

	.mchrono-field-value {
		color: #8181ac;
	}

	/* =============================
	   Phase 5: Medical Timeline
	   ============================= */
	.chrono-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.chrono-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 16px 20px;
		max-width: 420px;
		width: 100%;
		animation: mrFadeInScale 0.6s ease-out forwards;
	}

	.chrono-title {
		text-align: center;
		font-size: 15px;
		font-weight: 700;
		color: #2B78B1;
		margin-bottom: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e7eb;
	}

	.chrono-timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.chrono-connector {
		position: absolute;
		left: 5px;
		top: 8px;
		bottom: 8px;
		width: 2px;
		background: #bfdbfe;
		border-radius: 1px;
	}

	.chrono-entry {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 8px 0;
		position: relative;
		opacity: 0;
		animation: mrRowAppear 0.6s ease-out forwards;
	}

	.chrono-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #2B78B1;
		flex-shrink: 0;
		margin-top: 2px;
		box-shadow: 0 0 0 3px rgba(43, 120, 177, 0.2);
	}

	.chrono-date {
		font-size: 10px;
		font-weight: 700;
		color: #8181ac;
		width: 56px;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.chrono-content {
		flex: 1;
		min-width: 0;
	}

	.chrono-provider {
		font-size: 10px;
		font-weight: 600;
		color: #282876;
		margin-bottom: 2px;
	}

	.chrono-event {
		font-size: 9px;
		color: #8181ac;
		line-height: 1.5;
	}

	.chrono-page {
		font-size: 10px;
		font-weight: 600;
		color: #2B78B1;
		flex-shrink: 0;
		margin-top: 1px;
		cursor: default;
	}

	.chrono-source-note {
		text-align: center;
		font-size: 9px;
		color: #8181ac;
		font-style: italic;
		margin-top: 10px;
		padding-top: 8px;
		border-top: 1px solid #e5e7eb;
		opacity: 0;
		animation: mrFadeIn 0.6s ease-out 5.5s forwards;
	}

	/* =============================
	   Phase 6: Source Linking
	   ============================= */
	.source-scene {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.source-left {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 14px;
		max-width: 160px;
		opacity: 0;
		animation: mrFadeInUp 0.6s ease-out 0.3s forwards;
	}

	.source-label {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
		margin-bottom: 8px;
	}

	.source-entry-highlight {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: #eff6ff;
		border-left: 3px solid #2B78B1;
		padding: 8px 10px;
		border-radius: 0 6px 6px 0;
	}

	.source-date-tag {
		font-size: 9px;
		font-weight: 700;
		color: #8181ac;
	}

	.source-entry-text {
		font-size: 10px;
		color: #282876;
		line-height: 1.4;
	}

	.source-page-link {
		font-size: 11px;
		font-weight: 700;
		color: #2B78B1;
		background: rgba(43, 120, 177, 0.12);
		padding: 2px 6px;
		border-radius: 4px;
		width: fit-content;
		animation: mrPulseLink 1.5s ease-in-out 2s infinite;
	}

	@keyframes mrPulseLink {
		0%, 100% { box-shadow: 0 0 0 0 rgba(43, 120, 177, 0.4); }
		50% { box-shadow: 0 0 0 4px rgba(43, 120, 177, 0); }
	}

	.source-connector {
		flex-shrink: 0;
		opacity: 0;
		animation: mrFadeIn 0.5s ease-out 1.2s forwards;
	}

	.source-connector-path {
		stroke-dashoffset: 70;
		animation: mrDrawConnector 0.8s ease-out 1.5s forwards;
	}

	@keyframes mrDrawConnector {
		to { stroke-dashoffset: 0; }
	}

	.source-dot-left {
		opacity: 0;
		animation: mrFadeIn 0.3s ease-out 1.5s forwards;
	}

	.source-arrow {
		opacity: 0;
		animation: mrFadeIn 0.3s ease-out 2s forwards;
	}

	.source-right {
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		padding: 12px 14px;
		max-width: 190px;
		opacity: 0;
		animation: mrFadeInUp 0.6s ease-out 2s forwards;
	}

	.source-doc-page {
		display: flex;
		flex-direction: column;
		gap: 1px;
		font-family: 'Courier New', monospace;
	}

	.source-doc-line {
		font-size: 9px;
		line-height: 1.6;
		padding: 0 4px;
	}

	.source-doc-dim {
		color: #9ca3af;
	}

	.source-doc-highlight {
		color: #282876;
		background: #fef9c3;
		border-radius: 2px;
	}

	/* =============================
	   Phase 7: Download
	   ============================= */
	.mr-download-scene {
		display: flex;
		justify-content: center;
	}

	.mr-download-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
		padding: 20px 28px;
		min-width: 260px;
		max-width: 300px;
		text-align: center;
		animation: mrFadeInScale 0.6s ease-out forwards;
	}

	.mr-download-header {
		display: flex;
		justify-content: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e7eb;
		margin-bottom: 16px;
	}

	.mr-download-ring-wrap {
		position: relative;
		width: 56px;
		height: 56px;
		margin: 0 auto 14px;
	}

	.mr-progress-ring {
		stroke-dasharray: 226.2;
		stroke-dashoffset: 226.2;
		transform-origin: center;
		animation: mrProgressCircle 1.5s ease-in-out 0.5s forwards;
	}

	@keyframes mrProgressCircle {
		to { stroke-dashoffset: 0; }
	}

	.mr-checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 22px;
		color: #4caf50;
		opacity: 0;
		animation: mrCheckPop 0.3s ease-out 2s forwards;
	}

	@keyframes mrCheckPop {
		0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
		100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
	}

	.mr-download-formats {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.mr-format-badge {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 10px;
		border-radius: 8px;
		border: 1.5px solid;
		font-size: 10px;
		font-weight: 600;
		opacity: 0;
		animation: mrFadeInUp 0.4s ease-out forwards;
	}

	.mr-format-icon {
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
