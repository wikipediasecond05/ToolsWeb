
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  toolId: string;
}

interface Comment {
  id: string;
  author: string;
  avatarUrl?: string; 
  text: string;
  timestamp: Date;
}

export function CommentSection({ toolId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Effect to load comments from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedComments = localStorage.getItem(`comments_${toolId}`);
      if (storedComments) {
        try {
          const parsedComments: Comment[] = JSON.parse(storedComments).map((c: any) => ({...c, timestamp: new Date(c.timestamp)}));
          setComments(parsedComments);
        } catch (e) {
          console.error("Failed to parse comments from localStorage", e);
          localStorage.removeItem(`comments_${toolId}`); // Clear corrupted data
        }
      }
    }
  }, [toolId]);

  // Effect to save comments to localStorage when comments state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`comments_${toolId}`, JSON.stringify(comments));
    }
  }, [comments, toolId]);


  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call for real backend
    // For now, just add locally
    await new Promise(resolve => setTimeout(resolve, 300)); 

    const commentToAdd: Comment = {
      id: Date.now().toString(), 
      author: 'GuestUser', // Placeholder, real app would use auth
      text: newComment,
      timestamp: new Date(),
    };
    setComments(prevComments => [commentToAdd, ...prevComments]);
    setNewComment('');
    setIsSubmitting(false);
    toast({
        title: "Comment Submitted",
        description: "Your comment has been added.",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Comments ({comments.length})</CardTitle>
        <CardDescription>Share your thoughts or ask questions about this tool.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitComment} className="space-y-4 mb-8">
          <div>
            <Label htmlFor="newCommentText" className="sr-only">Your Comment</Label>
            <Textarea
              id="newCommentText"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
              disabled={isSubmitting}
              className="focus:ring-primary/50"
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="w-full sm:w-auto">
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>

        {comments.length > 0 && <Separator className="my-6" />}

        {comments.length === 0 && !isSubmitting ? (
          <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3 sm:space-x-4">
                <Avatar className="mt-1">
                  <AvatarImage src={comment.avatarUrl} alt={`${comment.author}'s avatar`} />
                  <AvatarFallback>{comment.author.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {comment.timestamp.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
