import { useState, type FormEvent } from 'react';

const FEEDBACK_API_URL = 'https://aquiretested-2.onrender.com/api/feedback';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    rating: 5,
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Feedback submit nahi ho saka.');
      }

      setSubmitted(true);
      setFormData({ fullName: '', emailAddress: '', rating: 5, feedback: '' });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Backend connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 px-6 py-16" aria-labelledby="feedback-heading">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <h2 id="feedback-heading" className="mb-4 text-center text-2xl font-bold text-navy">
          Leave Your Feedback
        </h2>

        {submitted && (
          <p role="status" className="mb-4 text-center font-semibold text-green-600">
            Thank you for your rating &amp; feedback! 🎉
          </p>
        )}
        {error && (
          <p role="alert" className="mb-4 text-center font-semibold text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="sr-only" htmlFor="feedback-name">Your Name</label>
          <input
            id="feedback-name"
            type="text"
            placeholder="Your Name"
            required
            value={formData.fullName}
            onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
            className="w-full rounded-lg border p-3"
          />

          <label className="sr-only" htmlFor="feedback-email">Your Email</label>
          <input
            id="feedback-email"
            type="email"
            placeholder="Your Email"
            required
            value={formData.emailAddress}
            onChange={(event) => setFormData({ ...formData, emailAddress: event.target.value })}
            className="w-full rounded-lg border p-3"
          />

          <fieldset>
            <legend className="mb-1 block text-sm font-medium">Rating:</legend>
            <div className="flex gap-2" aria-label={`${formData.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`text-3xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  aria-label={`Rate ${star} out of 5 stars`}
                  aria-pressed={star === formData.rating}
                >
                  ★
                </button>
              ))}
            </div>
          </fieldset>

          <label className="sr-only" htmlFor="feedback-message">Write your feedback</label>
          <textarea
            id="feedback-message"
            placeholder="Write your feedback..."
            required
            value={formData.feedback}
            onChange={(event) => setFormData({ ...formData, feedback: event.target.value })}
            className="h-24 w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-navy py-3 font-semibold text-white transition hover:bg-mediumBlue disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </section>
  );
}
