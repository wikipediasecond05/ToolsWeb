
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface EmojiRatingProps {
  toolId: string; 
}

const ratingOptions = [
  { emoji: Smile, label: 'Love it!', value: 'loved', color: 'text-green-500' },
  { emoji: Meh, label: 'It_s OK', value: 'ok', color: 'text-yellow-500' },
  { emoji: Frown, label: 'Not good', value: 'bad', color: 'text-red-500' },
];

export function EmojiRating({ toolId }: EmojiRatingProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRating = (value: string) => {
    setSelectedRating(value);
    // In a real app, you would send this rating to your backend
    console.log(`Tool ${toolId} rated as: ${value}`);
    setSubmitted(true); 
    toast({
      title: "Rating Submitted!",
      description: "Thanks for your feedback.",
    });
    // Optional: Disable further rating or show a thank you message permanently
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Rate this tool</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted && selectedRating ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Thanks for your rating!</p>
            {(() => {
              const RIcon = ratingOptions.find(r => r.value === selectedRating)?.emoji || Smile;
              const RColor = ratingOptions.find(r => r.value === selectedRating)?.color || 'text-muted-foreground';
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
                    selectedRating === rating.value ? "border-primary bg-primary/10" : "hover:bg-accent/50"
                  )}
                  aria-label={`Rate as ${rating.label}`}
                  title={rating.label}
                >
                  <IconComponent className={cn("h-7 w-7 mb-1", selectedRating === rating.value ? rating.color : "text-muted-foreground group-hover:text-accent-foreground")} />
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
