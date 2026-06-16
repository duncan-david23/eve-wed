import React from 'react'
import HeroSection from '../components/HeroSection'
import CountdownSection from '../components/CountdownSection'
import LocationSection from '../components/LocationSection'
import GalleriesSection from '../components/GalleriesSection'
import FAQSection from '../components/FAQSection'
import AttendeesSection from '../components/AttendeesSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CountdownSection />
      <LocationSection />
      <GalleriesSection />
      <AttendeesSection />
      <FAQSection />
    </div>
  )
}

export default Home