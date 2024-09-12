import signUpImg from '../assets/login-img.png'

function Register() {
  return (
    <div className="flex w-full h-full min-h-screen">
      
      <div className="w-[40%] m-1 bg-primary-green overflow-hidden rounded-lg relative">
  <img src={signUpImg} alt="" className='opacity-30 h-screen w-full object-cover'/>
  
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div className=''>
    <p className="text-white text-3xl font-bold">Join Our <br /> <span className='text-5xl'> Community</span> </p>
    <p className="text-white mt-4 text-lg">
    Become a part of something <b>bigger</b>. <br />
    Create an account and start making a <b>difference</b>.  <br />
    <b>We can not wait to have you with us!</b>
    </p>
    </div>
  </div>
</div>

      {/* Sağ taraf form */}
      <div className="w-[60%] flex flex-col justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">Create Your Account</h1>

        <p className=''>
        You’re creating an account as?
        </p>

        {/* Radio buttons */}
        <div className="mb-6 flex items-center gap-20">
          <div className="flex items-center border border-dark-gray-1 rounded-lg p-3">
            <input type="radio" id="individual" name="accountType" className=''/>
            <label htmlFor="individual" className="ml-2">As an Individual</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="organisation" name="accountType" />
            <label htmlFor="organisation" className="ml-2">As an Organisation</label>
          </div>
        </div>

        {/* Input fields */}
        <form className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" id="fullName" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" id="email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Create Account button */}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
        </p>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Google sign-in button */}
        <button className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10h-7v-9l-7 9H3v10l7-9h7V10z" />
          </svg>
          Continue with Google
        </button>

        {/* Terms and Privacy */}
        <p className="mt-4 text-sm text-gray-600">
          By continuing, you agree to the Terms of Service and acknowledge you’ve read our Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Register;
