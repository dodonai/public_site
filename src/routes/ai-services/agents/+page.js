export async function load() {
	const agentModules = import.meta.glob(
		'/src/lib/data/services/ai-services/agents/*.json',
		{ eager: true }
	);
	const agents = Object.values(agentModules)
		.map((m) => m.default)
		.sort((a, b) => {
			if (a.tier === b.tier) return a.title.localeCompare(b.title);
			return a.tier === 'flagship' ? -1 : 1;
		});

	return { agents };
}
