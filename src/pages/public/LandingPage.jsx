import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  ArrowRight,
  Boxes,
  CheckCircle2,
  FlaskConical,
  Factory,
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  Sparkles,
  Users
} from 'lucide-react'

// Assets
import beeIllustration from '../../assets/bee-honeycomb-illustration.png'
import honeySpoonImg from '../../assets/honey-spoon-realistic.png'
import { useHoneyStore } from '../../store/honeyStore'

export default function LandingPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', org: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const outletCtx = useOutletContext()

  const { batches, beekeepers, products } = useHoneyStore()

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (contactForm.name && contactForm.email && contactForm.message) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setContactForm({ name: '', email: '', org: '', message: '' })
      }, 4000)
    }
  }

  const handleJoinNetwork = () => {
    if (outletCtx?.openSignUp) {
      outletCtx.openSignUp()
    } else {
      window.dispatchEvent(new CustomEvent('open_signup_modal'))
    }
  }

  return (
    <div className="overflow-hidden text-[#6b2a06]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FFF8EC] pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* LEFT COLUMN */}
            <div className="flex-1 text-left">
              {/* Orange illustration on the extreme left and higher above */}
              <div className="flex justify-start">
                <img
                  src={beeIllustration}
                  alt="Premium Honey Illustration"
                  className="w-40 sm:w-52 md:w-60 h-auto object-contain select-none mb-4 mix-blend-multiply -mt-4 sm:-mt-8 lg:-mt-12 -ml-8 sm:-ml-16 lg:-ml-40 xl:-ml-52"
                />
              </div>

              {/* Tagline badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-500/15 border border-honey-500/30 text-[#6b2a06] text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-honey-500 animate-pulse" />
                KVIC Honey Mission • Trust Layer
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-[#6b2a06] leading-[0.9] tracking-tight mb-5">
                <span className="block text-4xl sm:text-6xl lg:text-7xl">FROM HIVE</span>
                <span className="block text-4xl sm:text-6xl lg:text-7xl text-honey-500">TO HOME</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#8c5e3c] leading-relaxed max-w-lg font-medium mb-8">
                Trace every jar from beekeeper to bottle with verified origin, quality testing and tamper-proof batch records.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleJoinNetwork}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-[#6b2a06] hover:bg-[#552104] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Users className="h-4 w-4 text-honey-400" />
                  <span>Join the Network</span>
                </button>
                <Link
                  to="/offering"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-btn border border-[#6b2a06] text-[#6b2a06] hover:bg-honey-100 font-bold text-sm transition-all"
                >
                  <span>Explore Offerings</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-honey-500/20 rounded-full blur-3xl -z-10 group-hover:bg-honey-500/30 transition-all" />
                <img
                  src={honeySpoonImg}
                  alt="Pure Raw Honeycomb on Wooden Spoon"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Curvy Wave SVG Transition into Brown Bar */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            className="w-full h-12 sm:h-16 lg:h-20 text-[#3d1702] block"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
          >
            <path
              d="M0,45 C320,90 480,10 720,50 C960,90 1180,15 1440,45 L1440,90 L0,90 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="pt-2 pb-12 bg-[#3d1702] text-honey-100 relative z-10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-honey-400">{beekeepers.length || 6}+</div>
            <div className="text-xs uppercase font-bold tracking-wider text-honey-200/70 mt-1">Certified Apiaries</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-honey-400">120+</div>
            <div className="text-xs uppercase font-bold tracking-wider text-honey-200/70 mt-1">Monitored Hives</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-honey-400">{batches.length || 4} Batches</div>
            <div className="text-xs uppercase font-bold tracking-wider text-honey-200/70 mt-1">FSSAI Tested Batches</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-honey-400">100%</div>
            <div className="text-xs uppercase font-bold tracking-wider text-honey-200/70 mt-1">Adulteration Free</div>
          </div>
        </div>
      </section>

      {/* OFFERING SECTION (formerly About - with animation) */}
      <section id="offering" className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-honey-600 mb-2 inline-block">
              Platform Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06]">
              End-to-End Honey Ecosystem
            </h2>
            <p className="mt-3 text-base text-[#8c5e3c] max-w-2xl mx-auto">
              Connecting every stakeholder in the Indian raw honey value chain with transparency, cryptographic audit trails, and fair pricing.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. For Beekeepers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-honey-500 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Boxes className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#6b2a06] mb-2">Beekeepers & Farmers</h3>
                <p className="text-sm text-[#8c5e3c] leading-relaxed mb-4">
                  Digital Apiary Passports, Langstroth box tracking, offline GSM harvest logging, and direct KVIC Honey Mission support.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#6b2a06]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Migratory Corridor logging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Real-time hive IoT sensors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Fair Minimum Support Pricing</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/beekeeper"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-honey-600 hover:text-honey-700 pt-3 border-t border-[#EAD7C5]"
              >
                <span>Beekeeper Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* 2. For Laboratories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-honey-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#6b2a06] mb-2">Quality Laboratories</h3>
                <p className="text-sm text-[#8c5e3c] leading-relaxed mb-4">
                  Full FSSAI & BIS parameter verification: Moisture (≤20%), HMF (≤80 mg/kg), Apparent Sucrose, C4 IRMS adulteration, and pollen origin.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#6b2a06]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>FSSAI 2020 & BIS IS 494 standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>C4 Sugar EA-IRMS screening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Cryptographic digital certificates</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/lab"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-honey-600 hover:text-honey-700 pt-3 border-t border-[#EAD7C5]"
              >
                <span>Lab Testing Queue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* 3. For Manufacturers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-honey-700 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Factory className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#6b2a06] mb-2">Honey Manufacturers</h3>
                <p className="text-sm text-[#8c5e3c] leading-relaxed mb-4">
                  Batch intake from certified beekeepers, cleanroom processing, moisture reduction, serialized jar packaging, and tamper-proof QR printing.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#6b2a06]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Serialized QR code generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Cleanroom bottling passports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Export compliance & labeling</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/manufacturer"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-honey-600 hover:text-honey-700 pt-3 border-t border-[#EAD7C5]"
              >
                <span>Manufacturer Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* 4. For Regulators & Consumers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#6b2a06] text-white flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#6b2a06] mb-2">KVIC Admin & Consumers</h3>
                <p className="text-sm text-[#8c5e3c] leading-relaxed mb-4">
                  Regulatory cluster oversight, fraud detection, and instant consumer smartphone QR scanning for full provenance visibility.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#6b2a06]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Instant camera QR scan lookup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>NMR Spectrum & purity guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Automated fraud flag detection</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/admin"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-honey-600 hover:text-honey-700 pt-3 border-t border-[#EAD7C5]"
              >
                <span>Admin Oversight</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS TO TRUST) */}
      <section className="py-20 bg-[#FFF8EC] border-y border-[#EAD7C5]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-honey-600 mb-2 inline-block">
              Provenance Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06]">
              How HoneyTrace Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: '01',
                icon: Boxes,
                title: 'Harvest at Apiary',
                desc: 'Beekeeper logs floral source, GPS apiary coordinates, Langstroth box count, and harvest yield in kg.'
              },
              {
                num: '02',
                icon: FlaskConical,
                title: 'Lab Testing & Bottling',
                desc: 'Independent certified food labs test moisture, HMF, and C4 sugar. Manufacturer packages and mints unique QR codes.'
              },
              {
                num: '03',
                icon: ShieldCheck,
                title: 'Consumer Verification',
                desc: 'Consumer scans the serialized QR on the jar to view complete botanical origin, lab results, and blockchain hash.'
              }
            ].map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-card border border-[#EAD7C5] shadow-card hover:shadow-card-hover transition-all">
                <span className="block text-5xl font-black text-[#EAD7C5] font-heading">{step.num}</span>
                <div className="w-12 h-12 rounded-xl bg-honey-500 text-white flex items-center justify-center -mt-4 mb-4 shadow-sm">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#6b2a06] font-heading mb-2">{step.title}</h3>
                <p className="text-sm text-[#8c5e3c] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Same as HerbalTrace) */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-honey-600 mb-2 inline-block">
              Support & Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06]">
              Get In Touch with BeeBuzz
            </h2>
            <p className="mt-3 text-base text-[#8c5e3c] max-w-xl mx-auto">
              Have questions about apiary registration, FSSAI lab accreditation, or honey batch verification? Reach out to our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-honey-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6b2a06] text-lg">National Honey Mission Office</h4>
                  <p className="text-sm text-[#8c5e3c] mt-1">
                    Khadi & Village Industries Commission, Gramodaya, 3 Irla Road, Vile Parle (West), Mumbai 400056, India
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-honey-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6b2a06] text-lg">Official Email Support</h4>
                  <p className="text-sm text-[#8c5e3c] mt-1">
                    General Inquiries: support@beebuzz.gov.in<br />
                    Lab Verification: lab-accreditation@beebuzz.gov.in
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6b2a06] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6b2a06] text-lg">Toll-Free Beekeeper Helpline</h4>
                  <p className="text-sm text-[#8c5e3c] mt-1">
                    Toll-Free: 1800 123 5899<br />
                    Available Monday to Saturday, 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="p-8 rounded-card border border-[#EAD7C5] bg-[#FFF8EC] shadow-card">
              <h3 className="text-2xl font-bold font-heading text-[#6b2a06] mb-6">Send Us a Message</h3>
              {submitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-btn text-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-2" />
                  <h4 className="font-bold text-green-800 text-lg">Message Received!</h4>
                  <p className="text-xs text-green-700 mt-1">Our KVIC Honey Mission support coordinator will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b2a06] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-4 py-3 rounded-btn border border-[#EAD7C5] bg-white text-[#6b2a06] font-medium focus:ring-2 focus:ring-honey-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b2a06] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. ramesh@apiary.in"
                      className="w-full px-4 py-3 rounded-btn border border-[#EAD7C5] bg-white text-[#6b2a06] font-medium focus:ring-2 focus:ring-honey-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b2a06] mb-1">Organization / Apiary Name</label>
                    <input
                      type="text"
                      value={contactForm.org}
                      onChange={(e) => setContactForm({ ...contactForm, org: e.target.value })}
                      placeholder="e.g. Aligarh Beekeepers Cooperative"
                      className="w-full px-4 py-3 rounded-btn border border-[#EAD7C5] bg-white text-[#6b2a06] font-medium focus:ring-2 focus:ring-honey-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b2a06] mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Please describe your query regarding beekeeping registration, lab testing, or packaging..."
                      className="w-full px-4 py-3 rounded-btn border border-[#EAD7C5] bg-white text-[#6b2a06] font-medium focus:ring-2 focus:ring-honey-500 focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-btn bg-[#6b2a06] hover:bg-[#552104] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4 text-honey-400" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black font-heading text-[#6b2a06]">Frequently Asked Questions</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'How does BeeBuzz verify that honey is 100% pure and adulteration-free?',
                  a: 'Every batch undergoes mandatory testing for C4 sugar adulteration using EA-IRMS (Elemental Analysis - Isotope Ratio Mass Spectrometry) alongside moisture (<20%), HMF, and pollen origin tests in certified food laboratories.'
                },
                {
                  q: 'What is the KVIC Honey Mission support for beekeepers?',
                  a: 'Under the National Honey Board and KVIC, eligible rural beekeepers receive an 80% subsidy for 10 Langstroth bee boxes, bee colonies, and extraction kits, paired with digital apiary passports.'
                },
                {
                  q: 'How can consumers scan and verify a honey jar?',
                  a: 'Simply scan the QR code printed on the jar with any smartphone camera or enter the batch code (e.g. HC-P-2026-00000093821) into the search box to view the complete immutable provenance timeline.'
                },
                {
                  q: 'How do honey manufacturers generate serialized QR codes?',
                  a: 'Authorized processors intake lab-verified raw batches, bottle them into sterile jars, and the BeeBuzz system automatically mints individual tamper-proof QR codes linking directly to the batch record.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-[#FFF8EC] rounded-card border border-[#EAD7C5]">
                  <h4 className="font-bold text-[#6b2a06] text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-honey-600 flex-shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-sm text-[#8c5e3c] leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
