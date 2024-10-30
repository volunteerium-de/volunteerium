import React from 'react';
import Header from "../components/Header/Header";
import logo from "../assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <div className="font-poppins bg-white dark:bg-black text-gray-2 dark:text-light-gray min-h-screen">
      {/* Header component at the top of the page */}
      <Header />

      {/* Main content container with a green border and fixed background logo */}
      <div
        className="mt-4 border-8 border-primary-green max-w-[48rem] mx-auto p-8 relative overflow-hidden "
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: '18.75rem', // 300px = 18.75rem
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
          
        }}
      >
        {/* Scrollable content area above the background logo */}
        <div className="relative max-h-[31.25rem] md:max-h-[37.5rem] overflow-y-auto p-4 bg-white bg-opacity-10 dark:bg-dark-gray">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-dark-gray-3 dark:text-light-gray mt-2"><strong>Effective Date:</strong> [Insert Date]</p>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-4">
            Thank you for using Volunteerium, a platform designed to connect event organizers with volunteers. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share your personal data when you use our platform. By using Volunteerium, you agree to the practices outlined in this policy.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">1. Information We Collect</h2>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-2">
            We collect the following types of information when you use Volunteerium:
            <br />
            <strong>Personal Information:</strong> This includes your name, email address, phone number, profile photo, and any other details you provide when creating an account.
            <br />
            <strong>Event Information:</strong> If you are an event organizer, we collect details about the events you create, including event descriptions, dates, and locations.
            <br />
            <strong>Activity Data:</strong> We gather data related to your activities on the platform, such as the events you sign up for or create, messages exchanged, and feedback given.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 mt-2 text-base md:text-lg text-dark-gray-1 dark:text-light-gray">
            <li>Facilitate connections between event organizers and volunteers.</li>
            <li>Provide and improve our services.</li>
            <li>Send you notifications about events, updates, and opportunities.</li>
            <li>Ensure the security and integrity of our platform.</li>
            <li>Analyze usage to enhance the user experience.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">3. Sharing Your Information</h2>
          <ul className="list-disc pl-5 mt-2 text-base md:text-lg text-dark-gray-1 dark:text-light-gray">
            <li><strong>With Event Organizers:</strong> If you are a volunteer, your basic information (e.g., name, email) will be shared with the event organizers of the events you sign up for.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information to comply with legal requirements or protect our rights.</li>
            <li><strong>Service Providers:</strong> We may share information with third-party service providers who help us operate the platform (e.g., hosting services).</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">4. Data Retention</h2>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-2">
            We retain your information as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. If you delete your account, we will remove your personal data from our active systems, but some data may be retained for legal or operational reasons.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">5. Security of Your Information</h2>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-2">
            We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">6. Your Rights</h2>
          <ul className="list-disc pl-5 mt-2 text-base md:text-lg text-dark-gray-1 dark:text-light-gray">
            <li><strong>Access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> You can update or correct your information at any time through your account settings.</li>
            <li><strong>Deletion:</strong> You can request the deletion of your personal data, subject to any legal obligations we may have to retain it.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">7. Changes to This Policy</h2>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-2">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-dark-gray-3 dark:text-light-gray">8. Contact Us</h2>
          <p className="text-base md:text-lg text-dark-gray-1 dark:text-light-gray mt-2">
            If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:
            <br />
            <strong>Volunteerium Team</strong>
            <br />
            Email: [info.volunteerium@gmail.com]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
