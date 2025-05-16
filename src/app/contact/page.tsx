
'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import { Icons } from '@/components/icons'; // Import Icons

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
    >
      {pending ? (
        <Icons.Loader2 className="animate-spin" />
      ) : (
        <Icons.Send />
      )}
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const { toast } = useToast();
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        // Optionally reset form fields here if needed, but useActionState often handles this by re-rendering.
      } else {
        toast({
          title: "Error",
          description: state.message || "Failed to send message.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-left">
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              Your questions, feedback, and suggestions are important to us. We look forward to hearing from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  <Icons.User className="mr-2 h-4 w-4 inline-block align-middle" />
                  Name
                </Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required 
                       defaultValue={state.fields?.name}
                       className="focus-visible:border-transparent"
                />
                {state.issues && state.issues.find(issue => issue.includes("Name")) && (
                  <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes("Name"))}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  <Icons.Mail className="mr-2 h-4 w-4 inline-block align-middle" />
                  Email
                </Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required 
                       defaultValue={state.fields?.email}
                       className="focus-visible:border-transparent"
                />
                 {state.issues && state.issues.find(issue => issue.includes("email")) && (
                  <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes("email"))}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message" className="mb-2 block">
                  <Icons.MessageSquare className="mr-2 h-4 w-4 inline-block align-middle" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                  defaultValue={state.fields?.message}
                  className="focus-visible:border-transparent"
                />
                {state.issues && state.issues.find(issue => issue.includes("Message")) && (
                  <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes("Message"))}</p>
                )}
              </div>
              <SubmitButton />
            </form>
            {/* <!-- AdSense Placeholder: Contact Page Content Area --> */}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-muted-foreground">
          <p>Alternatively, feel free to email us directly at <a href="mailto:support@nymgram.com" className="text-primary hover:underline">support@nymgram.com</a>. We value your communication.</p>
          {/* Add social media links here if desired */}
        </div>
      </div>
    </PageWrapper>
  );
}
