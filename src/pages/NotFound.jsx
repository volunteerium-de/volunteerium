import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "/src/assets/not-found.png"; // Not Found image

const NotFound = () => {
  return (
    <div className="w-full min-h-screen dark:bg-black flex flex-col items-center justify-start border-4 rounded-[20px]">
      
      {/* Header Placeholder */}
      <div className="w-full" style={{ height: '8.73vh' }}>
        {/* Header section would go here */}
      </div>

      {/* 404 Not Found Image */}
      <div className="flex flex-col items-center justify-center relative" style={{ height: '58.2vh' }}>
        <img 
          src={notFoundImage} 
          alt="Not Found" 
          className="
            w-[100vw] 
            max-w-[1000px] 
            max-h-[58.2vh]
            h-auto 
            object-contain 
            md:w-[50vw] 
            lg:w-[70vw] 
            xl:w-[80vw] 
            2xl:w-[90vw]"
        />
        {/* Page Not Found Text */}
        <p 
          className="absolute text-[#69957B] dark:text-white font-medium text-[1.25rem] poppins"
          style={{ top: '85%', transform: 'translateY(-50%)', textAlign: 'center' }}
        >
          Page Not Found
        </p>
      </div>

      {/* Back to Homepage Button */}
      <div className="w-full flex justify-center mt-[1rem] md:mt-[2rem] xl:mt-[3rem]" style={{ height: '4.85vh' }}>
        <Link
          to="/"
          className="bg-[#69957B] text-white w-[58.2vw] max-w-[500px] h-[4.85vh] max-h-[59px] rounded-[6px] shadow-md hover:bg-[#4B6D59] transition duration-300 flex items-center justify-center text-[clamp(16px,3vw,22px)]"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
