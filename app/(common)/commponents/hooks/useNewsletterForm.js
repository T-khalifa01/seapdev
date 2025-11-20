// hooks/useNewsletterForm.js
import { useState, useEffect } from 'react';

export function useNewsletterForm(subscriptionType = 'newsletter') {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  // New state to manage feedback: 'initial', 'submitting', 'success', 'error'
  const [feedback, setFeedback] = useState('initial');

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear the error and feedback state when user starts typing again
    setErrors({});
    setFeedback('initial');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // New function to reset the form back to its initial state
  const resetForm = () => {
    setEmail('');
    setFeedback('initial');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFeedback('error'); // Show error state if validation fails
      return;
    }

    setFeedback('submitting'); // Show submitting state
    
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: subscriptionType }),
      });

      if (res.ok) {
        setFeedback('success');
      } else {
        const data = await res.json();
        setErrors({ email: data.error || 'Submission failed.' });
        setFeedback('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({ email: 'Submission failed, please try again later.' });
      setFeedback('error');
    }
  };

  // This useEffect will handle the auto-reset after a successful submission
  useEffect(() => {
    if (feedback === 'success') {
      const timer = setTimeout(() => {
        resetForm();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [feedback]);

  return {
    email,
    errors,
    feedback, // Expose the feedback state
    handleChange,
    handleSubmit,
  };
}