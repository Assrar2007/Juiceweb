import { MotionConfig } from 'motion/react'
import { StoreProvider } from './context/StoreContext'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { BrandIntro } from './components/BrandIntro'
import { SodaCollection } from './components/SodaCollection'
import { DrinkCustomizer } from './components/DrinkCustomizer'
import { FizzClub } from './components/FizzClub'
import { SnackCollection } from './components/SnackCollection'
import { CampaignBanner } from './components/CampaignBanner'
import { BrandStory } from './components/BrandStory'
import { EventBooking } from './components/EventBooking'
import { SocialGallery } from './components/SocialGallery'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { ProductModal } from './components/ProductModal'
import { Toasts } from './components/ui/Toasts'

export default function App() {
  return (
    /* Respect the OS reduced-motion preference for all Motion-driven animation. */
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <HeroSection />
          <BrandIntro />
          <SodaCollection />
          <DrinkCustomizer />
          <FizzClub />
          <SnackCollection />
          <CampaignBanner />
          <BrandStory />
          <EventBooking />
          <SocialGallery />
          <Newsletter />
        </main>
        <Footer />

        {/* Global overlays */}
        <CartDrawer />
        <ProductModal />
        <Toasts />
      </StoreProvider>
    </MotionConfig>
  )
}
