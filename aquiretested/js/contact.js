/** A&M Advisory secure contact, feedback and newsletter forms. */
const CONTACT_API_URL = '/api/contact';
const FEEDBACK_API_URL = '/api/feedback';
const WHATSAPP_NUMBER = '919167485843';

document.addEventListener('DOMContentLoaded', () => {
  initPhoneInputs();
  initMeetingRequestLink();
  initContactForms();
  initBrochureForm();
  initFeedbackForm();
  initNewsletterForms();
});

function initMeetingRequestLink() {
  const meetingLink = document.getElementById('request-meeting-link');
  const enquiryForm = document.getElementById('quick-enquiry-form');
  if (!meetingLink || !enquiryForm) return;
  meetingLink.addEventListener('click', (event) => {
    event.preventDefault();
    history.replaceState(null, '', '#quick-enquiry-form');
    enquiryForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => enquiryForm.querySelector('input, textarea, select')?.focus({ preventScroll: true }), 450);
  });
}

function initPhoneInputs() {
  document.querySelectorAll('input[type="tel"], input[name="phone"]').forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 10);
    });
  });
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'The request could not be saved.');
  return data;
}

function initContactForms() {
  document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button?.textContent || 'Submit';
      const status = form.querySelector('.form-status-message') || createStatusElement(form);
      const fullName = form.querySelector('[name="name"]')?.value.trim();
      const emailAddress = form.querySelector('[name="email"]')?.value.trim();
      const mobileNumber = form.querySelector('[name="phone"]')?.value.trim();
      const baseMessage = form.querySelector('[name="message"], [name="project_requirement"]')?.value.trim()
        || 'Slum Rehabilitation Advisory enquiry';
      const meetingDate = form.querySelector('[name="meeting_date"]')?.value;
      const meetingTime = form.querySelector('[name="meeting_time"]')?.value;
      const meetingPreference = meetingDate
        ? `\nPreferred meeting: ${meetingDate}${meetingTime ? ` at ${meetingTime}` : ''}`
        : '';
      const message = `${baseMessage}${meetingPreference}`;

      if (!fullName || !emailAddress || !/^\d{10}$/.test(mobileNumber || '') || !message) {
        showStatus(status, 'Please enter your name, email, enquiry details and a valid 10-digit mobile number.', 'error');
        return;
      }
      setSubmitting(button, true, 'Saving enquiry…');
      try {
        await postJson(CONTACT_API_URL, {
          kind: 'enquiry', fullName, emailAddress, mobileNumber, message,
          sourcePage: window.location.pathname,
        });
        showStatus(status, 'Enquiry submitted securely. Opening WhatsApp for faster assistance…', 'success');
        form.reset();
        window.setTimeout(() => {
          const whatsappMessage = encodeURIComponent(
            `*New A&M Advisory Enquiry*\n\n*Name:* ${fullName}\n*Mobile:* ${mobileNumber}\n*Email:* ${emailAddress}\n*Requirement:* ${message}`,
          );
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
        }, 700);
      } catch (error) {
        showStatus(status, error.message || 'We could not save your enquiry. Please call or WhatsApp our team.', 'error');
      } finally {
        setSubmitting(button, false, originalText);
      }
    });
  });
}

function initBrochureForm() {
  const form = document.getElementById('brochure-download-form');
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button?.textContent || 'Download Company Profile';
    const status = form.querySelector('.form-status-message') || createStatusElement(form);
    const fullName = document.getElementById('brochure-name')?.value.trim();
    const emailAddress = document.getElementById('brochure-email')?.value.trim();
    const mobileNumber = document.getElementById('brochure-phone')?.value.trim();
    if (!fullName || !emailAddress || !/^\d{10}$/.test(mobileNumber || '')) {
      showStatus(status, 'Enter your name, email and a valid 10-digit mobile number.', 'error');
      return;
    }
    setSubmitting(button, true, 'Saving request…');
    try {
      await postJson(CONTACT_API_URL, {
        kind: 'brochure', fullName, emailAddress, mobileNumber,
        message: 'Requested the official A&M Advisory Company Profile PDF',
        sourcePage: window.location.pathname,
      });
      if (typeof window.triggerProfileDownload === 'function') window.triggerProfileDownload();
      else document.querySelector('#brochure-modal a[download]')?.click();
      document.getElementById('brochure-modal')?.classList.add('hidden');
      form.reset();
    } catch (error) {
      showStatus(status, error.message || 'The request could not be saved.', 'error');
    } finally {
      setSubmitting(button, false, originalText);
    }
  });
}

function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;
  const stars = [...form.querySelectorAll('.star-rating-btn')];
  const ratingInput = document.getElementById('feedback-rating-val');
  let rating = Number(ratingInput?.value || 5);
  const updateStars = () => stars.forEach((star) => {
    const selected = Number(star.dataset.star) <= rating;
    star.classList.toggle('text-amber-400', selected);
    star.classList.toggle('text-slate-300', !selected);
    star.setAttribute('aria-pressed', String(Number(star.dataset.star) === rating));
  });
  stars.forEach((star) => star.addEventListener('click', () => {
    rating = Number(star.dataset.star);
    if (ratingInput) ratingInput.value = String(rating);
    updateStars();
  }));
  updateStars();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('feedback-form-status') || createStatusElement(form);
    const fullName = document.getElementById('feedback-name')?.value.trim();
    const emailAddress = document.getElementById('feedback-email')?.value.trim();
    const feedback = document.getElementById('feedback-message')?.value.trim();
    if (!fullName || !emailAddress || !feedback) {
      showStatus(status, 'Please fill in all required fields.', 'error');
      return;
    }
    setSubmitting(button, true, 'Submitting feedback…');
    try {
      await postJson(FEEDBACK_API_URL, { fullName, emailAddress, rating, feedback });
      showStatus(status, 'Thank you. Your feedback was submitted for review.', 'success');
      form.reset();
      rating = 5;
      updateStars();
    } catch (error) {
      showStatus(status, error.message || 'Feedback could not be saved. Please try again.', 'error');
    } finally {
      setSubmitting(button, false, 'Submit Feedback');
    }
  });
}

function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      if (!input?.value.trim()) return;
      setSubmitting(button, true, 'Saving…');
      try {
        await postJson(CONTACT_API_URL, {
          kind: 'newsletter', emailAddress: input.value.trim(), sourcePage: window.location.pathname,
        });
        input.value = '';
        alert('Thank you. Your subscription has been saved.');
      } catch (error) {
        alert(error.message || 'Subscription could not be saved. Please try again.');
      } finally {
        setSubmitting(button, false, 'Subscribe');
      }
    });
  });
}

function setSubmitting(button, submitting, text) {
  if (!button) return;
  button.disabled = submitting;
  button.textContent = text;
}

function createStatusElement(form) {
  const element = document.createElement('div');
  element.className = 'form-status-message mt-4 text-sm font-semibold rounded-lg p-3 hidden';
  element.setAttribute('role', 'status');
  element.setAttribute('aria-live', 'polite');
  form.appendChild(element);
  return element;
}

function showStatus(element, text, type) {
  element.textContent = text;
  element.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
  element.classList.add(type === 'success' ? 'bg-green-100' : 'bg-red-100');
  element.classList.add(type === 'success' ? 'text-green-800' : 'text-red-800');
}
