<script>
	import { linkify } from '$lib/utils/linkify.js';

	let {
		heading = '',
		description = '',
		basicFeatures = [],
		advancedFeatures = [],
		fullService = null,
		background = 'bg-white'
	} = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<!-- Section heading -->
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				{heading}
			</h2>
			{#if description}
				<p class="mt-4 text-base leading-relaxed text-[#8181ac]">
					{@html linkify(description)}
				</p>
			{/if}
		</div>

		<!-- Comparison cards -->
		<div class="mt-16 grid gap-8 lg:grid-cols-2">
			<!-- Basic Mode Card -->
			<div class="wc-card wc-card-basic">
				<div class="wc-card-header wc-header-basic">
					<h3 class="wc-card-title">Basic Mode</h3>
					<p class="wc-card-subtitle">Essential summarization tools</p>
				</div>
				<ul class="wc-feature-list">
					{#each basicFeatures as feature}
						<li class="wc-feature-item">
							<svg class="wc-check wc-check-basic" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Advanced Mode Card -->
			<div class="wc-card wc-card-advanced">
				<div class="wc-badge-wrap">
					<span class="wc-badge">Recommended</span>
				</div>
				<div class="wc-card-header wc-header-advanced">
					<h3 class="wc-card-title wc-title-advanced">Advanced Mode</h3>
					<p class="wc-card-subtitle">Full-featured workflow tools</p>
				</div>
				<ul class="wc-feature-list">
					{#each basicFeatures as feature}
						<li class="wc-feature-item">
							<svg class="wc-check wc-check-advanced" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>{feature}</span>
						</li>
					{/each}
					<li class="wc-divider" aria-hidden="true">
						<span class="wc-divider-line"></span>
						<span class="wc-divider-text">Advanced only</span>
						<span class="wc-divider-line"></span>
					</li>
					{#each advancedFeatures as feature}
						<li class="wc-feature-item">
							<svg class="wc-check wc-check-advanced" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Animated feature demos -->
		<div class="mt-16 grid gap-6 sm:grid-cols-2">
			<!-- Demo 1: Document Indexing -->
			<div class="wc-demo-card wc-demo-card-tall">
				<h4 class="wc-demo-title">Document Indexing</h4>
				<div class="wc-demo-stage wc-demo-stage-tall">
					<div class="wc-index-scene">
						<!-- Incoming monolithic stack -->
						<div class="wc-index-incoming">
							<div class="wc-index-mono">
								<div class="wc-index-mono-inner">
									<div class="wc-mono-line"></div>
									<div class="wc-mono-line wc-mono-line-short"></div>
									<div class="wc-mono-line"></div>
									<div class="wc-mono-line wc-mono-line-short"></div>
									<div class="wc-mono-line"></div>
								</div>
								<span class="wc-mono-label">247 pages</span>
							</div>
						</div>

						<!-- Arrow -->
						<div class="wc-index-arrow">
							<svg width="32" height="20" viewBox="0 0 32 20" fill="none">
								<path d="M0 10h24" stroke="#836ae4" stroke-width="2" stroke-dasharray="4 3" class="wc-index-arrow-path" />
								<polygon points="22,6 30,10 22,14" fill="#836ae4" />
							</svg>
						</div>

						<!-- Separated output documents -->
						<div class="wc-index-output">
							<div class="wc-index-result wc-result-1">
								<div class="wc-result-doc" style="border-left-color: #dc2626"></div>
								<span class="wc-result-label" style="color: #dc2626">Hospital Records</span>
								<span class="wc-result-pages">pp. 1-42</span>
							</div>
							<div class="wc-index-result wc-result-2">
								<div class="wc-result-doc" style="border-left-color: #7c3aed"></div>
								<span class="wc-result-label" style="color: #7c3aed">Lab Reports</span>
								<span class="wc-result-pages">pp. 43-89</span>
							</div>
							<div class="wc-index-result wc-result-3">
								<div class="wc-result-doc" style="border-left-color: #2563eb"></div>
								<span class="wc-result-label" style="color: #2563eb">Progress Notes</span>
								<span class="wc-result-pages">pp. 90-168</span>
							</div>
							<div class="wc-index-result wc-result-4">
								<div class="wc-result-doc" style="border-left-color: #d97706"></div>
								<span class="wc-result-label" style="color: #d97706">Imaging</span>
								<span class="wc-result-pages">pp. 169-203</span>
							</div>
							<div class="wc-index-result wc-result-5">
								<div class="wc-result-doc" style="border-left-color: #059669"></div>
								<span class="wc-result-label" style="color: #059669">PT / Therapy</span>
								<span class="wc-result-pages">pp. 204-247</span>
							</div>
						</div>
					</div>
				</div>
				<p class="wc-demo-caption">Sorts, deduplicates, and labels scattered records</p>
			</div>

			<!-- Demo 2: Index Tables -->
			<div class="wc-demo-card wc-demo-card-tall">
				<h4 class="wc-demo-title">Interactive Index Tables</h4>
				<div class="wc-demo-stage wc-demo-stage-tall">
					<div class="wc-tables-pair">
						<!-- Provider Index Table -->
						<div class="wc-table-demo">
							<div class="wc-table-title-bar">Provider Index <span class="wc-table-count">4</span></div>
							<div class="wc-table-header">
								<span class="wc-th wc-th-name">Provider</span>
								<span class="wc-th wc-th-count">Count</span>
								<span class="wc-th wc-th-dates">Date Range</span>
							</div>
							<div class="wc-table-row wc-row-1">
								<span class="wc-td wc-td-name">Dr. Sarah Chen</span>
								<span class="wc-td wc-td-count">6</span>
								<span class="wc-td wc-td-dates">03/22 - 06/15</span>
							</div>
							<div class="wc-table-row wc-row-2">
								<span class="wc-td wc-td-name">Dr. James Park</span>
								<span class="wc-td wc-td-count">3</span>
								<span class="wc-td wc-td-dates">05/01 - 05/28</span>
							</div>
							<div class="wc-table-row wc-row-3">
								<span class="wc-td wc-td-name">Dr. Lisa Wong</span>
								<span class="wc-td wc-td-count">2</span>
								<span class="wc-td wc-td-dates">04/10 - 04/20</span>
							</div>
							<div class="wc-table-row wc-row-4">
								<span class="wc-td wc-td-name">Dr. R. Martinez</span>
								<span class="wc-td wc-td-count">1</span>
								<span class="wc-td wc-td-dates">03/12</span>
							</div>
						</div>

						<!-- Facility Index Table -->
						<div class="wc-table-demo">
							<div class="wc-table-title-bar">Facility Index <span class="wc-table-count">4</span></div>
							<div class="wc-table-header">
								<span class="wc-th wc-th-name">Facility</span>
								<span class="wc-th wc-th-count">Count</span>
								<span class="wc-th wc-th-dates">Date Range</span>
							</div>
							<div class="wc-table-row wc-row-1">
								<span class="wc-td wc-td-name">Memorial Hospital</span>
								<span class="wc-td wc-td-count">8</span>
								<span class="wc-td wc-td-dates">03/12 - 06/15</span>
							</div>
							<div class="wc-table-row wc-row-2">
								<span class="wc-td wc-td-name">Valley Imaging Center</span>
								<span class="wc-td wc-td-count">3</span>
								<span class="wc-td wc-td-dates">03/15 - 04/28</span>
							</div>
							<div class="wc-table-row wc-row-3">
								<span class="wc-td wc-td-name">Apex Physical Therapy</span>
								<span class="wc-td wc-td-count">5</span>
								<span class="wc-td wc-td-dates">04/20 - 06/10</span>
							</div>
							<div class="wc-table-row wc-row-4">
								<span class="wc-td wc-td-name">Quest Diagnostics</span>
								<span class="wc-td wc-td-count">2</span>
								<span class="wc-td wc-td-dates">04/02 - 05/15</span>
							</div>
						</div>
					</div>
				</div>
				<p class="wc-demo-caption">Sortable tables of providers, facilities, diagnoses, and more</p>
			</div>

			<!-- Demo 3: Side-by-Side Review -->
			<div class="wc-demo-card">
				<h4 class="wc-demo-title">Side-by-Side Review</h4>
				<div class="wc-demo-stage">
					<div class="wc-sidebyside">
						<!-- Left: Summary entry cards (accordion style like the app) -->
						<div class="wc-sbs-left">
							<div class="wc-sbs-label">Summary</div>
							<div class="wc-sbs-entries">
								<!-- Collapsed entry -->
								<div class="wc-sbs-entry-card wc-sbs-entry-dim">
									<div class="wc-sbs-entry-header">
										<svg class="wc-sbs-chevron" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
										<span class="wc-sbs-entry-title">ER Visit</span>
										<span class="wc-sbs-entry-date">03/12/24</span>
									</div>
								</div>
								<!-- Expanded (active) entry -->
								<div class="wc-sbs-entry-card wc-sbs-entry-active">
									<div class="wc-sbs-entry-header">
										<svg class="wc-sbs-chevron wc-sbs-chevron-open" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
										<span class="wc-sbs-entry-title">MRI Results</span>
										<span class="wc-sbs-entry-date">03/15/24</span>
									</div>
									<div class="wc-sbs-entry-fields">
										<div class="wc-sbs-field"><span class="wc-sbs-field-label">Study:</span> MRI Lumbar Spine</div>
										<div class="wc-sbs-field"><span class="wc-sbs-field-label">Finding:</span> Herniated disc L4-L5</div>
										<div class="wc-sbs-field wc-sbs-page-link">
											<svg class="wc-sbs-link-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
											<span>p. 11</span>
										</div>
									</div>
								</div>
								<!-- Collapsed entry -->
								<div class="wc-sbs-entry-card wc-sbs-entry-dim">
									<div class="wc-sbs-entry-header">
										<svg class="wc-sbs-chevron" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
										<span class="wc-sbs-entry-title">Follow-up</span>
										<span class="wc-sbs-entry-date">04/02/24</span>
									</div>
								</div>
							</div>
						</div>
						<!-- Connector -->
						<svg class="wc-sbs-connector" viewBox="0 0 40 60" fill="none">
							<path d="M0 30 C15 30, 25 30, 40 30" stroke="#2B78B1" stroke-width="2" stroke-dasharray="4 3" class="wc-connector-path" />
							<circle cx="0" cy="30" r="3" fill="#2B78B1" class="wc-connector-dot" />
							<polygon points="36,27 40,30 36,33" fill="#2B78B1" class="wc-connector-arrow" />
						</svg>
						<!-- Right: Source document PDF -->
						<div class="wc-sbs-right">
							<div class="wc-sbs-label">Source — p. 11</div>
							<div class="wc-sbs-doc">
								<div class="wc-sbs-line wc-sbs-line-dim">FINDINGS:</div>
								<div class="wc-sbs-line wc-sbs-line-hl">L4-L5: Posterior disc</div>
								<div class="wc-sbs-line wc-sbs-line-hl">herniation with nerve</div>
								<div class="wc-sbs-line wc-sbs-line-hl">impingement</div>
								<div class="wc-sbs-line wc-sbs-line-dim">L3-L4: Mild disc bulge</div>
							</div>
						</div>
					</div>
				</div>
				<p class="wc-demo-caption">Click any entry to navigate to the source page</p>
			</div>

			<!-- Demo 4: Timeline -->
			<div class="wc-demo-card">
				<h4 class="wc-demo-title">Visual Graphic Timeline</h4>
				<div class="wc-demo-stage">
					<div class="wc-timeline">
						<div class="wc-timeline-line"></div>
						<div class="wc-timeline-point wc-point-1">
							<div class="wc-timeline-dot" style="background: #dc2626"></div>
							<div class="wc-timeline-event">
								<span class="wc-timeline-date">03/12</span>
								<span class="wc-timeline-name">ER Visit</span>
							</div>
						</div>
						<div class="wc-timeline-point wc-point-2">
							<div class="wc-timeline-dot" style="background: #7c3aed"></div>
							<div class="wc-timeline-event">
								<span class="wc-timeline-date">03/15</span>
								<span class="wc-timeline-name">MRI</span>
							</div>
						</div>
						<div class="wc-timeline-point wc-point-3">
							<div class="wc-timeline-dot" style="background: #2563eb"></div>
							<div class="wc-timeline-event">
								<span class="wc-timeline-date">04/02</span>
								<span class="wc-timeline-name">Follow-up</span>
							</div>
						</div>
						<div class="wc-timeline-point wc-point-4">
							<div class="wc-timeline-dot" style="background: #d97706"></div>
							<div class="wc-timeline-event">
								<span class="wc-timeline-date">04/20</span>
								<span class="wc-timeline-name">PT Eval</span>
							</div>
						</div>
						<div class="wc-timeline-point wc-point-5">
							<div class="wc-timeline-dot" style="background: #059669"></div>
							<div class="wc-timeline-event">
								<span class="wc-timeline-date">05/01</span>
								<span class="wc-timeline-name">Consult</span>
							</div>
						</div>
					</div>
				</div>
				<p class="wc-demo-caption">Chronological view of all medical events</p>
			</div>
		</div>

		<!-- Full-service callout -->
		{#if fullService}
			<div class="wc-fullservice">
				<div class="wc-fullservice-icon">
					<svg class="h-6 w-6 text-[#836ae4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
					</svg>
				</div>
				<div>
					<h4 class="text-lg font-bold text-[#282876]">{fullService.title}</h4>
					<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{fullService.description}</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	/* =============================
	   Comparison Cards
	   ============================= */
	.wc-card {
		border-radius: 16px;
		background: white;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
		overflow: hidden;
		position: relative;
	}

	.wc-card-basic {
		border: 1px solid #dcddf340;
	}

	.wc-card-advanced {
		border: 2px solid #836ae440;
		box-shadow: 0 4px 32px rgba(131, 106, 228, 0.1);
	}

	.wc-badge-wrap {
		position: absolute;
		top: 12px;
		right: 12px;
	}

	.wc-badge {
		display: inline-block;
		font-size: 11px;
		font-weight: 700;
		color: white;
		background: #836ae4;
		padding: 4px 12px;
		border-radius: 20px;
	}

	.wc-card-header {
		padding: 24px 28px 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.wc-header-basic {
		border-top: 4px solid #216fed;
	}

	.wc-header-advanced {
		border-top: 4px solid #836ae4;
	}

	.wc-card-title {
		font-size: 20px;
		font-weight: 800;
		color: #282876;
	}

	.wc-title-advanced {
		color: #282876;
	}

	.wc-card-subtitle {
		font-size: 13px;
		color: #8181ac;
		margin-top: 4px;
	}

	.wc-feature-list {
		list-style: none;
		padding: 20px 28px 28px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.wc-feature-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 14px;
		color: #282876;
		line-height: 1.5;
	}

	.wc-check {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.wc-check-basic {
		color: #216fed;
	}

	.wc-check-advanced {
		color: #836ae4;
	}

	.wc-divider {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 4px 0;
	}

	.wc-divider-line {
		flex: 1;
		height: 1px;
		background: #836ae425;
	}

	.wc-divider-text {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #836ae4;
		white-space: nowrap;
	}

	/* =============================
	   Animated Feature Demos
	   ============================= */
	.wc-demo-card {
		background: white;
		border-radius: 16px;
		border: 1px solid #dcddf340;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
		padding: 20px 24px;
		overflow: hidden;
	}

	.wc-demo-card-tall {
		/* Extra padding for taller demos */
	}

	.wc-demo-title {
		font-size: 15px;
		font-weight: 700;
		color: #282876;
		margin-bottom: 16px;
		text-align: center;
	}

	.wc-demo-stage {
		height: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.wc-demo-stage-tall {
		height: 260px;
	}

	.wc-demo-caption {
		font-size: 12px;
		color: #8181ac;
		text-align: center;
		margin-top: 12px;
	}

	/* --- Demo 1: Document Indexing --- */
	.wc-index-scene {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
	}

	.wc-index-incoming {
		flex-shrink: 0;
		opacity: 0;
		animation: wcMonoAppear 7s ease-in-out infinite;
	}

	@keyframes wcMonoAppear {
		0%, 3% { opacity: 0; transform: translateX(-10px); }
		8%, 30% { opacity: 1; transform: translateX(0); }
		38%, 42% { opacity: 0.3; transform: scale(0.9); }
		50%, 100% { opacity: 0; }
	}

	.wc-index-mono {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.wc-index-mono-inner {
		width: 48px;
		height: 64px;
		background: white;
		border: 1.5px solid #d1d5db;
		border-radius: 4px;
		padding: 8px 6px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.wc-mono-line {
		height: 2px;
		background: #d1d5db;
		border-radius: 1px;
	}

	.wc-mono-line-short {
		width: 70%;
	}

	.wc-mono-label {
		font-size: 8px;
		font-weight: 600;
		color: #8181ac;
	}

	.wc-index-arrow {
		flex-shrink: 0;
		opacity: 0;
		animation: wcArrowIn 7s ease-in-out 1s infinite;
	}

	@keyframes wcArrowIn {
		0%, 15% { opacity: 0; }
		25%, 35% { opacity: 1; }
		45%, 100% { opacity: 0; }
	}

	.wc-index-arrow-path {
		stroke-dashoffset: 30;
		animation: wcDrawIndexArrow 7s ease-in-out 1.2s infinite;
	}

	@keyframes wcDrawIndexArrow {
		0%, 15% { stroke-dashoffset: 30; }
		30% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: 0; }
	}

	.wc-index-output {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.wc-index-result {
		display: flex;
		align-items: center;
		gap: 6px;
		opacity: 0;
	}

	.wc-result-1 { animation: wcResultFade 7s ease-in-out 1.8s infinite; }
	.wc-result-2 { animation: wcResultFade 7s ease-in-out 2.1s infinite; }
	.wc-result-3 { animation: wcResultFade 7s ease-in-out 2.4s infinite; }
	.wc-result-4 { animation: wcResultFade 7s ease-in-out 2.7s infinite; }
	.wc-result-5 { animation: wcResultFade 7s ease-in-out 3.0s infinite; }

	@keyframes wcResultFade {
		0%, 20% { opacity: 0; transform: translateX(10px); }
		30%, 80% { opacity: 1; transform: translateX(0); }
		92%, 100% { opacity: 0; transform: translateX(10px); }
	}

	.wc-result-doc {
		width: 24px;
		height: 30px;
		background: white;
		border: 1px solid #e5e7eb;
		border-left: 3px solid;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.wc-result-label {
		font-size: 9px;
		font-weight: 700;
		white-space: nowrap;
	}

	.wc-result-pages {
		font-size: 8px;
		color: #8181ac;
		white-space: nowrap;
	}

	/* --- Demo 2: Index Tables --- */
	.wc-tables-pair {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.wc-table-demo {
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #e5e7eb;
	}

	.wc-table-title-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 5px 12px;
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		background: white;
		border-bottom: 1px solid #e5e7eb;
	}

	.wc-table-count {
		font-size: 9px;
		font-weight: 700;
		color: #836ae4;
		background: #836ae415;
		padding: 1px 6px;
		border-radius: 10px;
	}

	.wc-table-header {
		display: flex;
		background: #f4f5fd;
		padding: 4px 10px;
		border-bottom: 1px solid #d1d5db;
	}

	.wc-th {
		font-size: 8px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
	}

	.wc-th-name { flex: 1; }
	.wc-th-count { width: 40px; text-align: center; }
	.wc-th-dates { width: 72px; text-align: right; }

	.wc-table-row {
		display: flex;
		padding: 4px 10px;
		border-bottom: 1px solid #f0f0f5;
		align-items: center;
		opacity: 0;
	}

	.wc-row-1 { animation: wcRowFade 6s ease-in-out 0.5s infinite; }
	.wc-row-2 { animation: wcRowFade 6s ease-in-out 0.9s infinite; }
	.wc-row-3 { animation: wcRowFade 6s ease-in-out 1.3s infinite; }
	.wc-row-4 { animation: wcRowFade 6s ease-in-out 1.7s infinite; }

	@keyframes wcRowFade {
		0%, 5% { opacity: 0; transform: translateY(8px); }
		15%, 80% { opacity: 1; transform: translateY(0); }
		95%, 100% { opacity: 0; transform: translateY(8px); }
	}

	.wc-td {
		font-size: 9px;
		color: #8181ac;
		line-height: 1.4;
	}

	.wc-td-name { flex: 1; font-weight: 500; color: #282876; }
	.wc-td-count { width: 40px; text-align: center; }
	.wc-td-dates { width: 72px; text-align: right; font-size: 8px; }

	/* --- Demo 3: Side-by-Side Review --- */
	.wc-sidebyside {
		display: flex;
		align-items: center;
		gap: 4px;
		width: 100%;
	}

	.wc-sbs-left {
		flex: 1;
		min-width: 0;
	}

	.wc-sbs-right {
		background: #f9fafb;
		border-radius: 8px;
		padding: 10px;
		flex: 1;
		min-width: 0;
	}

	.wc-sbs-label {
		font-size: 8px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #8181ac;
		margin-bottom: 6px;
	}

	.wc-sbs-entries {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	/* Entry card styles (accordion-like, matching the app) */
	.wc-sbs-entry-card {
		border-radius: 6px;
		border: 1px solid #e5e7eb;
		overflow: hidden;
	}

	.wc-sbs-entry-card.wc-sbs-entry-dim {
		background: #f9fafb;
	}

	.wc-sbs-entry-card.wc-sbs-entry-active {
		background: white;
		border-color: #2B78B1;
		box-shadow: 0 1px 4px rgba(43, 120, 177, 0.15);
		animation: wcPulseEntry 3s ease-in-out infinite;
	}

	@keyframes wcPulseEntry {
		0%, 100% { box-shadow: 0 1px 4px rgba(43, 120, 177, 0.15); }
		50% { box-shadow: 0 1px 8px rgba(43, 120, 177, 0.25); }
	}

	.wc-sbs-entry-header {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 6px;
	}

	.wc-sbs-chevron {
		width: 10px;
		height: 10px;
		color: #8181ac;
		flex-shrink: 0;
	}

	.wc-sbs-chevron-open {
		transform: rotate(180deg);
		color: #2B78B1;
	}

	.wc-sbs-entry-title {
		font-size: 9px;
		font-weight: 600;
		color: #282876;
		flex: 1;
	}

	.wc-sbs-entry-dim .wc-sbs-entry-title {
		color: #8181ac;
		font-weight: 500;
	}

	.wc-sbs-entry-date {
		font-size: 8px;
		font-weight: 600;
		color: #8181ac;
		background: #f4f5fd;
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
	}

	.wc-sbs-entry-fields {
		padding: 4px 6px 6px 20px;
		border-top: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.wc-sbs-field {
		font-size: 8px;
		color: #8181ac;
		line-height: 1.5;
	}

	.wc-sbs-field-label {
		font-weight: 600;
		color: #282876;
	}

	.wc-sbs-page-link {
		display: flex;
		align-items: center;
		gap: 3px;
		color: #2B78B1;
		font-weight: 600;
		cursor: default;
		margin-top: 2px;
		animation: wcPagePulse 2s ease-in-out infinite;
	}

	@keyframes wcPagePulse {
		0%, 100% { opacity: 0.7; }
		50% { opacity: 1; }
	}

	.wc-sbs-link-icon {
		width: 10px;
		height: 10px;
	}

	.wc-sbs-connector {
		width: 40px;
		height: 60px;
		flex-shrink: 0;
	}

	.wc-connector-path {
		animation: wcDrawPath 3s ease-in-out infinite;
	}

	@keyframes wcDrawPath {
		0% { stroke-dashoffset: 40; }
		30%, 70% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: 40; }
	}

	.wc-connector-dot {
		animation: wcDotPulse 3s ease-in-out infinite;
	}

	@keyframes wcDotPulse {
		0%, 100% { r: 3; opacity: 0.5; }
		50% { r: 4; opacity: 1; }
	}

	.wc-connector-arrow {
		animation: wcArrowPulse 3s ease-in-out infinite;
	}

	@keyframes wcArrowPulse {
		0%, 20% { opacity: 0; }
		40%, 70% { opacity: 1; }
		100% { opacity: 0; }
	}

	.wc-sbs-doc {
		display: flex;
		flex-direction: column;
		gap: 1px;
		font-family: 'Courier New', monospace;
	}

	.wc-sbs-line {
		font-size: 8px;
		line-height: 1.6;
		padding: 0 3px;
	}

	.wc-sbs-line-dim {
		color: #9ca3af;
	}

	.wc-sbs-line-hl {
		color: #282876;
		background: #fef9c3;
		border-radius: 2px;
		animation: wcHighlight 3s ease-in-out infinite;
	}

	@keyframes wcHighlight {
		0%, 30% { background: transparent; }
		50%, 80% { background: #fef9c3; }
		100% { background: transparent; }
	}

	/* --- Demo 4: Timeline --- */
	.wc-timeline {
		position: relative;
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 30px 10px 0;
	}

	.wc-timeline-line {
		position: absolute;
		top: 36px;
		left: 20px;
		right: 20px;
		height: 3px;
		background: #e5e7eb;
		border-radius: 2px;
		overflow: hidden;
	}

	.wc-timeline-line::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 0%;
		background: linear-gradient(90deg, #dc2626, #7c3aed, #2563eb, #d97706, #059669);
		border-radius: 2px;
		animation: wcTimelineDraw 6s ease-in-out infinite;
	}

	@keyframes wcTimelineDraw {
		0%, 5% { width: 0%; }
		40%, 80% { width: 100%; }
		95%, 100% { width: 0%; }
	}

	.wc-timeline-point {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 1;
		opacity: 0;
	}

	.wc-point-1 { animation: wcPointAppear 6s ease-in-out 0.5s infinite; }
	.wc-point-2 { animation: wcPointAppear 6s ease-in-out 1.0s infinite; }
	.wc-point-3 { animation: wcPointAppear 6s ease-in-out 1.5s infinite; }
	.wc-point-4 { animation: wcPointAppear 6s ease-in-out 2.0s infinite; }
	.wc-point-5 { animation: wcPointAppear 6s ease-in-out 2.5s infinite; }

	@keyframes wcPointAppear {
		0%, 5% { opacity: 0; transform: translateY(8px); }
		15%, 80% { opacity: 1; transform: translateY(0); }
		95%, 100% { opacity: 0; transform: translateY(8px); }
	}

	.wc-timeline-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
		margin-bottom: 8px;
	}

	.wc-timeline-event {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.wc-timeline-date {
		font-size: 9px;
		font-weight: 700;
		color: #8181ac;
	}

	.wc-timeline-name {
		font-size: 9px;
		font-weight: 600;
		color: #282876;
		white-space: nowrap;
	}

	/* =============================
	   Full-Service Callout
	   ============================= */
	.wc-fullservice {
		margin-top: 32px;
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 24px 28px;
		border-radius: 16px;
		border: 1px solid #836ae430;
		background: #836ae408;
	}

	.wc-fullservice-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: #836ae41a;
		flex-shrink: 0;
	}

	/* =============================
	   Responsive
	   ============================= */
	@media (max-width: 640px) {
		.wc-demo-stage {
			height: 160px;
			transform: scale(0.9);
		}

		.wc-demo-stage-tall {
			height: 230px;
		}

		.wc-index-scene {
			transform: scale(0.85);
		}

		.wc-timeline {
			padding: 30px 2px 0;
		}

		.wc-timeline-name {
			font-size: 8px;
		}

		.wc-timeline-date {
			font-size: 8px;
		}

		.wc-sbs-line {
			font-size: 7px;
		}

		.wc-sbs-entry-title {
			font-size: 8px;
		}

		.wc-sbs-field {
			font-size: 7px;
		}
	}
</style>
