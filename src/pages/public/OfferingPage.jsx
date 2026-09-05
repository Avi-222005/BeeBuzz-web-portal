import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Boxes,
  FlaskConical,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ScanLine,
  Award,
  Sparkles,
  MapPin,
  QrCode
} from 'lucide-react'
import honeyPotImg from '../../assets/honey-pot-illustration.png'
import honeySpoonImg from '../../assets/honey-spoon-realistic.png'

export default function OfferingPage() {
  return (
    <div className="text-[#6b2a06] bg-honey-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8EC] to-white py-16 border-b border-[#EAD7C5]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-500/15 border border-honey-500/30 text-[#6b2a06] text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-honey-600" />
            National Honey Board & KVIC
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-heading text-[#6b2a06] tracking-tight">
            BeeBuzz Platform Offerings
          </h1>
          <p className="mt-4 text-lg text-[#8c5e3c] max-w-2xl mx-auto leading-relaxed">
            A unified digital trust infrastructure empowering Indian beekeepers, certified food laboratories, honey processors, and consumers.
          </p>
        </div>
      </section>

      {/* 4 STAKEHOLDER SECTIONS WITH HERBALTRACE-STYLE ANIMATIONS */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Section 1: For Beekeepers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-100 text-honey-700 text-xs font-bold uppercase tracking-wider mb-3">
              01 • Apiary Level
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06] mb-4">
              Empowering Indian Beekeepers
            </h2>
            <p className="text-base text-[#8c5e3c] leading-relaxed mb-6">
              Migratory beekeepers face severe challenges with middleman exploitation, honey adulteration price drops, and lack of yield tracking. BeeBuzz equips beekeepers with digital tools to prove harvest authenticity right from the hive.
            </p>
            <div className="space-y-3">
              {[
                'Digital Apiary Passport linked to subsidized KVIC Langstroth bee boxes',
                'Migratory Corridor logging (Punjab, UP, Bihar, WB, Kashmir)',
                'Offline GSM & SMS Terminal for remote apiary harvest registration',
                'Direct-to-Processor sourcing with Fair Minimum Support Pricing (MSP)'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#6b2a06]">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/beekeeper"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Explore Beekeeper Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-8 bg-white rounded-3xl border border-[#EAD7C5] shadow-card text-center max-w-md w-full">
              <img src={honeyPotImg} alt="Honey Pot Illustration" className="w-48 h-auto mx-auto mb-4" />
              <h3 className="font-bold text-lg text-[#6b2a06]">Certified Raw Honey Harvest</h3>
              <p className="text-xs text-[#8c5e3c] mt-1">Geo-tagged at hive location with Langstroth box credentials</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: For Testing Laboratories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-100 text-honey-700 text-xs font-bold uppercase tracking-wider mb-3">
              02 • Quality Assurance
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06] mb-4">
              FSSAI & BIS Certified Laboratory Testing
            </h2>
            <p className="text-base text-[#8c5e3c] leading-relaxed mb-6">
              Independent accredited food testing laboratories verify every batch against India's stringent honey quality parameters before any processing or packaging is allowed.
            </p>
            <div className="space-y-3">
              {[
                'Moisture Content testing (≤ 20.0% w/w via AOAC 969.38 Refractometer)',
                'Hydroxymethylfurfural (HMF ≤ 80.0 mg/kg via HPLC-UV Winkler Method)',
                'C4 Sugar Adulteration screening (Negative via EA-IRMS Isotope Ratio)',
                'Melissopalynological Pollen Origin profiling for single-flora honey',
                'Cryptographically signed quality test certificates on immutable ledger'
              ].map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#6b2a06]">{service}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/lab"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-[#6b2a06] hover:bg-[#552104] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Open Laboratory Queue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:order-1 flex justify-center">
            <div className="p-8 bg-white rounded-3xl border border-[#EAD7C5] shadow-card max-w-md w-full">
              <div className="w-12 h-12 rounded-xl bg-honey-500 text-white flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#6b2a06] mb-2">FSSAI Standards Parameters</h3>
              <div className="space-y-2 text-xs font-mono text-[#8c5e3c]">
                <div className="flex justify-between border-b pb-1 border-[#EAD7C5]">
                  <span>Moisture Limit:</span>
                  <span className="text-green-700 font-bold">≤ 20.0%</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-[#EAD7C5]">
                  <span>HMF Freshness:</span>
                  <span className="text-green-700 font-bold">≤ 80.0 mg/kg</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-[#EAD7C5]">
                  <span>Apparent Sucrose:</span>
                  <span className="text-green-700 font-bold">≤ 5.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>C4 Sugar IRMS:</span>
                  <span className="text-green-700 font-bold">Negative (&lt; 7%)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: For Manufacturers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-100 text-honey-700 text-xs font-bold uppercase tracking-wider mb-3">
              03 • Processing & Bottling
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06] mb-4">
              Cleanroom Processing & Serialized QR Passport
            </h2>
            <p className="text-base text-[#8c5e3c] leading-relaxed mb-6">
              Certified processing facilities intake verified raw batches, perform gentle moisture reduction and fine straining, and package honey into sterile amber glass jars with tamper-proof QR codes.
            </p>
            <div className="space-y-3">
              {[
                'Batch intake directly verified against laboratory test certificates',
                'Low-temperature vacuum moisture reduction preserving enzymes',
                'Automated cleanroom bottling for 250g, 500g, and 1kg jars',
                'Instant serialized QR code generation with downloadable print labels',
                'Complete export labeling and FSSAI packaging compliance'
              ].map((adv, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#6b2a06]">{adv}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/manufacturer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Manufacturer Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-8 bg-white rounded-3xl border border-[#EAD7C5] shadow-card text-center max-w-md w-full">
              <img src={honeySpoonImg} alt="Honeycomb presentation" className="w-64 h-auto mx-auto mb-4" />
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-honey-600">
                <QrCode className="h-4 w-4" />
                <span>Serialized QR Verification Ready</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: For Consumers & Regulators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-100 text-honey-700 text-xs font-bold uppercase tracking-wider mb-3">
              04 • Consumer Trust
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#6b2a06] mb-4">
              Complete Traceability on Every Jar
            </h2>
            <p className="text-base text-[#8c5e3c] leading-relaxed mb-6">
              Never wonder if your honey is real again. With one smartphone camera scan, consumers unlock the full journey from the rural apiary to their breakfast table.
            </p>
            <div className="space-y-3">
              {[
                'Instant camera scan with no app installation needed',
                'Visual timeline of harvest, testing, bottling, and verification',
                'Full lab test scorecard displaying moisture and C4 sugar result',
                'Beekeeper profile, apiary coordinates, and flora details',
                'Downloadable Certificate of Authenticity PDF report'
              ].map((con, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#6b2a06]">{con}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-[#6b2a06] hover:bg-[#552104] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Verify a Honey Jar Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:order-1 flex justify-center">
            <div className="p-8 bg-white rounded-3xl border border-[#EAD7C5] shadow-card max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-9 w-9" />
              </div>
              <h3 className="font-bold text-xl text-[#6b2a06]">100% Verified Authentic</h3>
              <p className="text-xs text-[#8c5e3c] mt-2 leading-relaxed">
                Cryptographic audit trail backed by KVIC Honey Mission and independent food laboratory certification.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
