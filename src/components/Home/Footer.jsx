import React from "react";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi"; // Importing the arrow icon from React Icons

const Footer = () => {
  return (
    <footer
      className="max-w-[1439px] mx-auto bg-white dark:bg-black text-dark-gray-1 dark:text-light-gray py-5"
    >
      {/* Desktop view */}
      <div className="hidden md:flex justify-between max-w-[1439px] px-[77px]">
        {/* Information and Company section */}
        <div className="grid grid-cols-2 gap-x-[77px] max-w-[474px]">
          <div className="flex flex-col space-y-4">
            {/* Information heading: Light mode - Bold 20px, Dark mode - Medium FFFFFF */}
            <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-medium text-[1.25rem] leading-[1.75rem] font-poppins">
              Information
            </h3>
            <ul className="space-y-2 text-dark-gray-1 dark:text-white font-poppins">
              {/* FAQ, Terms & Privacy, Cookies: Light mode - Medium 18px, Dark mode - Bold FFFFFF */}
              <li className="font-medium dark:font-bold text-[1.125rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                FAQ
              </li>
              <li className="font-medium dark:font-bold text-[1.125rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Terms & Privacy
              </li>
              <li className="font-medium dark:font-bold text-[1.125rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Cookies
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Company heading: Light mode - Bold 20px, Dark mode - Medium FFFFFF */}
            <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-medium text-[1.25rem] leading-[1.75rem] font-poppins">
              Company
            </h3>
            <ul className="space-y-2 text-dark-gray-1 dark:text-white font-poppins">
              {/* Contact Us, About Us: Light mode - Medium 18px, Dark mode - Bold FFFFFF */}
              <li className="font-medium dark:font-bold text-[1.125rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Contact Us
              </li>
              <li className="font-medium dark:font-bold text-[1.125rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                About Us
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center max-w-[167px] h-[47px]">
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaLinkedinIn className="text-black dark:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaFacebookF className="text-black dark:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaTwitter className="text-black dark:text-white" />
            </a>
          </div>
        </div>

        {/* Subscribe section next to Media Icons */}
        <div className="bg-light-gray dark:bg-dark-gray-3 p-6 max-w-[499px] rounded-lg flex flex-col justify-between">
          {/* Subscribe heading: Light mode - Bold 18px, Dark mode - Semi Bold FFFFFF */}
          <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-semibold text-[1.125rem] leading-[1.75rem] font-poppins">
            Subscribe
          </h3>
          <div className="relative max-w-[429px] h-[60px]">
            {/* Email address input: Light mode - 9D9EA1, Dark mode - FFFFFF */}
            <input
              type="email"
              className="w-full h-full pl-4 pr-[60px] border border-gray-1 dark:border-gray-2 focus:outline-none rounded-lg font-medium text-[1.125rem] text-gray-2 dark:text-white font-poppins"
              placeholder="Email address"
            />
            <button className="absolute top-1/2 transform -translate-y-1/2 right-[5px] w-[40px] h-[40px] rounded-full bg-primary-green dark:bg-light-green text-white flex items-center justify-center hover:bg-[#527a5d]">
              <HiArrowSmRight size={30} /> {/* React Icons arrow icon */}
            </button>
          </div>
          {/* Subscribe section text: Light mode - 4A505C, Dark mode - FFFFFF */}
          <p className="text-[0.75rem] text-dark-gray-2 dark:text-white leading-[1.275rem] max-w-[429px] font-poppins">
            Join our community of volunteers by subscribing to our newsletter.
            Stay informed about upcoming volunteer events, special projects.
          </p>
        </div>
      </div>

      {/* Divider and 2024 Volunteerium (for Normal and Dark Modes) */}
      <div className="hidden md:flex flex-col items-center max-w-[1439px] mx-auto mt-8">
        <div className="w-[1193.01px] border-t border-gray-2 opacity-100"></div>
        {/* 2024 Volunteerium text: Light mode - 000000, Dark mode - FFFFFF */}
        <p className="text-[1.125rem] text-black dark:text-white font-regular leading-[1.6875rem] text-center mt-4 font-poppins">
          © 2024 Volunteerium
        </p>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden max-w-[390px] mx-auto">
        {/* Subscribe Section */}
        <div className="bg-light-gray dark:bg-dark-gray-3 p-4 max-w-[319px] h-[182px] rounded-lg mx-auto">
          <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-semibold text-center text-[1.125rem] leading-[1.75rem] font-poppins">
            Subscribe
          </h3>
          <div className="relative max-w-[319px] h-[38px] mx-auto">
            <input
              type="email"
              className="w-full h-full pl-4 pr-[50px] border border-gray-1 dark:border-gray-2 focus:outline-none rounded-lg font-medium text-[0.875rem] text-gray-2 dark:text-white font-poppins"
              placeholder="Email address"
            />
            <button className="absolute top-1/2 transform -translate-y-1/2 right-[5px] w-[30px] h-[30px] rounded-full bg-primary-green dark:bg-light-green text-white flex items-center justify-center hover:bg-[#527a5d]">
              <HiArrowSmRight size={20} />
            </button>
          </div>
          <p className="text-[0.75rem] text-dark-gray-2 dark:text-white leading-[1.275rem] text-center mt-2 max-w-[319px] mx-auto font-poppins">
            Join our community of volunteers by subscribing to <br />
            our newsletter. Stay informed about upcoming <br />
            volunteer events, special projects.
          </p>
        </div>

        {/* Information and Company Section */}
        <div className="flex justify-between max-w-[276px] h-[127px] mx-auto mt-6">
          <div className="flex flex-col space-y-2">
            <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-medium text-[1.25rem] leading-[1.75rem] font-poppins">
              Information
            </h3>
            <ul className="space-y-1 text-dark-gray-1 dark:text-white font-poppins">
              <li className="font-medium dark:font-bold text-[0.75rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                FAQ
              </li>
              <li className="font-medium dark:font-bold text-[0.75rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Terms & Privacy
              </li>
              <li className="font-medium dark:font-bold text-[0.75rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Cookies
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-dark-gray-1 dark:text-white font-bold dark:font-medium text-[1.25rem] leading-[1.75rem] font-poppins">
              Company
            </h3>
            <ul className="space-y-1 text-dark-gray-1 dark:text-white font-poppins">
              <li className="font-medium dark:font-bold text-[0.75rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                Contact Us
              </li>
              <li className="font-medium dark:font-bold text-[0.75rem] text-black dark:text-white hover:underline hover:decoration-dark-gray-1">
                About Us
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center max-w-[135px] h-[35px] mx-auto mt-4">
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaLinkedinIn className="text-black dark:text-white" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaFacebookF className="text-black dark:text-white" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center border-2 border-gray-1 rounded-full hover:border-dark-gray-1"
            >
              <FaTwitter className="text-black dark:text-white" />
            </a>
          </div>
        </div>

        {/* Divider and 2024 Volunteerium (Mobile mode) */}
        <div className="flex flex-col items-center max-w-[319px] mx-auto mt-6">
          <div className="w-full border-t border-gray-2 opacity-100"></div>
          <p className="text-[0.875rem] text-black dark:text-white font-regular leading-[1.6875rem] text-center mt-4 font-poppins">
            © 2024 Volunteerium
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
