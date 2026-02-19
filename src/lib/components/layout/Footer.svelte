<script>
	const servicesLinks = [
		{ name: 'AI Deposition Summary', href: '/deposition-summary-software/' },
		{ name: 'AI Deposition Software', href: '/ai-deposition-transcript-software/' },
		{ name: 'AI E-Discovery Software', href: '/electronic-discovery-software/' },
		{ name: 'AI Medical Record Summaries', href: '/ai-medical-record-summaries-chronologies/' },
		{ name: 'AI-Powered PDF to Text OCR', href: '/ai-pdf-ocr/' },
		{ name: 'Extract & Draft Agents', href: '/dodonai-extract-and-draft-agents/' }
	];

	const resourceLinks = [
		{ name: 'Pricing', href: '/pricing/' },
		{ name: 'Blog', href: '/blog/' },
		{ name: 'Sign Up', href: 'https://app.dodon.ai/signup', external: true },
		{ name: 'Log In', href: 'https://app.dodon.ai/login', external: true }
	];

	const legalLinks = [
		{ name: 'Terms & Conditions', href: '/terms-and-conditions/' },
		{ name: 'Privacy Policy', href: '/privacy-policy/' }
	];

	const blogPosts = [
		{
			name: "Writing Winning Deposition Summaries: Dodonai's Comprehensive Guide",
			href: '/blog/writing-winning-deposition-summaries-dodonai-comprehensive-guide/'
		},
		{
			name: '6 Ways Deposition Summaries Provide Value in Litigation',
			href: '/blog/6-ways-deposition-summaries-provide-value-in-litigation/'
		},
		{
			name: 'How to Draft a Page-Line Deposition Summary',
			href: '/blog/how-to-draft-a-page-line-deposition-summary/'
		},
		{
			name: 'How to Draft an Issue-Based Deposition Summary',
			href: '/blog/how-to-draft-a-issue-based-deposition-summary/'
		},
		{
			name: 'Understanding Depositions: A Comprehensive Guide',
			href: '/blog/understanding-depositions-a-comprehensive-guide/'
		},
		{
			name: 'Crafting Effective Deposition Summaries: Expert Tips and Strategies',
			href: '/blog/crafting-effective-deposition-summaries-expert-tips-and-strategies/'
		}
	];
</script>

<footer class="relative z-40 overflow-hidden">
	<div class="mx-auto flex w-[85%] max-w-[1250px] flex-col items-stretch justify-between pt-10 pb-0">
		<!-- Main footer links row: logo column + grid columns -->
		<div class="flex flex-wrap items-start justify-between pb-10 max-md:flex-wrap max-md:justify-between">
			<!-- Logo + Email + Social -->
			<div class="flex w-[25%] flex-col items-center justify-center max-lg:mb-[50px] max-lg:w-full">
				<a href="/" class="inline-block max-w-[200px]">
					<img src="/images/brand/logo-purple.png" alt="Dodonai" class="w-full" />
				</a>
				<a
					href="mailto:hello@dodon.ai"
					class="mt-5 block text-[16px] font-medium leading-[28px] text-[#282876] transition-colors duration-200 hover:text-[#282876b3]"
				>
					hello@dodon.ai
				</a>
				<div class="mt-5 flex w-[75%] max-w-[170px] items-center justify-between max-lg:w-[40%]">
					<a
						href="https://www.linkedin.com/company/dodon-ai"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-[24px] flex-col items-center justify-end transition-all duration-300 hover:mt-[-5px]"
						aria-label="LinkedIn"
					>
						<img src="/images/brand/linkedin.svg" alt="LinkedIn" class="h-full" />
					</a>
					<a
						href="https://twitter.com/Dodon_ai"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-[24px] flex-col items-center justify-end transition-all duration-300 hover:mt-[-5px]"
						aria-label="Twitter"
					>
						<img src="/images/brand/twitter.svg" alt="Twitter" class="h-full" />
					</a>
					<a
						href="https://www.youtube.com/@dodon-ai"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-[24px] flex-col items-center justify-end transition-all duration-300 hover:mt-[-5px]"
						aria-label="YouTube"
					>
						<img src="/images/brand/youtube.png" alt="YouTube" class="w-[21px]" />
					</a>
				</div>
			</div>

			<!-- Footer grid: Services / Resources / Legal -->
			<div class="grid w-[70%] max-w-[850px] grid-cols-[1.75fr_1fr_1fr] gap-x-4 gap-y-[37px] max-lg:w-full max-lg:gap-x-0 max-md:grid-cols-[1fr_1fr] max-sm:flex max-sm:flex-col max-sm:flex-wrap">
				<!-- Services -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px]">
						<h2 class="text-[18px] font-medium leading-[28px] text-[#282876]">Services</h2>
					</div>
					{#each servicesLinks as link}
						<a
							href={link.href}
							class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
						>
							{link.name}
						</a>
					{/each}
				</div>

				<!-- Resources -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px]">
						<h2 class="text-[18px] font-medium leading-[28px] text-[#282876]">Resources</h2>
					</div>
					{#each resourceLinks as link}
						<a
							href={link.href}
							class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
						>
							{link.name}
						</a>
					{/each}
				</div>

				<!-- Legal -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px]">
						<h2 class="text-[18px] font-medium leading-[28px] text-[#282876]">Legal</h2>
					</div>
					{#each legalLinks as link}
						<a
							href={link.href}
							class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
						>
							{link.name}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Selected Blog Posts row -->
		<div class="flex flex-wrap items-start justify-between pb-10">
			<div class="grid w-full grid-cols-[1fr_1fr_1fr] gap-x-4 gap-y-[37px] max-md:grid-cols-[1fr_1fr] max-sm:flex max-sm:flex-col max-sm:flex-wrap">
				<!-- Column 1 -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px]">
						<h2 class="text-[18px] leading-[28px] text-transparent select-none">&nbsp;</h2>
					</div>
					<a
						href={blogPosts[0].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[0].name}
					</a>
					<a
						href={blogPosts[1].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[1].name}
					</a>
				</div>

				<!-- Column 2 (with heading) -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px] w-full">
						<h2 class="text-[18px] font-medium leading-[28px] text-[#282876]">Selected Blog Posts</h2>
					</div>
					<a
						href={blogPosts[2].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[2].name}
					</a>
					<a
						href={blogPosts[3].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[3].name}
					</a>
				</div>

				<!-- Column 3 -->
				<div class="flex flex-col items-start justify-start">
					<div class="mb-[25px]">
						<h2 class="text-[18px] leading-[28px] text-transparent select-none">&nbsp;</h2>
					</div>
					<a
						href={blogPosts[4].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[4].name}
					</a>
					<a
						href={blogPosts[5].href}
						class="mb-4 text-[16px] leading-[28px] text-[#8181ac] transition-colors duration-200 hover:text-[#282876]"
					>
						{blogPosts[5].name}
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-[80px] flex justify-between max-lg:flex-col max-lg:items-start max-sm:mt-[40px] max-sm:flex-col-reverse">
			<p class="text-[14px] leading-[28px] text-[#8181ac]">
				&copy; {new Date().getFullYear()} Dodonai. All rights reserved.
			</p>
		</div>
	</div>
</footer>
