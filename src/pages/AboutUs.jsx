import React from "react"
import backgroundImage from "../assets/about-hero-bg.png"
import eventsImage from "../assets/about-events.png"
import handshakeImage from "../assets/about-handshake.png"
import Header from "../components/Header/Header"

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="h-auto">
        <main className="font-['Poppins']">
          {/* About Hero Area */}
          <section>
            <div>
              <div
                className="bg-center bg-cover w-full min-h-[368px] block mx-auto"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                {/* About Us Area */}
                <div className="min-h-[368px] mx-auto backdrop-blur">
                  <h1 className="text-[2.25rem]  text-white text-center ">About Us</h1>
                  <p className="max-w-[830px] mt-[59px] mb-[120px] text-[1.5rem] leading-[1.125] text-white text-center mx-auto">
                    We bring people together to volunteer, support, and build strong communities, so
                    they can create a positive impact and lead fulfilling lives.
                  </p>
                </div>
              </div>
              {/* Who We Are Area */}
              <div className="h-auto max-w-[1440px] mx-auto rounded-lg mt-[50px] flex flex-col sm:flex-row items-center justify-center gap-5">
                {/* Left Side Text Section */}
                <div className="max-w-[463px] w-full h-auto bg-dark-green text-center  text-white rounded-lg mb-[16px] p-5 md:transform md:translate-x-[100px] sm:transform sm:translate-x-0">
                  <h2 className="text-[1.25rem] leading-[1.35] font-bold mb-8">
                    We are here to get as many people volunteering as possible.
                  </h2>
                  <p className="text-[1rem] font-medium mb-10">
                    Whether you are an individual looking to make a difference, a nonprofit
                    organization in need of support, or a community group planning an event,
                    Volunteerium is here to help. We are a team of passionate professionals
                    committed to fostering a culture of giving and community support.
                  </p>
                </div>
                {/* Right Side Image Section */}
                <div className="max-w-[662px] h-auto w-full">
                  <img src={eventsImage} alt="" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Area */}
          <section>
            <div className="max-w-[1440px] min-h-[482px] mx-auto flex flex-col justify-center gap-10 bg-dark-green py-5 ">
              <h2 className="text-[2.25rem] leading-[0.75] text-center text-white ">
                How It Works
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                {/* First Card */}
                <div className="max-w-[408px] w-full h-[241px] bg-white rounded-lg p-[30px]  text-center ">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium ">
                    <span className="text-primary-green">Explore </span>Opportunities
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    Browse through a wide range of volunteer opportunities tailored to your
                    interests and location.
                  </p>
                </div>

                {/* Second Card */}
                <div className="max-w-[408px] w-full h-[241px] bg-white rounded-lg p-[30px]  text-center ">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium ">
                    <span className="text-primary-green">Join</span> to Volunteer
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    Once you find an event that interests you, join to volunteer. The event
                    organizer will review your application and confirm your participation.
                  </p>
                </div>

                {/* Third Card */}
                <div className="max-w-[408px] w-full h-[241px] bg-white rounded-lg p-[30px]  text-center ">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium ">
                    <span className="text-primary-green">Make</span> a Difference
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    Participate in events, contribute to your community, and experience the joy of
                    helping others.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Community Area */}
          <section>
            <div className="flex flex-col sm:flex-row justify-center items-center max-w-[1440px] min-h-[450px] mx-auto ">
              <div>
                <img src={handshakeImage} alt="" className="w-full h-auto" />
              </div>
              <div className="text-dark-green max-w-[509px] text-center">
                <h1 className="text-[3rem] font-semibold leading-1.2083">
                  <p> Join </p> <span className="text-[4.125rem] leading-[0.87]">Volunterium</span>{" "}
                  today!
                </h1>
                <p className="text-[1.25rem] leading-[1.35]">
                  Be a part of a community dedicated to{" "}
                  <span className="font-bold">making a positive difference.</span>
                  Together, we can create a better world;{" "}
                  <span className="font-bold">one volunteer at a time</span>
                </p>
              </div>
            </div>
          </section>

          {/* Number of Volunteers Area */}
          <section>
            <div className="max-w-[1440px] h-auto mx-auto flex flex-col gap-[10px] sm:flex-row justify-around items-center bg-dark-green p-5 py-10">
              {/* Volunteers Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">100+</p>
                <p className="text-[2rem] leading-[0.8437] mt-5">Volunteers</p>
              </div>

              {/* Organizations Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">30+</p>
                <p className="text-[2rem] leading-[0.8437] mt-5">Organizations</p>
              </div>

              {/* Events Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">500+</p>
                <p className="text-[2rem] leading-[0.8437] mt-5">Events</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default AboutUs
