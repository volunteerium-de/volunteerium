import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import UpcomingOpportunities from "../components/Home/UpcomingOpportunities"
import GetToKnowUs from "../components/Home/GetToKnowUs"
import Hero from "../components/Hero/Hero"
import { useEffect } from "react"
import { clearFilters } from "../features/searchSlice"
import { useDispatch } from "react-redux"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearFilters())
  }, [])

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
