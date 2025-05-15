
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smile, Meh, Frown, Star, Angry, Laugh } from 'lucide-react'; // Added Angry, Laugh
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface EmojiRatingProps {
  toolId: string; 
}

interface RatingOption {
  emoji: React.ElementType;
  label: string;
  value: string;
  color: string;
  score: number;
}

const ratingOptions: RatingOption[] = [
  { emoji: Angry, label: 'Awful', value: 'awful', color: 'text-red-600', score: 1 },
  { emoji: Frown, label: 'Bad', value: 'bad', color: 'text-red-500', score: 2 },
  { emoji: Meh, label: 'Okay', value: 'ok', color: 'text-yellow-500', score: 3 },
  { emoji: Smile, label: 'Good', value: 'good', color: 'text-lime-500', score: 4 },
  { emoji: Laugh, label: 'Great!', value: 'great', color: 'text-green-500', score: 5 },
];

export function EmojiRating({ toolId }: EmojiRatingProps) {
  const [currentUserRating, setCurrentUserRating] = useState<string | null>(null);
  const [allRatings, setAllRatings] = useState<string[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRatings = localStorage.getItem(`ratings_${toolId}`);
      const storedUserRating = localStorage.getItem(`user_rating_${toolId}`);
      
      if (storedRatings) {
        try {
          const parsedRatings: string[] = JSON.parse(storedRatings);
          setAllRatings(parsedRatings);
          calculateAndSetAverage(parsedRatings);
        } catch (e) {
          console.error("Failed to parse ratings from localStorage", e);
          localStorage.removeItem(`ratings_${toolId}`);
        }
      }
      if (storedUserRating) {
        setCurrentUserRating(storedUserRating);
        setHasRated(true);
      }
    }
  }, [toolId]);

  const calculateAndSetAverage = (ratings: string[]) => {
    if (ratings.length === 0) {
      setAverageRating(null);
      setTotalRatings(0);
      return;
    }
    const totalScore = ratings.reduce((acc, ratingValue) => {
      const option = ratingOptions.find(o => o.value === ratingValue);
      return acc + (option ? option.score : 0);
    }, 0);
    setAverageRating(parseFloat((totalScore / ratings.length).toFixed(1)));
    setTotalRatings(ratings.length);
  };

  const handleRating = (value: string) => {
    if (hasRated && currentUserRating === value) return; 

    const newAllRatings = [...allRatings, value];
    setAllRatings(newAllRatings);
    setCurrentUserRating(value);
    setHasRated(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`ratings_${toolId}`, JSON.stringify(newAllRatings));
      localStorage.setItem(`user_rating_${toolId}`, value);
    }
    
    calculateAndSetAverage(newAllRatings);
    
    toast({
      title: "Rating Submitted!",
      description: "Thanks for your feedback.",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Rate This Tool</CardTitle>
        {averageRating !== null ? (
          <CardDescription className="text-2xl font-bold flex items-center justify-center mt-2">
            <Star className="h-7 w-7 text-yellow-400 mr-2" fill="currentColor" />
            {averageRating} / 5 
            <span className="text-sm text-muted-foreground ml-2">({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</span>
          </CardDescription>
        ) : (
          <CardDescription>Be the first to rate it!</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {hasRated && currentUserRating ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Thanks for your rating!</p>
            {(() => {
              const RIcon = ratingOptions.find(r => r.value === currentUserRating)?.emoji || Smile;
              const RColor = ratingOptions.find(r => r.value === currentUserRating)?.color || 'text-muted-foreground';
              const RLabel = ratingOptions.find(r => r.value === currentUserRating)?.label || '';
              return (
                <div className="flex flex-col items-center mt-2">
                  <RIcon className={cn("h-10 w-10", RColor)} />
                  <span className={cn("text-sm mt-1", RColor)}>{RLabel}</span>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="flex flex-wrap justify-around items-stretch gap-2 sm:gap-3">
            {ratingOptions.map((rating) => {
              const IconComponent = rating.emoji;
              return (
                <Button
                  key={rating.value}
                  variant="outline"
                  onClick={() => handleRating(rating.value)}
                  className={cn(
                    "flex flex-col items-center p-2 sm:p-3 h-auto w-[calc(20%-0.5rem)] min-w-[50px] sm:w-[calc(20%-0.75rem)] focus:ring-2 focus:ring-primary/50", // Adjusted width for 5 items
                    "hover:bg-accent/50"
                  )}
                  aria-label={`Rate as ${rating.label}`}
                  title={rating.label}
                >
                  <IconComponent className={cn("h-7 w-7 mb-1 sm:h-8 sm:w-8", rating.color)} />
                  <span className="text-xs text-center leading-tight">{rating.label}</span>
                </Button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
