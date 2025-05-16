
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CommentSectionProps {
  toolId: string;
}

interface Comment {
  id: string;
  author: string; // User's name
  email: string; // User's email (not displayed)
  avatarUrl?: string;
  text: string;
  timestamp: Date;
}

interface FormErrors {
  name?: string;
  email?: string;
  comment?: string;
}

export function CommentSection({ toolId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedComments = localStorage.getItem(`comments_${toolId}`);
      if (storedComments) {
        try {
          const parsedComments: Comment[] = JSON.parse(storedComments).map((c: any) => ({
            ...c,
            timestamp: new Date(c.timestamp)
          }));
          setComments(parsedComments);
        } catch (e) {
          console.error("Failed to parse comments from localStorage", e);
          localStorage.removeItem(`comments_${toolId}`);
        }
      }
    }
  }, [toolId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && comments.length > 0) { // Only save if there are comments
      localStorage.setItem(`comments_${toolId}`, JSON.stringify(comments));
    }
  }, [comments, toolId]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!authorName.trim()) errors.name = "Name is required.";
    if (!authorEmail.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(authorEmail)) {
      errors.email = "Email is invalid.";
    }
    if (!newCommentText.trim()) errors.comment = "Comment text is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    const commentToAdd: Comment = {
      id: Date.now().toString(),
      author: authorName,
      email: authorEmail,
      text: newCommentText,
      timestamp: new Date(),
    };
    setComments(prevComments => [commentToAdd, ...prevComments]);
    setAuthorName('');
    setAuthorEmail('');
    setNewCommentText('');
    setFormErrors({});
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
        <form onSubmit={handleSubmitComment} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName" className="mb-3 block">Name</Label>
              <Input
                id="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your Name"
                disabled={isSubmitting}
                className={formErrors.name ? 'border-destructive' : ''}
              />
              {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="authorEmail" className="mb-3 block">Email</Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isSubmitting}
                className={formErrors.email ? 'border-destructive' : ''}
              />
              {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="newCommentText" className="mb-3 block">Your Comment</Label>
            <Textarea
              id="newCommentText"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
              disabled={isSubmitting}
              className={`focus-visible:ring-primary/50 ${formErrors.comment ? 'border-destructive' : ''}`}
            />
            {formErrors.comment && <p className="text-xs text-destructive mt-1">{formErrors.comment}</p>}
          </div>
          {Object.keys(formErrors).length > 0 && (
             <Alert variant="destructive" className="mt-4">
               <AlertCircle className="h-4 w-4" />
               <AlertDescription>Please fill in all required fields correctly.</AlertDescription>
             </Alert>
          )}
          <Button type="submit" disabled={isSubmitting || !authorName.trim() || !authorEmail.trim() || !newCommentText.trim()} className="w-full sm:w-auto">
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
                    <p className="font-semibold text-sm text-primary">{comment.author}</p>
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
