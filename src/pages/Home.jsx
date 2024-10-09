import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Hero from "../components/Home/Hero"
import UpcomingOpportunities from "../components/Home/UpcomingOpportunities"
import GetToKnowUs from "../components/Home/GetToKnowUs"

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
