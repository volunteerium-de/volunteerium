import React from "react"
import sectionPhoto from "../../assets/get-to-know-us.png"
const GetToKnowUs = () => {
  return (
    <section className="max-w-[1440px] mx-auto p-10 bg-[#4B6D59] font-['Poppins']">
      {/* Section Title */}
      <h2 className="text-center text-[4rem] font-semibold text-white mb-6">Get to Know Us</h2>
      {/* Content Container */}
      <div className=" flex flex-wrap justify-center max-w-[1360px] mx-auto gap-12 ">
        {/* Left side - Paragraph */}
        <div className="min-[600px]:basis-[500px] min-[600px]:shrink-0">
          <p className="text-center min-[1100px]:text-right text-white text-[1.25rem] leading-relaxed ">
            At Volunterium, our goal is to connect those who want to volunteer with those in need of
            support.
            <br />
            <br />
            We are a platform dedicated to making it easy for individuals to find meaningful
            volunteer opportunities and for organizations to connect with passionate, eager
            volunteers.
            <br />
            <br />
            Whether it's helping local communities, supporting social causes, or making a global
            impact, we believe that everyone can make a difference.
          </p>
        </div>
        {/* Right side - Image */}
        <img
          src={sectionPhoto}
          alt="Get to know us"
          className="object-cover rounded-lg shadow-lg "
        />
      </div>
    </section>
  )
}
export default GetToKnowUs
