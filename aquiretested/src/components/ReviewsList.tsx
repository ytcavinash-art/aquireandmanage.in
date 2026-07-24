import { useCallback, useEffect, useState } from 'react';

const FEEDBACK_API_URL = 'https://aquiretested-2.onrender.com/api/feedback';

interface Review {
  _id: string;
  fullName: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(FEEDBACK_API_URL);

      if (!response.ok) {
        throw new Error('Reviews load nahi ho sake.');
      }

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Reviews load nahi ho sake.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();

    const refreshReviews = () => void fetchReviews();
    window.addEventListener('feedback-submitted', refreshReviews);

    return () => window.removeEventListener('feedback-submitted', refreshReviews);
  }, [fetchReviews]);

  return (
    <section className="bg-white px-6 py-16" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="reviews-heading" className="mb-8 text-center text-3xl font-bold text-navy">
          Client Testimonials &amp; Reviews
        </h2>

        {isLoading ? (
          <p role="status" className="text-center text-gray-500">Loading reviews...</p>
        ) : error ? (
          <p role="alert" className="text-center text-red-600">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet. Be the first to rate us!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((review) => {
              const rating = Math.min(5, Math.max(1, Math.round(review.rating)));
              const createdAt = new Date(review.createdAt);

              return (
                <article key={review._id} className="rounded-xl border bg-gray-50 p-5 shadow-sm">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-navy">{review.fullName}</h3>
                    <div
                      className="shrink-0 text-lg text-yellow-400"
                      aria-label={`${rating} out of 5 stars`}
                    >
                      <span aria-hidden="true">
                        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-600">&ldquo;{review.feedback}&rdquo;</p>
                  {!Number.isNaN(createdAt.getTime()) && (
                    <time
                      dateTime={review.createdAt}
                      className="mt-3 block text-xs text-gray-400"
                    >
                      {createdAt.toLocaleDateString()}
                    </time>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
