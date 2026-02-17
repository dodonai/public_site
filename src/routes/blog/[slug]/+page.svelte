<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';

	let { data } = $props();
</script>

{#if data.content}
	{@const Content = data.content}
	<Content />
{/if}

{#if data.relatedPosts.length > 0}
	<section class="border-t border-[#e5e5e5] bg-white">
		<div class="mx-auto w-[85%] max-w-[1250px] py-16 sm:py-20">
			<h2
				class="mb-10 text-center text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl"
			>
				Related Posts
			</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each data.relatedPosts as post}
					<BlogCard {...post} />
				{/each}
			</div>
		</div>
	</section>
{/if}
