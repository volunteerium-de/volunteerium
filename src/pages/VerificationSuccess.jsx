// import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const VerificationSuccess = () => {


    const [userType, setUserType] = useState('');


useEffect(() => {
    // Get the userType of the registered user.
    // You can get this from an API call or from localStorage.
    // Example: setUserType('individual') or setUserType('organization')
    const fetchedUserType = 'organization';
    setUserType(fetchedUserType);
  }, []);

  const getUserTypeLink = () => {
    if (userType === 'individual') {
      return '/register/email-verify/success/indv-setup';
    } else if (userType === 'organization') {
      return '/register/email-verify/success/org-setup';
    } else {
      return '/'; // If userType is not specified or there is an error, we can redirect to the home page.
    }
  };


    return (
        <div className="h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="text-center max-w-xl mx-auto px-8 py-8 rounded-lg">
        <h1 className="text-[1.75rem] font-bold  dark:text-white mb-6">
          Hey Julia, you&apos;re verified! 🎉
        </h1>
        <p className="text-primary-green font-semibold mb-4">
          We&apos;re thrilled to have you with us!
        </p>
        <p className="hidden md:block text-dark-gray-1 dark:text-white mb-6">
          By joining our community, you&apos;re already <span className="text-primary-green font-semibold">making a difference</span>.
        </p>
        <p className="text-dark-gray-1 dark:text-white mb-8">
          Before we start, we&apos;d like to know a bit more about you.
        </p>
        <Link to={getUserTypeLink()} className="px-14 py-2 bg-primary-green text-white rounded-md hover:bg-dark-green transition-colors">
          Let&apos;s Start!
        </Link>
      </div>
    </div>
  );
}
export default VerificationSuccess