
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
  const [sessionRated, setSessionRated] = useState<boolean>(false); // Tracks if rated in current session

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
      const userHasRatedThisSession = sessionStorage.getItem(`session_rated_${toolId}`);
      
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

      if (userHasRatedThisSession) {
        setSessionRated(true);
        setCurrentUserRating(userHasRatedThisSession); // Reflect the rating given in this session
      }
    }
  }, [toolId, calculateAndSetAverage]);


  const handleRating = (value: string) => {
    let updatedAllRatings = [...allRatings];
    
    // For simplicity, we assume one rating per browser session determines the "thank you" message.
    // More robust: track if a user has EVER rated, and update their previous rating.
    // For now, we add to general pool and set session flag.
    updatedAllRatings.push(value); 

    setAllRatings(updatedAllRatings);
    setCurrentUserRating(value); // For current session display
    setSessionRated(true); 

    if (typeof window !== 'undefined') {
      localStorage.setItem(`ratings_${toolId}`, JSON.stringify(updatedAllRatings));
      sessionStorage.setItem(`session_rated_${toolId}`, value); // Mark as rated in this session
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
        {sessionRated && currentUserRating ? (
          <div className="py-3">
            <Laugh className={cn("h-10 w-10 mx-auto mb-2", ratingOptions.find(r => r.value === currentUserRating)?.color || 'text-primary')} />
            <p className="text-lg font-semibold">Thanks for your feedback!</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-around items-stretch gap-2 sm:gap-3">
              {ratingOptions.map((rating) => {
                const IconComponent = rating.emoji;
                return (
                  <Button
                    key={rating.value}
                    variant="outline"
                    onClick={() => handleRating(rating.value)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2.5 h-auto min-w-[56px] w-[calc(20%-0.6rem)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent", // Increased padding and adjusted width
                      "hover:bg-secondary/10 dark:hover:bg-secondary/20",
                       currentUserRating === rating.value && "border-primary ring-2 ring-primary bg-secondary/5" 
                    )}
                    aria-label={`Rate as ${rating.label}`}
                    title={rating.label}
                  >
                    <IconComponent className={cn("h-8 w-8", rating.color)} /> {/* Increased icon size */}
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
