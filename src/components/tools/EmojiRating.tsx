
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smile, Meh, Frown, Star } from 'lucide-react';
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
  { emoji: Smile, label: 'Love it!', value: 'loved', color: 'text-green-500', score: 5 },
  { emoji: Meh, label: 'It_s OK', value: 'ok', color: 'text-yellow-500', score: 3 },
  { emoji: Frown, label: 'Not good', value: 'bad', color: 'text-red-500', score: 1 },
];

export function EmojiRating({ toolId }: EmojiRatingProps) {
  const [currentUserRating, setCurrentUserRating] = useState<string | null>(null);
  const [allRatings, setAllRatings] = useState<string[]>([]); // Stores array of rating 'value' strings
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
          localStorage.removeItem(`ratings_${toolId}`); // Clear corrupted data
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
    // If user has already rated and clicks the same rating, do nothing (or allow to change, future enhancement)
    // For now, once rated, it's final for this session unless localStorage is cleared or user changes rating
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
          <div className="flex justify-around items-stretch space-x-2 sm:space-x-4">
            {ratingOptions.map((rating) => {
              const IconComponent = rating.emoji;
              return (
                <Button
                  key={rating.value}
                  variant="outline"
                  onClick={() => handleRating(rating.value)}
                  className={cn(
                    "flex flex-col items-center p-3 sm:p-4 h-auto w-full focus:ring-2 focus:ring-primary/50",
                    "hover:bg-accent/50"
                  )}
                  aria-label={`Rate as ${rating.label.replace('_',' ')}`}
                  title={rating.label.replace('_',' ')}
                >
                  <IconComponent className={cn("h-8 w-8 mb-1.5", rating.color)} />
                  <span className="text-xs text-center">{rating.label.replace('_',' ')}</span>
                </Button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
