import { HiArrowSmRight } from "react-icons/hi"

const Subscribe = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-light-green rounded-md shadow-md w-[80%] mx-auto">
      <h3 className="text-xl font-bold mb-2 text-dark-gray-3">Subscribe</h3>
      <p className="text-dark-gray-1 mb-4 text-center">
        Join our community of volunteers by subscribing to our newsletter. Stay informed about
        upcoming volunteer events, special projects.
      </p>
      <div className="relative w-full">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 pr-12 border border-gray-1 rounded-lg w-full focus:outline-none"
        />
        <button className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-primary-green text-white rounded-full">
          <HiArrowSmRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default Subscribe
