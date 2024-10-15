import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import UpcomingOpportunities from "../components/Home/UpcomingOpportunities"
import GetToKnowUs from "../components/Home/GetToKnowUs"
import Hero from "../components/Hero/Hero"

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <UpcomingOpportunities />
      <GetToKnowUs />
      <Footer />
    </div>
  )
}

export default Home
