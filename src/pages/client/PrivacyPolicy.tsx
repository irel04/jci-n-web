
const PrivacyPolicy = () => {
	return (
		<main className="w-full">
			{/* Header Section */}
			<section className="flex flex-col sm:max-w-md lg:max-w-2xl gap-4">
				<h1 className="font-bold text-2xl lg:text-4xl">Privacy Policy</h1>
				<div className="text-sm md:text-base flex flex-col gap-2">
					<p>Last Updated: March 31, 2025</p>
					<p>Welcome to <span className="font-bold">Enhancing Garbage Waste Collection: A Mobile Integration Solar Powered System</span>. This Privacy Policy explains how we collect, use, and protect your personal information while using our system.</p>
				</div>
			</section>

			{/* Full privacy policy description */}
			<section className="text-sm md:text-base flex flex-col gap-4 mt-8">
				<div>
					<p className="text-lg font-bold">1. Information We Collect</p>
					<ul className="mt-2 flex flex-col">
						<li>1.1. We collect data related to waste collection, user activity, and location.</li>
						<li>1.2. Personal information such as name, email, or contact details may be collected for system functionality.</li>
						<li>1.3. Anonymous usage data may be gathered for research and improvement purposes.</li>
					</ul>
				</div>
				<div>
					<p className="text-lg font-bold">2. How We Use Your Information</p>
					<ul className="mt-2 flex flex-col">
						<li>2.1. To enhance system performance and user experience.</li>
						<li>2.2. To analyze waste collection efficiency and optimize routes.</li>
						<li>2.3. To communicate updates or service-related information.</li>
					</ul>
				</div>
				<div>
					<p className="text-lg font-bold">3. Data Security</p>
					<ul className="mt-2 flex flex-col">
						<li>3.1. We implement industry-standard security measures to protect user data.</li>
						<li>3.2. Personal data is not shared with third parties without user consent, except as required by law.</li>
						<li>3.3. While we strive for security, we cannot guarantee absolute protection against unauthorized access.</li>
					</ul>
				</div>
				<div>
					<p className="text-lg font-bold">4. Data Retention</p>
					<ul className="mt-2 flex flex-col">
						<li>4.1. Data is retained for as long as necessary to fulfill the system’s research objectives.</li>
						<li>4.2. Users may request data deletion by contacting the service provider.</li>
					</ul>
				</div>
				<div>
					<p className="text-lg font-bold">5. Third-Party Services</p>
					<ul className="mt-2 flex flex-col">
						<li>5.1. The system may use third-party services for analytics and system optimization.</li>
						<li>5.2. Third-party services are bound by their own privacy policies.</li>
					</ul>
				</div>
				<div>
					<p className="text-lg font-bold">6. Research Disclaimer</p>
					<p className="mt-2">This system is developed for research and academic purposes only. Data collected will be used to improve waste collection solutions and is not intended for commercial use.</p>
				</div>
				<div>
					<p className="text-lg font-bold">7. Changes to This Policy</p>
					<p className="mt-2">We may update this Privacy Policy periodically. Continued use of the system signifies acceptance of any updates.</p>
				</div>
				<div>
					<p className="text-lg font-bold">8. Contact Information</p>
					<p className="mt-2">For any questions regarding this Privacy Policy, please contact us at kianirel56@gmail.com.</p>
				</div>
			</section>
		</main>
	)
}

export default PrivacyPolicy;
