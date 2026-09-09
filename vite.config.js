import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { approvedDesigns } from './scripts/approved-designs.js';

export default defineConfig({
	plugins: [approvedDesigns(), sveltekit()]
});
