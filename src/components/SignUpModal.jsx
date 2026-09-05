import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Loader2 } from 'lucide-react'
import beebuzzLogo from '../assets/beebuzz-logo-transparent.png'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const roleOptions = [
  { value: 'Farmer', label: 'Farmer / Beekeeper' },
  { value: 'Lab', label: 'Quality Testing Lab' },
  { value: 'Manufacturer', label: 'Honey Manufacturer / Bottler' },
  { value: 'Consumer', label: 'Consumer / Wholesaler' }
]

const stateOptions = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
]

export const indianStateDistricts = {
  'Uttar Pradesh': ['Aligarh', 'Agra', 'Bareilly', 'Basti', 'Budaun', 'Bulandshahr', 'Etah', 'Etawah', 'Farrukhabad', 'Firozabad', 'Gautam Buddha Nagar (Noida)', 'Ghaziabad', 'Gorakhpur', 'Hapur', 'Hardoi', 'Hathras', 'Jhansi', 'Kanpur Nagar', 'Kanpur Dehat', 'Kasganj', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Prayagraj', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Shahjahanpur', 'Sitapur', 'Unnao', 'Varanasi'],
  'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
  'Madhya Pradesh': ['Bhopal', 'Chhindwara', 'Dewas', 'Dhar', 'Gwalior', 'Hoshangabad (Narmadapuram)', 'Indore', 'Jabalpur', 'Mandsaur', 'Morena', 'Neemuch', 'Raisen', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Sheopur', 'Shivpuri', 'Ujjain', 'Vidisha'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Ganganagar', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
  'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
  'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas (Sundarbans)', 'Uttar Dinajpur'],
  'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar (Mohali)', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Tarn Taran'],
  'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu (Coorg)', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
  'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad (Chhatrapati Sambhaji Nagar)', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad (Dharashiv)', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara (Mahabaleshwar)', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
  'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
  'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan (Guwahati)', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
  'Andhra Pradesh': ['Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla', 'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR'],
  'Arunachal Pradesh': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh', 'Shakti', 'Sukma', 'Surajpur', 'Surguja'],
  'Goa': ['North Goa', 'South Goa'],
  'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
  'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
  'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saitual', 'Serchhip', 'Siaha'],
  'Nagaland': ['Chümoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyü', 'Tuensang', 'Wokha', 'Zünheboto'],
  'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
  'Sikkim': ['Gangtok', 'Gyalshing', 'Mangan', 'Namchi', 'Pakyong', 'Soreng'],
  'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Hanamkonda', 'Yadadri Bhuvanagiri'],
  'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
  'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  'Jammu and Kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
  'Ladakh': ['Kargil', 'Leh'],
  'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
  'Chandigarh': ['Chandigarh'],
  'Andaman and Nicobar Islands': ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
  'Lakshadweep': ['Lakshadweep']
}

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  aadharNumber: '',
  role: '',
  requestedHives: '10',
  organizationName: '',
  locationState: '',
  locationDistrict: ''
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  const [validationError, setValidationError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'phone') {
      // Strictly numeric only, max 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, phone: digitsOnly }))
    } else if (name === 'aadharNumber') {
      // Strictly numeric only, max 12 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12)
      setFormData((prev) => ({ ...prev, aadharNumber: digitsOnly }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (submitResult) setSubmitResult(null)
    if (validationError) setValidationError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidationError('')

    // Validate phone number: exactly 10 digits
    if (formData.phone.length !== 10) {
      setValidationError('Phone number must be exactly 10 digits.')
      return
    }

    // Validate Aadhaar number: exactly 12 digits
    if (formData.aadharNumber.length !== 12) {
      setValidationError('Aadhaar number must be exactly 12 digits.')
      return
    }

    if (!formData.locationState || !formData.locationDistrict) {
      setValidationError('Please select both State and District.')
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        aadharNumber: formData.aadharNumber,
        role: formData.role,
        requestedHives: formData.role === 'Farmer' ? Number(formData.requestedHives || 10) : undefined,
        farmSizeAcres: formData.role === 'Farmer' ? Number(formData.requestedHives || 10) : undefined,
        organizationName: formData.organizationName ? formData.organizationName.trim() : undefined,
        locationState: formData.locationState,
        locationDistrict: formData.locationDistrict
      }

      const response = await fetch(`${BACKEND_URL}/api/v1/auth/registration-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      setSubmitResult({
        type: 'success',
        message: 'Your registration request has been submitted to KVIC Admin. You will receive login credentials upon verification.',
        requestId: result.data?.requestId
      })
      setFormData(initialFormState)
    } catch (err) {
      setSubmitResult({
        type: 'error',
        message: err.message || 'Unable to submit registration'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setFormData(initialFormState)
    setSubmitResult(null)
    setValidationError('')
  }

  const currentDistricts = formData.locationState ? (indianStateDistricts[formData.locationState] || []) : []

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-lg"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-[#FFF8EC] rounded-3xl border border-[#EAD7C5] shadow-2xl overflow-hidden text-[#6b2a06]">
              {/* Header */}
              <div className="relative flex items-center justify-between px-6 py-5 bg-[#FFF8EC]">
                <h2 className="text-2xl font-black font-heading text-[#6b2a06]">Join the Trust</h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full text-[#8c5e3c] hover:bg-honey-100 hover:text-[#6b2a06] transition-colors relative z-10"
                  aria-label="Close registration form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Divider line with organic transparent bee honeycomb sitting on the right */}
              <div className="relative w-full border-b border-[#EAD7C5]">
                <div className="absolute right-4 -top-5 pointer-events-none select-none z-10">
                  <img
                    src={beebuzzLogo}
                    alt="Bee illustration"
                    className="w-12 h-auto object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="px-6 py-6 bg-white max-h-[75vh] overflow-y-auto space-y-4">
                {submitResult?.type === 'success' ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-inner">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-black font-heading text-[#6b2a06] mb-2">Registration Submitted!</h3>
                    <p className="text-sm text-[#8c5e3c] leading-relaxed mb-6 font-medium">
                      {submitResult.message}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-xl border border-[#6b2a06] text-[#6b2a06] font-bold text-sm hover:bg-honey-100"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleClose()
                          onSwitchToSignIn()
                        }}
                        className="px-6 py-2.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md"
                      >
                        Go to Sign In
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {validationError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600">
                        {validationError}
                      </div>
                    )}

                    {submitResult?.type === 'error' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600">
                        Registration Failed: {submitResult.message}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <InputField
                          label="First Name"
                          name="firstName"
                          placeholder="e.g. Ramesh"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <InputField
                          label="Last Name"
                          name="lastName"
                          placeholder="e.g. Patil"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <InputField
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="ramesh@apiary.in"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <InputField
                          label="Phone Number (10 digits)"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Aadhaar Number */}
                      <InputField
                        label="Aadhaar Number (12 digits)"
                        name="aadharNumber"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{12}"
                        maxLength={12}
                        placeholder="123456789012"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        required
                      />

                      {/* Role Selection */}
                      <SelectField
                        label="Supply Chain Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="-- Select Role --"
                        options={roleOptions}
                        required
                      />

                      {/* Requested Hives under KVIC Honey Mission (Only for Farmer / Beekeeper) */}
                      {formData.role === 'Farmer' && (
                        <div className="p-3.5 rounded-xl bg-[#FFF8EC] border border-[#EAD7C5] space-y-1.5 animate-fadeIn">
                          <label className="text-xs font-bold text-[#6b2a06] block">
                            Requested Langstroth Hives (KVIC Honey Mission)
                          </label>
                          <select
                            name="requestedHives"
                            value={formData.requestedHives || '10'}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD7C5] bg-white text-xs font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                          >
                            <option value="5">5 Langstroth Hives (Small Apiary)</option>
                            <option value="10">10 Langstroth Hives (Standard KVIC Grant)</option>
                            <option value="15">15 Langstroth Hives (Medium Cluster)</option>
                            <option value="20">20 Langstroth Hives (Commercial Apiary)</option>
                            <option value="30">30 Langstroth Hives (Migratory Belt)</option>
                            <option value="50">50 Langstroth Hives (Large Honey Producers Cooperative)</option>
                          </select>
                          <p className="text-[11px] text-[#8c5e3c]">
                            KVIC State Admin will inspect your apiary application and allocate the approved number of cryptographic hive passports upon verification.
                          </p>
                        </div>
                      )}

                      {/* Organization Name */}
                      <InputField
                        label="Organization / Apiary Name"
                        name="organizationName"
                        placeholder="e.g. Aligarh Beekeepers Cooperative (optional)"
                        value={formData.organizationName}
                        onChange={handleChange}
                      />

                      {/* State and District Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <SelectField
                          label="State / Union Territory"
                          name="locationState"
                          value={formData.locationState}
                          onChange={(e) => {
                            const newState = e.target.value
                            setFormData((prev) => ({
                              ...prev,
                              locationState: newState,
                              locationDistrict: ''
                            }))
                          }}
                          placeholder="-- Select State --"
                          options={stateOptions.map((s) => ({ value: s, label: s }))}
                          required
                        />

                        <SelectField
                          label="District"
                          name="locationDistrict"
                          value={formData.locationDistrict}
                          onChange={handleChange}
                          placeholder={formData.locationState ? '-- Select District --' : '-- Select State First --'}
                          options={currentDistricts.map((d) => ({ value: d, label: d }))}
                          disabled={!formData.locationState || currentDistricts.length === 0}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-2 space-y-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md shadow-honey-500/25 transition-all flex items-center justify-center disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting Registration...
                          </>
                        ) : (
                          'Submit Registration Request'
                        )}
                      </button>

                      <p className="text-xs text-center text-[#8c5e3c] font-medium">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="text-honey-600 font-bold hover:underline"
                          onClick={() => {
                            handleClose()
                            onSwitchToSignIn()
                          }}
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const InputField = ({ label, name, type = 'text', inputMode, pattern, maxLength, value, onChange, placeholder, required }) => (
  <label className="flex flex-col space-y-1.5 text-xs font-bold text-[#6b2a06]">
    <span>
      {label}{required && <span className="text-red-500"> *</span>}
    </span>
    <input
      type={type}
      name={name}
      inputMode={inputMode}
      pattern={pattern}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-[#EAD7C5] bg-[#FFF8EC]/60 px-3.5 py-2.5 text-[#6b2a06] placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-sm font-medium"
    />
  </label>
)

const SelectField = ({ label, name, value, onChange, placeholder, options, disabled = false, required }) => (
  <label className="flex flex-col space-y-1.5 text-xs font-bold text-[#6b2a06]">
    <span>
      {label}{required && <span className="text-red-500"> *</span>}
    </span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full rounded-xl border border-[#EAD7C5] bg-[#FFF8EC]/60 px-3.5 py-2.5 text-[#6b2a06] focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </label>
)

export default SignUpModal
