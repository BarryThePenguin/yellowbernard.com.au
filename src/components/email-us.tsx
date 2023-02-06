import ky from 'ky-universal';
import useForm from '../use-form';

const validationMessages = {
	name: {valueMissing: 'Please enter your name'},
	email: {valueMissing: 'Please enter your email'},
	phone: {valueMissing: 'Please enter your phone number'},
	message: {valueMissing: 'Please enter your message'},
};

export function EmailUsForm() {
	const {formState, handleSubmit, handleBlur} = useForm({
		validationMessages,
		async onSubmit(data: FormData) {
			const json = Object.fromEntries(data.entries());
			return ky.post('/api/email-us', {json});
		},
	});

	return (
		<div className="relative">
			<div className="text-center rounded-sm p-8 my-8">
				{formState.isSubmitSuccessful ? (
					<>
						<h2 className="prose prose-xl">Thanks!</h2>
						<h3 className="prose">We&apos;ll get back to you soon... ☕️</h3>
					</>
				) : (
					<form
						noValidate
						className="flex flex-col justify-center items-center max-w-sm mx-auto space-y-3"
						onBlur={handleBlur}
						onSubmit={handleSubmit}
					>
						<div className="flex flex-grow justify-center flex-wrap space-y-3 prose prose-sm">
							<label className="w-full">
								<span className="sr-only">Your name</span>
								<input
									required
									autoComplete="false"
									className="w-full appearance-none rounded transition-colors duration-150 ease-linear py-2 px-4 md:py-3 md:px-5 text-gray-800 placeholder-gray-500 placeholder-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
									name="name"
									placeholder="name"
									type="text"
								/>
							</label>
							<label className="w-full">
								<span className="sr-only">Your email address</span>
								<input
									required
									autoComplete="false"
									className="w-full appearance-none rounded transition-colors duration-150 ease-linear py-2 px-4 md:py-3 md:px-5 text-gray-800 placeholder-gray-500 placeholder-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
									name="email"
									placeholder="email"
									type="email"
								/>
							</label>
							<label className="w-full">
								<span className="sr-only">Your phone</span>
								<input
									required
									autoComplete="false"
									className="w-full appearance-none rounded transition-colors duration-150 ease-linear py-2 px-4 md:py-3 md:px-5 text-gray-800 placeholder-gray-500 placeholder-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
									name="phone"
									placeholder="phone"
									type="text"
								/>
							</label>
							<label className="w-full">
								<span className="sr-only">Your message</span>
								<textarea
									required
									autoComplete="false"
									className="w-full appearance-none rounded transition-colors duration-150 ease-linear py-2 px-4 md:py-3 md:px-5 text-gray-800 placeholder-gray-500 placeholder-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
									name="message"
									placeholder="message"
								/>
							</label>
							<button
								disabled={formState.isSubmitSuccessful}
								className="w-full inline-flex justify-center items-center relative py-2 px-5 md:py-3 md:px-6 rounded transition-colors duration-150 ease-linear bg-secondary hover:bg-primary hover:text-secondary focus:outline-none focus:ring focus:border-blue-300"
								type="submit"
							>
								{formState.isSubmitting ? 'Sending...' : 'Send'}
							</button>
						</div>
						{formState.isSubmitted && (
							<div className="prose prose-sm">
								<strong>Great!</strong> Check your inbox and click the link to
								confirm your subscription.
							</div>
						)}
						{!formState.isValid && (
							<div className="prose prose-sm text-primary">
								{formState.message}
							</div>
						)}
					</form>
				)}
			</div>
		</div>
	);
}

function EmailUs() {
	return (
		<div
			id="email-us"
			className="email-us__overlay"
			aria-modal="true"
			role="dialog"
		>
			<div className="fixed inset-0 transition-opacity">
				<a
					className="absolute cursor-default inset-0 bg-black bg-opacity-80"
					href="#"
					aria-label="Close"
				/>
			</div>

			<a className="email-us__close-button" href="#" aria-label="Close" />

			<EmailUsForm />
		</div>
	);
}

export default EmailUs;
