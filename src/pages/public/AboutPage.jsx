import { Link } from 'react-router-dom'
import {
  ShieldCheck, ScanLine, Boxes, Activity, Brain, Wifi,
  TrendingUp, Users, CheckCircle, AlertTriangle, XCircle,
  ArrowRight, Hexagon, Link2, Globe, Leaf
} from 'lucide-react'

const problems = [
  {
    icon: XCircle,
    title: 'Counterfeit Honey',
    desc: 'Adulterated and fake honey floods the market, undermining genuine beekeepers and putting consumer health at risk.',
  },
  {
    icon: AlertTriangle,
    title: 'Low Consumer Trust',
    desc: 'Buyers have no way to verify if honey is pure, ethically sourced, or truly from the claimed region and beekeeper.',
  },
  {
    icon: Users,
    title: 'Weak Market Linkage',
    desc: 'Rural beekeepers lack direct access to premium markets and fair pricing, relying on middlemen who take heavy cuts.',
  },
  {
    icon: Boxes,
    title: 'Zero Traceability',
    desc: 'No system exists to track honey from hive to shelf — KVIC cannot verify authenticity or monitor quality at scale.',
  },
  {
    icon: Activity,
    title: 'Poor Hive Management',
    desc: 'Beekeepers rely on traditional methods with no data on hive health, leading to colony losses and low yields.',
  },
  {
    icon: TrendingUp,
    title: 'No Market Data',
    desc: 'Without yield predictions and demand analytics, beekeepers cannot plan harvests or optimize production.',
  },
]

const solutions = [
  {
    icon: ShieldCheck,
    title: 'Blockchain Traceability',
    desc: 'Every batch is minted on-chain with a unique QR code. Consumers scan to see the complete, tamper-proof journey from apiary to jar.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: ScanLine,
    title: 'QR-Based Verification',
    desc: 'One scan reveals beekeeper identity, harvest details, lab test results, and blockchain proof — building instant consumer trust.',
    color: 'bg-honey-100 text-honey-600',
  },
  {
    icon: Brain,
    title: 'AI Disease Detection',
    desc: 'IoT sensors stream hive data to our AI engine which detects diseases like Varroa mites and American Foulbrood before they spread.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Wifi,
    title: 'Smart Beekeeping',
    desc: 'Real-time monitoring of temperature, humidity, and hive weight with automated alerts and yield predictions.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Globe,
    title: 'Direct Market Access',
    desc: 'Verified beekeepers connect directly with buyers and retailers, eliminating middlemen and earning fair prices.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Leaf,
    title: 'KVIC Integration',
    desc: 'Built to support KVIC\'s Honey Mission — enabling cluster-level oversight, quality assurance, and livelihood promotion.',
    color: 'bg-amber-50 text-amber-600',
  },
]

const stats = [
  { value: '1,240+', label: 'Beekeepers Onboarded' },
  { value: '4,800+', label: 'Hives Monitored' },
  { value: '12,500+', label: 'Batches Verified' },
  { value: '89,000+', label: 'Consumer Scans' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white py-20 sm:py-28">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-honey-400 mb-4 inline-block">About BeeBuzz</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight text-balance">
            Rebuilding Trust in<br />
            <span className="text-honey-400">India's Honey Supply Chain</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal-300 max-w-3xl mx-auto text-balance">
            An integrated blockchain, AI, and IoT-based digital ecosystem to improve honey authenticity, traceability, productivity, and market credibility for rural beekeepers.
          </p>
        </div>
      </section>

      {/* Background / Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-danger mb-3 inline-block">The Problem</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              Why BeeBuzz Exists
            </h2>
            <p className="text-charcoal-500 leading-relaxed">
              KVIC's Honey Mission supports rural beekeepers with bee boxes and extraction toolkits for livelihood promotion, but they still face critical challenges that technology can solve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="card hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                  <p.icon className="h-5 w-5 text-danger" />
                </div>
                <h3 className="font-bold text-charcoal-800 font-heading mb-1">{p.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Platform Offerings */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-success mb-3 inline-block">Our Platform</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              What BeeBuzz Offers
            </h2>
            <p className="text-charcoal-500 leading-relaxed">
              A comprehensive digital ecosystem combining blockchain trust, AI intelligence, and IoT monitoring to transform India's honey industry.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="card hover:shadow-card-hover transition-shadow">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-charcoal-800 font-heading mb-1">{s.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Loop */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-honey-600 mb-3 inline-block">How It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              The BeeBuzz Trust Loop
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', icon: Boxes, title: 'Harvest', desc: 'Beekeeper registers batch with hive data and harvest details.' },
                { step: '02', icon: Link2, title: 'Mint', desc: 'Backend mints batch on blockchain and generates a unique QR code.' },
                { step: '03', icon: ScanLine, title: 'Scan', desc: 'Consumer scans QR on the honey jar to verify authenticity.' },
                { step: '04', icon: ShieldCheck, title: 'Trust', desc: 'Full traceability timeline, beekeeper identity, and on-chain proof.' },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-honey-500 flex items-center justify-center mx-auto mb-4 text-white">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="section-label text-honey-400">Step {item.step}</span>
                  <h3 className="font-bold text-charcoal-800 font-heading mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal-800 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold font-heading text-honey-400">{stat.value}</div>
                <div className="text-sm text-charcoal-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">Join the Movement</h2>
          <p className="text-charcoal-500 mb-8 max-w-md mx-auto">Whether you're a beekeeper, consumer, or KVIC officer — BeeBuzz brings transparency to every drop.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/scan" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
              <ScanLine className="h-4 w-4" /> Verify Honey
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
