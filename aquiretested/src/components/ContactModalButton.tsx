import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';

export default function ContactModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    message: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://aquiretested-2.onrender.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ fullName: '', mobileNumber: '', emailAddress: '', message: '' });
        setIsOpen(false);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Backend connection error');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-crimson px-8 py-3 font-semibold text-white transition-colors hover:bg-crimson/90"
      >
        Get In Touch
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-xl bg-white p-8 text-slate-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-3 text-3xl leading-none text-slate-500 hover:text-slate-900"
              aria-label="Close contact form"
            >
              ×
            </button>

            <h2 id="contact-modal-title" className="mb-6 text-center text-3xl font-bold">
              Get In Touch
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="contact-name">Full Name</label>
              <input id="contact-name" name="fullName" type="text" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="mb-4 w-full rounded border p-3" />

              <label className="sr-only" htmlFor="contact-mobile">Mobile Number</label>
              <input id="contact-mobile" name="mobileNumber" type="tel" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required className="mb-4 w-full rounded border p-3" />

              <label className="sr-only" htmlFor="contact-email">Email Address</label>
              <input id="contact-email" name="emailAddress" type="email" placeholder="Email Address" value={formData.emailAddress} onChange={handleChange} required className="mb-4 w-full rounded border p-3" />

              <label className="sr-only" htmlFor="contact-message">Your Message</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Your Message" value={formData.message} onChange={handleChange} required className="mb-6 w-full rounded border p-3" />

              <button type="submit" className="w-full rounded-lg bg-crimson py-3 font-semibold text-white transition-colors hover:bg-crimson/90">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
