export const practiceAreaAnimationConfig = {
	'personal-injury': {
		label: 'Personal Injury',
		icon: 'shield',
		matterTypes: ['Auto accident', 'Premises', 'Product liability', 'Workers comp'],
		agents: [
			{ name: 'Intake Triage', status: 'Scoring new leads' },
			{ name: 'Medical Records Requester', status: 'Chasing providers' },
			{ name: 'Demand Package', status: 'Assembling exhibits' }
		],
		outcomes: [
			{ label: 'SOL tracked', value: 'Every matter' },
			{ label: 'Demand ready', value: 'In 5 days' },
			{ label: 'Intake scored', value: '< 1 hour' }
		]
	},
	'family-law': {
		label: 'Family Law',
		icon: 'users',
		matterTypes: ['Divorce', 'Custody', 'Support', 'Adoption'],
		agents: [
			{ name: 'Conflict Check', status: 'Scanning prior matters' },
			{ name: 'Fee Agreement Drafter', status: 'Tuning retainer' },
			{ name: 'Client Communications', status: 'Monthly updates' }
		],
		outcomes: [
			{ label: 'Intake to retained', value: '48 hours' },
			{ label: 'Status letters', value: 'Auto monthly' },
			{ label: 'Court dates', value: 'All calendared' }
		]
	},
	'real-estate': {
		label: 'Real Estate',
		icon: 'folder',
		matterTypes: ['Purchase', 'Sale', 'Commercial lease', 'Title clearance'],
		agents: [
			{ name: 'Filing Readiness', status: 'Pre-flight checks' },
			{ name: 'Docketing & Deadlines', status: 'Closing milestones' },
			{ name: 'Closing Binder', status: 'Assembling file' }
		],
		outcomes: [
			{ label: 'Close on time', value: '97%' },
			{ label: 'Missed filings', value: 'Zero' },
			{ label: 'Binder ready', value: 'Day of close' }
		]
	},
	tax: {
		label: 'Tax',
		icon: 'chart',
		matterTypes: ['IRS dispute', 'Audit defense', 'Offer in compromise', 'Tax planning'],
		agents: [
			{ name: 'SOL Tracker', status: 'Tracking limitations' },
			{ name: 'Docketing & Deadlines', status: 'Response dates' },
			{ name: 'Discovery Builder', status: 'Drafting RFPs' }
		],
		outcomes: [
			{ label: 'Deadlines caught', value: 'Every matter' },
			{ label: 'Response drafts', value: 'Ready in 3 days' },
			{ label: 'Client updates', value: 'Monthly on time' }
		]
	},
	immigration: {
		label: 'Immigration',
		icon: 'mail',
		matterTypes: ['Asylum', 'Family petition', 'Employment visa', 'Naturalization'],
		agents: [
			{ name: 'Bilingual Translator', status: 'Translating drafts' },
			{ name: 'Court Date Reminders', status: 'Hearing SMS' },
			{ name: 'Client Communications', status: 'Status letters' }
		],
		outcomes: [
			{ label: 'Filings on time', value: '100%' },
			{ label: 'Translated to', value: 'ES / ZH / VI' },
			{ label: 'Client touches', value: 'Monthly' }
		]
	},
	'estates-probate': {
		label: 'Estates & Probate',
		icon: 'docs',
		matterTypes: ['Will drafting', 'Trust administration', 'Probate filing', 'Estate litigation'],
		agents: [
			{ name: 'Docketing & Deadlines', status: 'Probate milestones' },
			{ name: 'Pleading Drafter', status: 'Petitions ready' },
			{ name: 'Closing Binder', status: 'Final distribution' }
		],
		outcomes: [
			{ label: 'Petitions drafted', value: 'Within 48h' },
			{ label: 'Deadlines held', value: 'All matters' },
			{ label: 'Binder complete', value: 'At close' }
		]
	},
	'cybersecurity-privacy': {
		label: 'Cybersecurity & Privacy',
		icon: 'shield',
		matterTypes: ['Breach response', 'Privacy audit', 'Vendor review', 'Regulator filing'],
		agents: [
			{ name: 'Ethics Guardian', status: 'Audit trail' },
			{ name: 'Court Rules Monitor', status: 'Rule changes' },
			{ name: 'Discovery Response', status: 'Privilege log' }
		],
		outcomes: [
			{ label: 'Notification SLAs', value: 'Tracked' },
			{ label: 'Audit trail', value: 'Every action' },
			{ label: 'Rule updates', value: 'Within 24h' }
		]
	}
};
