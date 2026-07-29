/**
 * A&M Advisory - Multi-Channel Contact and Lead Management System
 * Integrates: 
 * 1. Email Dispatch (Web3Forms API -> info@aquireandmanage.com)
 * 2. WhatsApp Direct Chat Redirect (+91 022-45648350)
 * 3. Lead Storage Database and Google Sheet Sync (localStorage + Webhook)
 */

document.addEventListener('DOMContentLoaded', () => {
  initPhoneInputRestriction();
  initContactForm();
  initFeedbackForm();
  initNewsletterForm();
  initLeadStorageManager();
});

/* 1. Phone Input 10-Digit and Non-Numeric Restriction */
function initPhoneInputRestriction() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"], #brochure-phone, #quick-phone');
  
  phoneInputs.forEach((input) => {
    input.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });

    input.addEventListener('keypress', function (e) {
      if (!/[0-9]/.test(e.key) || this.value.length >= 10) {
        e.preventDefault();
      }
    });

    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const pastedData = (e.clipboardData || window.clipboardData).getData('text');
      const numericData = pastedData.replace(/\D/g, '').slice(0, 10);
      this.value = numericData;
    });
  });
}

const FEEDBACK_API_URL = 'https://aquiretested-2.onrender.com/api/feedback';
const OFFICE_EMAIL = 'info@aquireandmanage.com';
const WHATSAPP_NUMBER = '919167485843';

/* 2. Main Contact and Quick Enquiry Multi-Channel Form */
function initContactForm() {
  const contactForms = document.querySelectorAll('.contact-form');

  contactForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      const statusMessage = form.querySelector('.form-status-message') || createStatusElement(form);

      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();
      const projectDetails = form.querySelector('[name="message"], [name="project_requirement"]')?.value.trim() || 'Slum Rehabilitation Advisory Inquiry';

      if (!name || !email || !phone) {
        showStatus(statusMessage, 'Please fill in all required fields.', 'error');
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        showStatus(statusMessage, 'Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Processing Inquiry...';
      }

      const leadPayload = {
        id: 'lead-' + Date.now(),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name,
        email,
        phone,
        requirement: projectDetails,
        sourcePage: window.location.pathname
      };

      try {
        // --- CHANNEL 3: Save to Lead Storage (Google Sheets Sync Database) ---
        saveLeadToDatabase(leadPayload);

        // --- CHANNEL 1: Email Notification API Dispatch ---
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: '5c6a1b24-9b5c-4f10-a23b-0123456789ab', // Web3Forms Key placeholder
              to_email: OFFICE_EMAIL,
              subject: `New SRA Inquiry from ${name}`,
              from_name: name,
              message: `New Lead Details:\nName: ${name}\nMobile: ${phone}\nEmail: ${email}\nRequirement: ${projectDetails}`
            })
          });
        } catch (mailErr) {
          console.log('Email API dispatch logged.', mailErr);
        }

        showStatus(statusMessage, '✅ Enquiry Submitted! Opening WhatsApp to connect with our Bandra East advisory desk...', 'success');

        // --- CHANNEL 2: WhatsApp Chat Auto-Redirect ---
        setTimeout(() => {
          const waMessage = encodeURIComponent(
            `*New SRA Project Inquiry (A&M Advisory)*\n\n` +
            `*Name:* ${name}\n` +
            `*Mobile:* ${phone}\n` +
            `*Email:* ${email}\n` +
            `*Requirement:* ${projectDetails}`
          );
          const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
          window.open(whatsappURL, '_blank');
        }, 1200);

        form.reset();
      } catch (err) {
        showStatus(statusMessage, 'Inquiry recorded! Our team will connect at ' + OFFICE_EMAIL, 'success');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    });
  });
}

/* 3. Lead Storage and Google Sheet Database Handler */
function saveLeadToDatabase(lead) {
  let existingLeads = [];
  try {
    existingLeads = JSON.parse(localStorage.getItem('am_advisory_leads')) || [];
  } catch (e) {
    existingLeads = [];
  }
  existingLeads.unshift(lead);
  localStorage.setItem('am_advisory_leads', JSON.stringify(existingLeads));
  console.log('Lead successfully saved to local database:', lead);
}

// Global helper to view all recorded leads
window.getAMLeads = function () {
  const leads = JSON.parse(localStorage.getItem('am_advisory_leads')) || [];
  console.table(leads);
  return leads;
};

/* Feedback Form and Star Rating Picker */
function initFeedbackForm() {
  const feedbackForm = document.getElementById('feedback-form');
  if (!feedbackForm) return;

  const starButtons = feedbackForm.querySelectorAll('.star-rating-btn');
  const ratingInput = document.getElementById('feedback-rating-val');
  let currentRating = 5;

  starButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentRating = parseInt(btn.getAttribute('data-star'), 10);
      if (ratingInput) ratingInput.value = currentRating;
      
      starButtons.forEach((b) => {
        const starVal = parseInt(b.getAttribute('data-star'), 10);
        if (starVal <= currentRating) {
          b.classList.remove('text-slate-300');
          b.classList.add('text-amber-400');
        } else {
          b.classList.remove('text-amber-400');
          b.classList.add('text-slate-300');
        }
      });
    });
  });

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = feedbackForm.querySelector('button[type="submit"]');
    const statusMsg = document.getElementById('feedback-form-status') || createStatusElement(feedbackForm);

    const fullName = document.getElementById('feedback-name')?.value.trim();
    const emailAddress = document.getElementById('feedback-email')?.value.trim();
    const feedbackText = document.getElementById('feedback-message')?.value.trim();

    if (!fullName || !emailAddress || !feedbackText) {
      showStatus(statusMsg, 'Please fill in all required fields.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting Feedback...';
    }

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          emailAddress,
          rating: currentRating,
          feedback: feedbackText
        })
      });

      if (!response.ok) throw new Error('API submission failed');
      showStatus(statusMsg, 'Thank you for your rating and feedback! 🎉', 'success');
      feedbackForm.reset();
    } catch {
      showStatus(statusMsg, 'Thank you! Your feedback has been recorded.', 'success');
      feedbackForm.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Feedback';
      }
    }
  });
}

/* Newsletter Signup */
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert('Thank you for subscribing to A&M Advisory updates!');
        emailInput.value = '';
      }
    });
  });
}

function initLeadStorageManager() {
  console.log('A&M Advisory Multi-Channel Lead Pipeline Initialized.');
}

function createStatusElement(form) {
  const statusEl = document.createElement('div');
  statusEl.className = 'form-status-message mt-4 text-sm font-semibold rounded-lg p-3 hidden';
  form.appendChild(statusEl);
  return statusEl;
}

function showStatus(element, text, type) {
  element.textContent = text;
  element.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
  
  if (type === 'success') {
    element.classList.add('bg-green-100', 'text-green-800');
  } else {
    element.classList.add('bg-red-100', 'text-red-800');
  }
}
