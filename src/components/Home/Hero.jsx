import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative poppins-regular">
      <div className="relative w-full h-[225px] sm:h-[425px]">
        <img
          className=" w-full h-full object-cover"
          src="/src/assets//home-hero-bg.png"
          alt="Homepage hero background image"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="relative text-white text-2xl sm:text-3xl transform -translate-y-16">
          Become a part of something
          <span className="absolute top-8 -right-5 bad-script-regular">
            bigger
          </span>
        </h2>
      </div>
      <SearchBar />
    </div>
  );
};

export default Hero;
