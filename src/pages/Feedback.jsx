// src/pages/Feedback.jsx

import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import feedbackImg from '../assets/login-img.png';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import logo from '../assets/logo.png';
import Header from '../components/Header/Header';

const Feedback = () => {
  const navigate = useNavigate();

  return (
  <div>
     {/* Header Component */}
     <div>
        <Header />
      </div>
    <div className="flex flex-col mx-auto font-poppins bg-white dark:bg-black min-h-screen">
     
      {/* Main Container Wrapping the Image and Form Areas */}
      <div className="flex flex-col w-[95%] max-w-[1200px] mx-auto mt-4 md:mt-6">
        
        {/* Inner Container for Left Image and Right Form */}
        <div className="flex flex-col md:flex-row w-full justify-center items-stretch md:space-y-0 space-y-6 md:space-x-6 h-full md:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-200px)]">
          
          {/* Left Side Image Container */}
          <div className="hidden md:block w-full md:max-w-[45%] lg:max-w-[50%] overflow-hidden rounded-t-lg rounded-b-lg h-[calc(100vh-120px)]">
            <div
              className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative"
              style={{
                backgroundImage: `url(${feedbackImg})`,
                backgroundBlendMode: 'overlay',
              }}
            >
              <div className="h-full w-full flex flex-col justify-center px-5 md:px-0 bg-primary-green bg-opacity-60 dark:bg-opacity-70 rounded-t-lg">
                <div className='absolute top-0 left-0 w-full h-full bg-primary-green dark:bg-gray-800 opacity-[0.4] rounded-t-lg' />
                <div className="relative text-left ps-6 lg:px-8">
                  <p className="text-white text-[1.6rem] md:text-[2.2rem] lg:text-[2.4rem] leading-8 font-semibold">
                    Your Feedback <br />
                    <span className="text-[1.8rem] md:text-[2.4rem] lg:text-[2.8rem] leading-tight">Matters to Us!</span>
                  </p>
                  <p className="text-white mt-4 text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-normal">
                    Continue contributing to our community by sharing your <b>feedback</b>.<br />
                    <span className='text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]'>
                      Help us make a difference with your <b>ideas</b> and <b>suggestions</b>.
                    </span>
                    <br /><br />
                    <b>Thank you for being with us!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form Container */}
          <div className="flex-grow flex flex-col justify-start px-4 md:px-6 w-full lg:max-w-[45%] xl:max-w-[40%] bg-white dark:bg-gray-900 rounded-lg h-full">
            
            {/* ArrowBack Icon and Logo for Mobile Design */}
            <div className="md:hidden flex flex-col items-center mb-6 lg:min-h-[calc(100vh-200px)]">
              <IoIosArrowBack 
                className="text-black dark:text-white text-3xl cursor-pointer self-start" 
                onClick={() => navigate(-1)}
              />
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Form Title */}
            <div className="flex justify-center md:justify-start">
              <h1 className="text-black dark:text-white text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-center md:text-left font-semibold mb-4">
                Feedback
              </h1>
            </div>

            {/* Feedback Form Component */}
            <div className="flex-grow">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Feedback;
