import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

const FEEDBACK_API_URL = 'https://aquiretested-2.onrender.com/api/feedback';

interface Review {
  _id: string;
  fullName: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

const clampRating = (rating: number) => Math.min(5, Math.max(1, Math.round(rating)));

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(FEEDBACK_API_URL);
      if (!response.ok) throw new Error('Reviews could not be loaded.');

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
      setActiveIndex(0);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Reviews could not be loaded.');
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

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + clampRating(review.rating), 0) / reviews.length;
  }, [reviews]);

  const visibleReviews = reviews.length
    ? [0, 1, 2].map((offset) => reviews[(activeIndex + offset) % reviews.length])
    : [];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="scroll-mt-20 overflow-hidden bg-[#f5f7fb] py-16 md:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-11 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">Client Experiences</p>
            <h2 id="reviews-heading" className="text-4xl font-bold text-navy md:text-5xl">
              Trusted by People We Work With
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Direct feedback shared by clients and stakeholders through our website.
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-4 border-l-4 border-crimson bg-white px-5 py-4 shadow-sm">
              <div>
                <p className="text-3xl font-bold leading-none text-navy">{averageRating.toFixed(1)}</p>
                <div className="mt-2 flex gap-0.5 text-amber-400" aria-label={`${averageRating.toFixed(1)} average rating out of 5`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} fill={star <= Math.round(averageRating) ? 'currentColor' : 'none'} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <p className="text-xs font-bold text-navy">{reviews.length} Client {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">Website submissions</p>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3" role="status" aria-label="Loading client reviews">
            {[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse bg-white shadow-sm" />)}
          </div>
        ) : error ? (
          <div className="border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
            <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>
            <button type="button" onClick={() => void fetchReviews()} className="mt-4 text-sm font-bold text-navy underline underline-offset-4">Try again</button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <Quote size={32} className="mx-auto text-crimson" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold text-navy">Your experience can be the first</h3>
            <p className="mt-2 text-sm text-slate-500">Share your feedback using the form below.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((review, position) => {
                const rating = clampRating(review.rating);
                const createdAt = new Date(review.createdAt);
                const initials = review.fullName
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part.charAt(0))
                  .join('')
                  .toUpperCase();

                return (
                  <article
                    key={`${review._id}-${position}`}
                    className={`flex min-h-72 flex-col border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      position === 2 ? 'hidden lg:flex' : position === 1 ? 'hidden md:flex' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} fill={star <= rating ? 'currentColor' : 'none'} aria-hidden="true" />
                        ))}
                      </div>
                      <Quote size={34} className="text-crimson/15" fill="currentColor" aria-hidden="true" />
                    </div>

                    <blockquote className="mt-6 flex-1 text-base leading-7 text-slate-600">
                      “{review.feedback}”
                    </blockquote>

                    <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white" aria-hidden="true">
                        {initials || 'CL'}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-navy">{review.fullName}</h3>
                        {!Number.isNaN(createdAt.getTime()) && (
                          <time dateTime={review.createdAt} className="mt-1 block text-[10px] uppercase tracking-wider text-slate-400">
                            {createdAt.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                          </time>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {reviews.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <p className="min-w-16 text-center text-xs font-bold text-slate-500">
                  {activeIndex + 1} / {reviews.length}
                </p>
                <button type="button" onClick={() => move(1)} aria-label="Next reviews" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
