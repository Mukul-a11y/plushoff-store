'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Star, StarHalf, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  customer: {
    first_name: string;
    last_name: string;
  };
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { customer } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReviews(data.reviews);
      
      // Find user's review if it exists
      if (customer) {
        const userReview = data.reviews.find(
          (review: Review) => review.customer.id === customer.id
        );
        setUserReview(userReview || null);
      }
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, customer]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: userReview ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating: newRating,
          comment: newComment,
          ...(userReview && { reviewId: userReview.id }),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Refresh reviews after submission
      await fetchReviews();
      setNewRating(0);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(averageRating)}</div>
          <span className="text-lg font-medium">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
        <p className="text-gray-600">{reviews.length} reviews</p>
      </div>

      {customer && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {userReview ? 'Update Your Review' : 'Write a Review'}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewRating(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= newRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              placeholder="Share your thoughts about this product..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting || newRating === 0}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : userReview ? (
              'Update Review'
            ) : (
              'Submit Review'
            )}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="font-medium">
                {review.customer.first_name} {review.customer.last_name}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
            </p>
            {review.comment && (
              <p className="text-gray-700">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 