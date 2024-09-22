import { IoIosArrowBack } from 'react-icons/io';
import signUpImg from '../assets/login-img.png';
import RegisterForm from '../components/Register/RegisterForm';
import logo from '../assets/logo.png';

const Register = () => {


  // const register = async (userInfo) => {
  //   try {
  //     const { data } = await axios.post(
  //       `www.volunteerium.de/register`,
  //       userInfo
  //     );
  //   } catch (error) {
  //     console.error("Register failed", error);
  //   }
  // };

  return (
    <div className="flex flex-col max-w-[1440px] mx-auto font-poppins">

      {/* Header component */}
      
      {/* Main Div */}
      <div className="flex flex-col md:flex-row max-w-[1440px] justify-center">

        {/* Left side */}
        <div className="hidden md:block max-w-full md:max-w-[608px] mx-2 md:mx-4 lg:mx-8 mb-8 w-full bg-primary-green overflow-hidden rounded-lg h-[calc(100vh-150px)]">
  <div 
    className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative" 
    style={{
      backgroundImage: `url(${signUpImg})`,
      backgroundBlendMode: 'overlay',
    }}
  >
    <div className="h-full w-full flex flex-col justify-center px-5 md:px-0 bg-primary-green bg-opacity-60">
      <div className='absolute top-0 left-0 w-full h-full bg-primary-green opacity-[0.4]' />
      <div className="relative text-left ps-6 lg:px-8">
        <p className="text-white text-[2rem] lg:text-[3rem] leading-8 font-semibold">
          Join Our <br />
          <span className="text-[3rem] lg:text-[4.125rem] md:leading-none">Community</span>
        </p>
        <p className="text-white mt-4 text-[1rem] lg:text-[1.125rem] font-normal">
          Become a part of something <b>bigger</b>.<br />
          <span className='text-[0.8rem] lg:text-[1rem]'>
            Create an account and start <b>making a difference</b>.<br /><br />
          </span>
          <b>We cannot wait to have you with us!</b>
        </p>
      </div>
    </div>
  </div>
</div>


        {/* Right Side */}
        <div className="flex-grow flex flex-col justify-start p-4 md:p-8 w-full">
          {/* ArrowBack Icon and Logo for Mobile Design */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <IoIosArrowBack className="text-black text-3xl cursor-pointer self-start" />
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <div className="flex-grow">
            <h1 className="text-black text-[1.75rem] text-center md:text-left md:text-[2rem] font-semibold mb-6">Create Your Account</h1>
            <p className="text-gray-2 text-[1rem] mb-2">You’re creating an account as?</p>

            {/* RegisterForm Component */}
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
