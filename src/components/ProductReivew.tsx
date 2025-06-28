import { Review } from "@/types/reviews";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import {TypeArea} from "@"
export const ProductReviews: React.FC<{
  reviews: Review[];
  onAddReview: (review: Review) => void;
}> = ({ reviews, onAddReview }) => {
  const [userName, setUserName] = useState("");
  const [ratings, setRatings] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!userName || !feedback || ratings < 1 || ratings > 5) {
      alert("Please fill in all fields correctly.");
      return;
    }
    onAddReview({ userName, ratings, feedback });
    setUserName("");
    setRatings(0);
    setFeedback("");
  };

  // Separate good (≥4) and others
  const goodRatings = reviews.filter((r) => r.ratings >= 4);
  const others = reviews.filter((r) => r.ratings < 4);

  // Combine top 12 good + remaining (up to 20 total)
  const displayedReviews = [...goodRatings.slice(0, 12), ...others].slice(
    0,
    20
  );

  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>

      {/* Scrollable Reviews */}
      <ScrollArea className="max-h-96 pr-4 mb-4">
        {displayedReviews.map((review, index) => (
          <div key={index} className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{review.userName}</p>
              <p className="text-yellow-500">Rating: {review.ratings} / 5</p>
              <p className="text-sm text-muted-foreground">{review.feedback}</p>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Review Form */}
      <div className="mt-6 border-t pt-4 space-y-4">
        <h4 className="text-md font-semibold">Add Your Review</h4>

        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            type="number"
            placeholder="1 to 5"
            value={ratings}
            min={1}
            max={5}
            onChange={(e) => setRatings(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="Write your thoughts..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
          />
        </div>

        <Button onClick={handleSubmit} className="mt-2">
          Submit Review
        </Button>
      </div>
    </div>
  );
};
