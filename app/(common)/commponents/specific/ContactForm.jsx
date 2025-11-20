'use client';

import { useState } from 'react';
import CustomSelect from './CustomSelect';
import SubmissionModal from './SubmissionModal';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    identity: 'Individual',
    organizationName: '',
    organizationType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const floatingLabelWrapper = "relative mb-6";
  const floatingInput = "peer w-full h-12 px-0 py-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-green-accent transition-colors duration-300 placeholder-transparent";
  const floatingLabel = "absolute left-0 -top-4 text-gray-500 font-poppins text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-full peer-focus:text-sm";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const identityOptions = ['Individual', 'Organization'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!/^\d{7,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formData.identity === 'Organization') {
      if (!formData.organizationName) newErrors.organizationName = 'Organization Name is required';
      if (!formData.organizationType) newErrors.organizationType = 'Organization Type is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      identity: 'Individual',
      organizationName: '',
      organizationType: '',
      message: '',
    });
    setErrors({});
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    try {
      const res = await fetch('/api/contact-submit', {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Full Name */}
          <div className={floatingLabelWrapper}>
            <input id="name" name="name" onChange={handleChange} required className={floatingInput} placeholder="Full Name" value={formData.name} />
            <label htmlFor="name" className={floatingLabel}>Full Name</label>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          {/* Phone Number */}
          <div className={floatingLabelWrapper}>
            <input id="phone" name="phone" onChange={handleChange} required className={floatingInput} placeholder="Phone Number" value={formData.phone} />
            <label htmlFor="phone" className={floatingLabel}>Phone Number</label>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          {/* Email */}
          <div className={floatingLabelWrapper}>
            <input id="email" name="email" type="email" onChange={handleChange} required className={floatingInput} placeholder="Email" value={formData.email} />
            <label htmlFor="email" className={floatingLabel}>Email</label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          {/* Identity */}
          <CustomSelect
            label="Identity"
            name="identity"
            value={formData.identity}
            options={identityOptions}
            onChange={handleChange}
            withSearchBar={false}
          />
          {/* Conditional Organization Fields */}
          {formData.identity === 'Organization' && (
            <>
              <div className={floatingLabelWrapper}>
                <input id="organizationName" name="organizationName" onChange={handleChange} className={floatingInput} placeholder="Organization Name" value={formData.organizationName} />
                <label htmlFor="organizationName" className={floatingLabel}>Organization Name</label>
                {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>}
              </div>
              <div className={floatingLabelWrapper}>
                <input id="organizationType" name="organizationType" onChange={handleChange} className={floatingInput} placeholder="Organization Type" value={formData.organizationType} />
                <label htmlFor="organizationType" className={floatingLabel}>Organization Type</label>
                {errors.organizationType && <p className="text-red-500 text-xs mt-1">{errors.organizationType}</p>}
              </div>
            </>
          )}
        </div>
        {/* Message */}
        <div className={`${floatingLabelWrapper} mt-6`}>
          <textarea id="message" name="message" onChange={handleChange} required className={`${floatingInput} h-24 resize-none`} placeholder="Message / Questions" value={formData.message} />
          <label htmlFor="message" className={floatingLabel}>Message / Questions</label>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <div className="mt-8">
          <button type="submit" className="w-full bg-green-accent hover:bg-bleus-secondary font-poppins text-whitish-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none">
            Submit
            <span className="sr-only">Your contact information and we will answer all your questions </span>
          </button>
        </div>
      </form>

      {showModal && (
        <SubmissionModal
          success={submissionStatus === 'success'}
          onReset={handleResetForm}
        />
      )}
    </>
  );
}


export default ContactForm;