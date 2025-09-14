export default function Terms() {
  return (
    <main className="bg-white dark:bg-neutral-950">
      {/* Hero / Title Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-blue-100/50 to-blue-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border-b border-blue-100 dark:border-neutral-800">
        <div className="container max-w-7xl mx-auto py-20 md:py-28 px-6 md:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-blue-800 dark:text-blue-300 mb-6">
            Terms & Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read these terms carefully. By accessing or using this website,
            you agree to be bound by the terms and conditions stated below.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6 md:px-12 prose prose-neutral dark:prose-invert prose-lg">
          
          <p>
            Welcome to our website. <strong>Ritvl.com</strong> is an online service
            operated and managed by Ritvl & Co. If you continue to browse and use{" "}
            <strong>Ritvl.com</strong> you are agreeing to comply with and be
            bound by the following terms and conditions of the agreement listed
            below (the <em>“User Agreement”</em>), which may be revised from time to
            time. You understand and agree that you are bound by such terms for as
            long as you access this Website.
          </p>

          <p>
            If you have any queries about this User Agreement, please contact us at{" "}
            <a href="mailto:Support@ritvl.com">Support@ritvl.com</a> or{" "}
            <a href="tel:+917026252325">+91 7026252325</a>. We reserve the right to
            change the terms without obligation to inform you. It is your
            responsibility to review them periodically.
          </p>

          <p>
            Modification of the materials or use of the materials on this Website,
            for any purpose other than personal use, is a violation of Ritvl’s
            copyright and proprietary rights. All design rights, databases,
            compilations, and intellectual property rights (registered or
            unregistered) remain the property of Ritvl & Co.
          </p>

          <hr className="my-12 border-neutral-200 dark:border-neutral-700" />

          <h2>User Login Details</h2>
          <p>
            If you register for an account with our website, you will be asked to
            choose a user ID and password.
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Your user ID must not mislead or impersonate another person.</li>
            <li>
              You must keep your password confidential and notify us immediately if
              you suspect a breach. You are responsible for all activities under
              your account.
            </li>
          </ol>

          <h2>Registration & Accounts</h2>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              You may register by completing and submitting the registration form.
            </li>
            <li>You must not allow others to use your account.</li>
            <li>
              Notify us immediately if you become aware of unauthorized account
              use.
            </li>
            <li>
              You must not use another person’s account without their express
              permission.
            </li>
          </ol>

          <h2>Cancellation & Suspension of Account</h2>
          <p>We may, at our sole discretion:</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Suspend your account;</li>
            <li>Cancel your account;</li>
            <li>Edit your account details without prior notice or explanation.</li>
          </ol>

          <h2>Breaches of These Terms</h2>
          <p>
            If you breach these terms in any way, we may take action including but
            not limited to:
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Temporary suspension of your access;</li>
            <li>Permanently prohibiting you from accessing the website;</li>
            <li>Deleting your account;</li>
            <li>Blocking your IP address;</li>
            <li>
              Contacting your Internet service provider to block access;
            </li>
            <li>Initiating legal proceedings.</li>
          </ol>

          <hr className="my-12 border-neutral-200 dark:border-neutral-700" />

          <p>
            These terms, together with our{" "}
            <a href="/privacy">Privacy Policy</a> and{" "}
            <a href="/cookies">Cookies Policy</a>, constitute the entire agreement
            between you and us in relation to your use of this website, and
            supersede all prior agreements.
          </p>
        </div>
      </section>
    </main>
  );
}
