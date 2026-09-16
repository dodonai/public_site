<script>
	import { linkify } from '$lib/utils/linkify.js';
	let { text = '' } = $props();
</script>

{@html linkify(text)}
