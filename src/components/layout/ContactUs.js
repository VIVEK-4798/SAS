'use client';
import React, { useState } from 'react';
import SectionHeaders from '../layout/sectionHeaders';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } else {
      const { error } = await res.json();
      toast.error(error || 'Something went wrong');
    }

    setSubmitting(false);
  };

  return (
    <section className='text-center my-16' id='contact'>
      <SectionHeaders mainHeader={'Contact Us'} />

      <div className='mt-8 max-w-md mx-auto'>
        <form className='space-y-4 text-left' onSubmit={handleSubmit}>
          <div>
            <label className='block text-gray-700 mb-1'>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-1'>E-mail</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-1'>Message</label>
            <textarea
              name='message'
              rows='4'
              value={form.message}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black'
            />
          </div>

          <button
            type='submit'
            disabled={submitting}
            className='w-full bg-black text-white py-3 px-4 uppercase font-medium mt-4 hover:bg-gray-800 transition-colors'
          >
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
