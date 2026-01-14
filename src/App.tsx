import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroVSL from './components/HeroVSL'
import BenefitsBullets from './components/BenefitsBullets'
import CTATimer from './components/CTATimer'
import BeveragesGrid from './components/BeveragesGrid'
import SocialProof from './components/SocialProof'
import PricingCards from './components/PricingCards'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Checkout from './components/Checkout'
import PaymentComplete from './components/PaymentComplete'
import MembersArea, { AuthProvider } from './components/MembersArea'
// New high-conversion components
import StickyCTAMobile from './components/StickyCTAMobile'
import InstructorBio from './components/InstructorBio'
import BeforeAfter from './components/BeforeAfter'
import GuaranteeSection from './components/GuaranteeSection'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ExitIntentPopup from './components/ExitIntentPopup'
// Institutional Pages
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import RefundPolicy from './pages/RefundPolicy'
import Contact from './pages/Contact'

// Landing Page Component
function LandingPage() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <main id="main-content">
        {/* Hero Section with VSL */}
        <HeroVSL
          showCtaAfterSeconds={5}
        />

        {/* Benefits Section with Emoji Bullets */}
        <BenefitsBullets
          showBonuses={true}
        />

        {/* Instructor Bio - Authority Section */}
        <InstructorBio />

        {/* Beverages Grid - Showcase of drinks, smoothies, and batidas */}
        <BeveragesGrid />

        {/* Social Proof - Testimonials, stats, and trust badges */}
        <SocialProof />

        {/* Before/After Transformation */}
        <BeforeAfter />

        {/* CTA with Timer and Order Bumps */}
        <CTATimer
          basePrice={17}
          timerDuration={24 * 60 * 60}
          checkoutUrl="/checkout"
        />

        {/* Guarantee Section - Expanded */}
        <GuaranteeSection />

        {/* Pricing Cards - R$16 vs R$27 options */}
        <PricingCards
          basicPrice={16}
          completePrice={27}
          checkoutUrl="/checkout"
        />

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />

      {/* Floating Elements - Always visible */}
      <StickyCTAMobile price={17} originalPrice={297} checkoutUrl="/checkout" />
      <FloatingWhatsApp phoneNumber="5511999999999" />
      <ExitIntentPopup discountCode="NAOSAIA10" discountPercent={10} />
    </>
  )
}


// Main App with Routes
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment Complete (redirect from InfinitePay) */}
          <Route path="/pagamento-concluido" element={<PaymentComplete />} />

          {/* Members Area */}
          <Route path="/membros" element={<MembersArea />} />
          <Route path="/members" element={<MembersArea />} />

          {/* Institutional Pages */}
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/reembolso" element={<RefundPolicy />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
