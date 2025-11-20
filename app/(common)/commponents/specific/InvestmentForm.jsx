'use client';

import { useState, useEffect } from 'react';
import statesAndLGAs from '../../lib/data/statelgaList.json';
import CustomSelect from './CustomSelect';
import SubmissionModal from './SubmissionModal';

const categories = [
  'Personal Info',
  'Investment Sector',
  'Contact & Questions'
];

export default function InvestmentForm({ initialData = {} }) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    identity: 'Individual',
    organizationName: '',
    organizationType: '',
    state: '',
    lga: '',
    customSector: '',
    capacity: '',
    timeframe: '',
    investmentMode: '',
    experience: '',
    contactMethod: '',
    message: '',
    receiveUpdates: false,
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const floatingLabelWrapper = "relative mb-6";
  const floatingInput = "peer w-full h-12 px-0 py-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-green-accent transition-colors duration-300 placeholder-transparent";
  const floatingLabel = "absolute left-0 -top-4 text-gray-500 font-poppins text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-full peer-focus:text-sm";

  // Validation function for fields
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required';
        break;
      case 'phone':
        if (!/^\d{7,15}$/.test(value)) return 'Phone must be 7-15 digits';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        break;
      case 'state':
        if (!value) return 'State is required';
        break;
      case 'lga':
        if (!value) return 'LGA is required';
        break;
      case 'identity':
        if (!value) return 'Identity is required';
        break;
      case 'customSector':
        if (!value.trim()) return 'Sector of Interest is required';
        break;
      case 'capacity':
        if (!value) return 'Investment Capacity is required';
        break;
      case 'timeframe':
        if (!value) return 'Timeframe is required';
        break;
      case 'investmentMode':
        if (!value) return 'Mode of Investment is required';
        break;
      case 'contactMethod':
        if (!value) return 'Contact Method is required';
        break;
      default:
        break;
    }
    return '';
  };

  // Validate all fields in current step
  const validateCurrentStep = () => {
    let valid = true;
    const newErrors = {};

    const stepFields = {
      0: ['fullName', 'phone', 'email', 'identity'],
      1: ['state', 'lga', 'customSector', 'capacity', 'timeframe', 'investmentMode'],
      2: ['contactMethod']
    };

    for (const field of stepFields[currentCategory]) {
      const error = validateField(field, formData[field]);
      if (error) {
        valid = false;
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle input changes and clear errors on change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      identity: 'Individual',
      organizationName: '',
      organizationType: '',
      state: '',
      lga: '',
      customSector: '',
      capacity: '',
      timeframe: '',
      investmentMode: '',
      experience: '',
      contactMethod: '',
      message: '',
      receiveUpdates: false,
      ...initialData,
    });
    setErrors({});
    setCurrentCategory(0);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let allValid = true;
    const allErrors = {};

    const stepFields = {
      0: ['fullName', 'phone', 'email', 'identity'],
      1: ['state', 'lga', 'customSector', 'capacity', 'timeframe', 'investmentMode'],
      2: ['contactMethod']
    };

    for (let step = 0; step < categories.length; step++) {
      for (const field of stepFields[step]) {
        const error = validateField(field, formData[field]);
        if (error) {
          allValid = false;
          allErrors[field] = error;
        }
      }
    }

    if (!allValid) {
      setErrors(allErrors);
      const firstErrorField = Object.keys(allErrors)[0];
      if (stepFields[0].includes(firstErrorField)) setCurrentCategory(0);
      else if (stepFields[1].includes(firstErrorField)) setCurrentCategory(1);
      else setCurrentCategory(2);
      return;
    }

    try {
      const res = await fetch('/api/investment-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) { 
        setSubmissionStatus('success');
        setShowModal(true);
      } else {
        setSubmissionStatus('error');
        setShowModal(true);
        console.error('Submission failed:', data.error);
      }
    } catch (error) {
      setSubmissionStatus('error');
      setShowModal(true);
      console.error('Submission failed, please try again later.', error);
    }
  };

  const filteredLGAs = formData.state ? statesAndLGAs[formData.state] || [] : [];

  const renderFormSection = () => {
    const statesOptions = Object.keys(statesAndLGAs);
    const identityOptions = ['Individual', 'Representative'];
    const capacityOptions = ['Small', 'Medium', 'Large'];
    const sectorOptions = ['Agric-AgriBusiness', 'Clean-Cooking Solutions', 'E-Mobility', 'GIS-Mapping', 'Hybrid-Solar & Gas Power', 'Industrial-Infrastructure', 'Mining', 'Utility-Scale Solar' ]
    const timeframeOptions = ['Short-Term', 'Long-Term'];
    const investmentModeOptions = ['Equity', 'Loan', 'PPP', 'Grant', 'Crowdfunding', 'Other'];
    const contactMethodOptions = ['Phone', 'Email', 'WhatsApp'];

    switch (currentCategory) {
      case 0:
        return (
          <>
            <h2 className="md:hidden text-xl font-semibold mb-6">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className={floatingLabelWrapper}>
                <input id="fullName" name="fullName" autoComplete='name' onChange={handleChange} required className={floatingInput} placeholder="Full Name" value={formData.fullName} />
                <label htmlFor="fullName" className={floatingLabel}>Full Name</label>
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div className={floatingLabelWrapper}>
                <input id="phone" name="phone" autoComplete='tel' onChange={handleChange} required className={floatingInput} placeholder="Phone Number" value={formData.phone} />
                <label htmlFor="phone" className={floatingLabel}>Phone Number</label>
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className={floatingLabelWrapper}>
                <input id="email" name="email" type="email" autoComplete='email' onChange={handleChange} required className={floatingInput} placeholder="Email" value={formData.email} />
                <label htmlFor="email" className={floatingLabel}>Email</label>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <CustomSelect
                label="Identity"
                name="identity"
                value={formData.identity}
                options={identityOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.identity && <p className="text-red-600 text-sm mt-1">{errors.identity}</p>}
              {formData.identity === 'Representative' && (
                <>
                  <div className={floatingLabelWrapper}>
                    <input id="organizationName" name="organizationName" autoComplete='organization' onChange={handleChange} className={floatingInput} placeholder="Organization Name" value={formData.organizationName} />
                    <label htmlFor="organizationName" className={floatingLabel}>Organization Name</label>
                  </div>
                  <div className={floatingLabelWrapper}>
                    <input id="organizationType" name="organizationType" onChange={handleChange} className={floatingInput} placeholder="Organization Type" value={formData.organizationType} />
                    <label htmlFor="organizationType" className={floatingLabel}>Organization Type</label>
                  </div>
                </>
              )}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="md:hidden text-xl font-semibold mb-6">Investment Sector</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <CustomSelect
                label="State"
                name="state"
                value={formData.state}
                options={statesOptions}
                onChange={handleChange}
                withSearchBar={true}
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
              <CustomSelect
                label="LGA"
                name="lga"
                value={formData.lga}
                options={filteredLGAs}
                onChange={handleChange}
                disabled={!formData.state}
                withSearchBar={true}
              />
              {errors.lga && <p className="text-red-600 text-sm mt-1">{errors.lga}</p>}
              <CustomSelect
                label="Sector of Interest"
                name="customSector"
                value={formData.customSector}
                options={sectorOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.customSector && <p className="text-red-600 text-sm mt-1">{errors.customSector}</p>}
              <CustomSelect
                label="Investment Capacity"
                name="capacity"
                value={formData.capacity}
                options={capacityOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.capacity && <p className="text-red-600 text-sm mt-1">{errors.capacity}</p>}
              <CustomSelect
                label="Timeframe"
                name="timeframe"
                value={formData.timeframe}
                options={timeframeOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.timeframe && <p className="text-red-600 text-sm mt-1">{errors.timeframe}</p>}
              <CustomSelect
                label="Mode of Investment"
                name="investmentMode"
                value={formData.investmentMode}
                options={investmentModeOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.investmentMode && <p className="text-red-600 text-sm mt-1">{errors.investmentMode}</p>}
              <div className={floatingLabelWrapper}>
                <input id="experience" name="experience" onChange={handleChange} className={floatingInput} placeholder="Previous Experience" value={formData.experience} />
                <label htmlFor="experience" className={floatingLabel}>Previous Experience</label>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="md:hidden text-xl font-semibold mb-6">Contact & Questions</h2>
            <div className="space-y-6">
              <CustomSelect
                label="Preferred Contact Method"
                name="contactMethod"
                value={formData.contactMethod}
                options={contactMethodOptions}
                onChange={handleChange}
                withSearchBar={false}
              />
              {errors.contactMethod && <p className="text-red-600 text-sm mt-1">{errors.contactMethod}</p>}
              <div className={floatingLabelWrapper}>
                <textarea id="message" name="message" onChange={handleChange} className={`${floatingInput} h-24 resize-none`} placeholder="Message / Questions" value={formData.message} />
                <label htmlFor="message" className={floatingLabel}>Message / Questions</label>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <input id="receiveUpdates" name="receiveUpdates" type="checkbox" onChange={handleChange} className="h-4 w-4 accent-blue-600" checked={formData.receiveUpdates} />
                <label htmlFor="receiveUpdates">I would like to receive updates and news.</label>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl md:max-w-6xl bg-whitish-secondary shadow-xl rounded-lg p-8 sm:-mt-8 md:-mt-24 z-4">
        <div className="md:hidden">
          <div className="flex justify-center mb-8 space-x-4">
            {categories.map((cat, index) => (
              <div key={index} className="flex-none flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300
                  ${currentCategory > index ? 'bg-green-500 text-white' : (currentCategory === index ? 'bg-bleus-secondary text-white' : 'bg-gray-300 text-gray-700')}`}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            {renderFormSection()}
            <div className="mt-8 flex gap-4">
              <button type="button" onClick={handlePrevious} disabled={currentCategory === 0} className="flex-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border rounded-lg py-2">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Previous <span className="sr-only">section of the investment form</span>
              </button>
              {currentCategory < categories.length - 1 ? (
                <button type="button" onClick={(e) => handleNext(e)} className="flex-1 bg-bleus-secondary hover:bg-lemon-accent hover:text-blackish-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none">
                  Continue <span className="sr-only">to next section of the investment form</span> <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              ) : (
                <button type="submit" className="flex-1 bg-green-accent hover:bg-lemon-accent hover:text-blackish-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none">
                  Submit <span className="sr-only">your Interest in investing in Nigeria's sustainable future </span>
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="hidden md:grid grid-cols-[1fr_2fr] gap-12">
          <div className="p-4 pr-0">
            <h2 className="text-3xl font-bold mb-8">Investment Form</h2>
            <nav className="space-y-4 text-2xl font-medium">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCategory(idx)}
                  className={`block transition-colors duration-300 w-full text-left outline-none focus:text-bleus-secondary
                    ${idx === currentCategory ? 'font-bold text-green-accent' : 'text-gray-500 hover:text-bleus-secondary'}`}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 pl-0">
            <form onSubmit={handleSubmit}>
              {renderFormSection()}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentCategory === 0}
                  className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous <span className="sr-only">section of the investment form</span>
                </button>
                {currentCategory < categories.length - 1 ? (
                  <button
                    type="button"
                    onClick={(e) => handleNext(e)}
                    className="bg-bleus-secondary hover:bg-lemon-accent hover:text-blackish-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none"
                  >
                    Continue <span className="sr-only">to next section of the investment form</span>
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-accent hover:bg-lemon-accent hover:text-blackish-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none"
                  >
                    Submit <span className="sr-only">your Interest in investing in Nigeria's sustainable future </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <SubmissionModal
          success={submissionStatus === 'success'}
          onReset={handleResetForm}
        />
      )}
    </>
  );
}