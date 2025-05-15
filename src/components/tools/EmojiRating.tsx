
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        const parsedRatings: string[] = JSON.parse(storedRatings);
        setAllRatings(parsedRatings);
        calculateAndSetAverage(parsedRatings);
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
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Rate this tool</CardTitle>
      </CardHeader>
      <CardContent>
        {averageRating !== null && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-400 mr-1" fill="currentColor" />
              {averageRating} / 5
            </p>
            <p className="text-sm text-muted-foreground">({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</p>
          </div>
        )}
        {hasRated && currentUserRating ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Thanks for your rating!</p>
            {(() => {
              const RIcon = ratingOptions.find(r => r.value === currentUserRating)?.emoji || Smile;
              const RColor = ratingOptions.find(r => r.value === currentUserRating)?.color || 'text-muted-foreground';
              return <RIcon className={cn("h-10 w-10 mx-auto mt-2", RColor)} />;
            })()}
          </div>
        ) : (
          <div className="flex justify-around items-stretch space-x-2">
            {ratingOptions.map((rating) => {
              const IconComponent = rating.emoji;
              return (
                <Button
                  key={rating.value}
                  variant="outline"
                  onClick={() => handleRating(rating.value)}
                  className={cn(
                    "flex flex-col items-center p-2 h-auto w-full focus:ring-2 focus:ring-primary/50",
                    "hover:bg-accent/50"
                  )}
                  aria-label={`Rate as ${rating.label}`}
                  title={rating.label}
                >
                  <IconComponent className={cn("h-7 w-7 mb-1", rating.color)} />
                  <span className="text-xs sr-only">{rating.label}</span>
                </Button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
