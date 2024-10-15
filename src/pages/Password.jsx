// src/pages/Password.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/Password/Forgot/ForgotPassword';
import Verification from '../components/Password/Verification/Verification';
import ResetPassword from '../components/Password/Reset/ResetPassword';
import Header from '../components/Header/Header';

const Password = () => {
  // State to track the current page/tab
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(searchParams.get('tab') || 'forgot-password');

  // Effect to update tab state and URL whenever tab changes
  useEffect(() => {
    setSearchParams({ tab });
  }, [tab, setSearchParams]);

  // Function to handle page transitions
  const handlePageChange = (page) => {
    setTab(page);
  };

  // Render the correct component based on the current tab value
  const renderContent = () => {
    switch (tab) {
      case 'forgot-password':
        return <ForgotPassword onSubmit={() => handlePageChange('verification')} />; 
      // case 'verification':
      //   return <Verification onSubmit={() => handlePageChange('reset-password')} />;
      // case 'reset-password':
      //   return <ResetPassword onReset={() => navigate('/login')} />;
      // default:
        // return <ForgotPassword onSubmit={() => handlePageChange('verification')} />;
    }
  };

  return (
    <div>
      {/* Header Component */}
      <Header />
     
      {/* Main Container */}
      <div className="flex flex-col mx-auto font-poppins bg-white dark:bg-black min-h-screen">
        <div className="flex flex-col w-[95%] max-w-[1200px] mx-auto mt-1 md:mt-2">
          {/* Render the corresponding content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Password;
