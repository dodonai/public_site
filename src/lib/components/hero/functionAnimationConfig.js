export const functionAnimationConfig = {
	'intake-and-growth': {
		label: 'Intake & Growth',
		icon: 'inbox',
		before: [
			{ label: 'Missed leads', detail: 'Inbound sits untouched' },
			{ label: 'Manual triage', detail: 'Paralegal reads every email' },
			{ label: 'Slow follow-up', detail: 'Hot leads go cold' }
		],
		agents: [
			{ name: 'Intake Triage', status: 'Scoring inbound' },
			{ name: 'Conflict Check', status: 'Matter scan' },
			{ name: 'Fee Agreement Drafter', status: 'Retainer ready' }
		],
		after: [
			{ label: 'Lead response', value: 'Under 5 min' },
			{ label: 'Triage coverage', value: '100%' },
			{ label: 'Consults booked', value: 'Same day' }
		]
	},
	'deadlines-and-compliance': {
		label: 'Deadlines & Compliance',
		icon: 'calendar',
		before: [
			{ label: 'Scattered calendars', detail: 'practice management system, Outlook, spreadsheets' },
			{ label: 'Manual SOL math', detail: 'Per-jurisdiction rules' },
			{ label: 'Ethics tracking', detail: 'Done once a quarter' }
		],
		agents: [
			{ name: 'Docketing & Deadlines', status: 'Court calendar' },
			{ name: 'SOL Tracker', status: 'Per-matter limits' },
			{ name: 'Ethics Guardian', status: 'ABA Op. 512 log' }
		],
		after: [
			{ label: 'Deadlines caught', value: 'Every matter' },
			{ label: 'SOL miss risk', value: 'Zero' },
			{ label: 'Audit trail', value: 'Always on' }
		]
	},
	'client-communications': {
		label: 'Client Communications',
		icon: 'mail',
		before: [
			{ label: 'Status silence', detail: 'Client calls to ask' },
			{ label: 'Meeting prep', detail: 'Reassembled each time' },
			{ label: 'Post-settle confusion', detail: 'Disbursement unclear' }
		],
		agents: [
			{ name: 'Client Communications', status: 'Monthly letters' },
			{ name: 'Meeting Prep Brief', status: 'Pre-call packet' },
			{ name: 'Settlement Explainer', status: 'Gross-to-net' }
		],
		after: [
			{ label: 'Client touches', value: 'Monthly on time' },
			{ label: 'Meeting prep', value: 'Auto-assembled' },
			{ label: 'Settle questions', value: 'Answered in draft' }
		]
	},
	'operations-and-billing': {
		label: 'Operations & Billing',
		icon: 'billing',
		before: [
			{ label: 'Missing time', detail: 'Entered from memory' },
			{ label: 'Invoice QA', detail: 'Catches errors late' },
			{ label: 'Vendor chase', detail: 'Email tennis' }
		],
		agents: [
			{ name: 'Time Capture', status: 'From calendar + email' },
			{ name: 'Billing Reconciler', status: 'Pre-invoice QA' },
			{ name: 'Vendor Coordination', status: 'Scheduling + invoices' }
		],
		after: [
			{ label: 'Billable capture', value: '+15%' },
			{ label: 'Invoice errors', value: 'Caught pre-send' },
			{ label: 'Vendor SLAs', value: 'Tracked daily' }
		]
	},
	'practice-intelligence': {
		label: 'Practice Intelligence',
		icon: 'chart',
		before: [
			{ label: 'Quarterly reports', detail: 'Already stale' },
			{ label: 'Profit per matter', detail: 'Nobody knows' },
			{ label: 'Referral ROI', detail: 'Gut feel only' }
		],
		agents: [
			{ name: 'Practice Intelligence', status: 'Case health' },
			{ name: 'Matter Profitability', status: 'Realization rates' },
			{ name: 'Pipeline Forecasting', status: 'Lead to fee' }
		],
		after: [
			{ label: 'Book visibility', value: 'Live dashboard' },
			{ label: 'Unprofitable matters', value: 'Flagged early' },
			{ label: 'Forecast accuracy', value: 'Within 10%' }
		]
	},
	'casework-and-drafting': {
		label: 'Casework & Drafting',
		icon: 'docs',
		before: [
			{ label: 'Blank-page drafts', detail: 'From scratch every time' },
			{ label: 'Discovery grind', detail: 'Manual RFP / RFA' },
			{ label: 'Trial prep', detail: 'Reassembled every trial' }
		],
		agents: [
			{ name: 'Motion Drafter', status: 'First draft ready' },
			{ name: 'Discovery Builder', status: 'RFPs tuned' },
			{ name: 'Trial Prep', status: 'Notebook assembled' }
		],
		after: [
			{ label: 'First draft', value: 'Hours, not days' },
			{ label: 'Discovery turnaround', value: '3x faster' },
			{ label: 'Trial readiness', value: 'Week 1, not week 6' }
		]
	}
};
