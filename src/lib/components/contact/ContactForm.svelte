<script>
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');

	let loading = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate() {
		if (!name.trim()) return 'Name is required.';
		if (!email.trim()) return 'Email is required.';
		if (!emailRegex.test(email)) return 'Please enter a valid email address.';
		if (!message.trim()) return 'Message is required.';
		return null;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		successMessage = '';
		errorMessage = '';

		const validationError = validate();
		if (validationError) {
			errorMessage = validationError;
			return;
		}

		loading = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					company: company.trim(),
					message: message.trim()
				})
			});

			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data.message || 'Something went wrong. Please try again.');
			}

			successMessage = 'Thank you! Your message has been sent. We will be in touch shortly.';
			name = '';
			email = '';
			company = '';
			message = '';
		} catch (err) {
			errorMessage = err.message || 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<section id="contact" class="bg-base-100 py-20 sm:py-28">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-neutral sm:text-4xl">
				Get in Touch
			</h2>
			<p class="mt-4 text-lg text-neutral/60">
				Have questions? We would love to hear from you. Send us a message and we will
				respond as soon as possible.
			</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-6" novalidate>
			<div class="form-control w-full">
				<label for="contact-name" class="label">
					<span class="label-text font-medium">
						Name <span class="text-error">*</span>
					</span>
				</label>
				<input
					id="contact-name"
					type="text"
					bind:value={name}
					placeholder="Your full name"
					class="input input-bordered w-full"
					required
				/>
			</div>

			<div class="form-control w-full">
				<label for="contact-email" class="label">
					<span class="label-text font-medium">
						Email <span class="text-error">*</span>
					</span>
				</label>
				<input
					id="contact-email"
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					class="input input-bordered w-full"
					required
				/>
			</div>

			<div class="form-control w-full">
				<label for="contact-company" class="label">
					<span class="label-text font-medium">Company</span>
				</label>
				<input
					id="contact-company"
					type="text"
					bind:value={company}
					placeholder="Your company or firm"
					class="input input-bordered w-full"
				/>
			</div>

			<div class="form-control w-full">
				<label for="contact-message" class="label">
					<span class="label-text font-medium">
						Message <span class="text-error">*</span>
					</span>
				</label>
				<textarea
					id="contact-message"
					bind:value={message}
					placeholder="How can we help you?"
					rows="5"
					class="textarea textarea-bordered w-full"
					required
				></textarea>
			</div>

			{#if errorMessage}
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 flex-shrink-0"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>{errorMessage}</span>
				</div>
			{/if}

			{#if successMessage}
				<div class="alert alert-success">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 flex-shrink-0"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>{successMessage}</span>
				</div>
			{/if}

			<button
				type="submit"
				class="btn btn-primary btn-block text-white"
				disabled={loading}
			>
				{#if loading}
					<span class="loading loading-spinner loading-sm"></span>
					Sending...
				{:else}
					Send Message
				{/if}
			</button>
		</form>
	</div>
</section>
