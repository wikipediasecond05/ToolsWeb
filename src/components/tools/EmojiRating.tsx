
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Angry, Frown, Meh, Smile, Laugh } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  { emoji: Angry, label: 'Awful', value: 'awful', color: 'text-red-600 dark:text-red-500', score: 1 },
  { emoji: Frown, label: 'Bad', value: 'bad', color: 'text-orange-500 dark:text-orange-400', score: 2 },
  { emoji: Meh, label: 'Okay', value: 'ok', color: 'text-yellow-500 dark:text-yellow-400', score: 3 },
  { emoji: Smile, label: 'Good', value: 'good', color: 'text-lime-500 dark:text-lime-400', score: 4 },
  { emoji: Laugh, label: 'Great!', value: 'great', color: 'text-green-500 dark:text-green-400', score: 5 },
];

export function EmojiRating({ toolId }: EmojiRatingProps) {
  const [allRatings, setAllRatings] = useState<string[]>([]);
  const [currentUserRating, setCurrentUserRating] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [sessionSubmitted, setSessionSubmitted] = useState<boolean>(false);

  const calculateAndSetAverage = useCallback((ratings: string[]) => {
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
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAllRatings = localStorage.getItem(`ratings_${toolId}`);
      const storedUserRating = localStorage.getItem(`user_rating_${toolId}`);
      
      let initialAllRatings: string[] = [];
      if (storedAllRatings) {
        try {
          initialAllRatings = JSON.parse(storedAllRatings);
        } catch (e) {
          console.error("Failed to parse all ratings from localStorage", e);
          localStorage.removeItem(`ratings_${toolId}`);
        }
      }
      setAllRatings(initialAllRatings);
      calculateAndSetAverage(initialAllRatings);

      if (storedUserRating) {
        setCurrentUserRating(storedUserRating);
        // Do not set sessionSubmitted here; it should only be true if rated in the current session
      }
    }
  }, [toolId, calculateAndSetAverage]);


  const handleRating = (value: string) => {
    let updatedAllRatings = [...allRatings];

    if (currentUserRating) {
      // If user had a previous rating (from localStorage), remove it before adding new one
      const index = updatedAllRatings.indexOf(currentUserRating);
      if (index > -1) {
        updatedAllRatings.splice(index, 1);
      }
    }
    updatedAllRatings.push(value);

    setAllRatings(updatedAllRatings);
    setCurrentUserRating(value);
    setSessionSubmitted(true); 

    if (typeof window !== 'undefined') {
      localStorage.setItem(`ratings_${toolId}`, JSON.stringify(updatedAllRatings));
      localStorage.setItem(`user_rating_${toolId}`, value);
    }
    
    calculateAndSetAverage(updatedAllRatings);
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">Rate This Tool</CardTitle>
        {averageRating !== null ? (
          <CardDescription className="text-2xl font-bold flex items-center justify-center mt-2">
            <Star className="h-6 w-6 text-yellow-400 mr-1.5" fill="currentColor" />
            {averageRating} / 5 
            <span className="text-sm text-muted-foreground ml-2">({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</span>
          </CardDescription>
        ) : (
          <CardDescription className="mt-1 text-sm">Be the first to rate it!</CardDescription>
        )}
      </CardHeader>
      <CardContent className="text-center">
        {sessionSubmitted && currentUserRating ? (
          <div className="py-3">
            <Laugh className={cn("h-10 w-10 mx-auto mb-2", ratingOptions.find(r => r.value === currentUserRating)?.color || 'text-primary')} />
            <p className="text-lg font-semibold">Thanks for your feedback!</p>
            <p className="text-sm text-muted-foreground">Your input helps us improve.</p>
          </div>
        ) : (
          <>
            <p className="text-md font-medium mb-1">Found this tool helpful?</p>
            <p className="text-sm text-muted-foreground mb-4">Let us know how it went:</p>
            <div className="flex flex-wrap justify-around items-stretch gap-2 sm:gap-3">
              {ratingOptions.map((rating) => {
                const IconComponent = rating.emoji;
                return (
                  <Button
                    key={rating.value}
                    variant="outline"
                    onClick={() => handleRating(rating.value)}
                    className={cn(
                      "flex flex-col items-center justify-center p-1.5 h-auto w-[calc(20%-0.5rem)] min-w-[48px] sm:w-[calc(20%-0.6rem)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-transparent",
                      "hover:bg-accent/10 dark:hover:bg-accent/20",
                      currentUserRating === rating.value && "border-primary ring-2 ring-primary bg-accent/5"
                    )}
                    aria-label={`Rate as ${rating.label}`}
                    title={rating.label}
                  >
                    <IconComponent className={cn("h-8 w-8 sm:h-8 sm:w-8", rating.color)} />
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
