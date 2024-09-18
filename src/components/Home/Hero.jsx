import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <div className="relative font-poppins">
      <div className="relative w-full h-[225px] sm:h-[425px]">
        <img
          className=" w-full h-full object-cover"
          src="/src/assets//home-hero-bg.png"
          alt="Homepage hero background image"
        />
      </div>
      <div className="absolute inset-0 bottom-20 sm:bottom-28 flex items-center justify-center">
        <h2 className="relative text-white text-2xl sm:text-4xl transform -translate-y-16">
          Become a part of something
          <span className="absolute font-bad-script top-6 sm:top-8 -right-4 sm:-right-5 bad-script-regular text-[30px] sm:text-[48px]">
            bigger
          </span>
        </h2>
      </div>
      <SearchBar />
    </div>
  )
}

export default Hero
