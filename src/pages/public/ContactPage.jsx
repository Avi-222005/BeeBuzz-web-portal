import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'

export default function ContactPage() {
  const { addToast } = useToastStore()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    addToast('Message sent! We\'ll get back to you soon.')
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-honey-400 mb-4 inline-block">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">Contact Us</h1>
          <p className="mt-4 text-charcoal-300 max-w-xl mx-auto">Have questions about BeeBuzz? Want to partner with us? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold font-heading text-charcoal-800 mb-4">Contact Information</h2>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  Reach out to us for partnerships, technical support, or to join the BeeBuzz network as a beekeeper, lab, or cluster officer.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: 'Gramodaya, Sahkar Marg\nMumbai, Maharashtra 400004' },
                  { icon: Phone, label: 'Phone', value: '+91 22 2657 4455' },
                  { icon: Mail, label: 'Email', value: 'support@beebuzz.in' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-honey-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-honey-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-charcoal-700 whitespace-pre-line mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-card overflow-hidden border border-charcoal-200 h-48 bg-charcoal-100 flex items-center justify-center">
                <div className="text-center text-charcoal-400">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-800 font-heading mb-2">Message Sent!</h3>
                    <p className="text-sm text-charcoal-500">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="section-label mb-1 block">Your Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Ramesh Patil"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label className="section-label mb-1 block">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="ramesh@example.com"
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="section-label mb-1 block">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input"
                        required
                      >
                        <option value="">Select a topic</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="beekeeper">Beekeeper Onboarding</option>
                        <option value="technical">Technical Support</option>
                        <option value="lab">Laboratory Integration</option>
                        <option value="kvic">KVIC / Government</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="section-label mb-1 block">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        className="input"
                        rows={5}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
