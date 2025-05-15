
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
// import { APP_NAME } from '@/lib/constants'; // APP_NAME is used in metadata which is commented out

// Static metadata can be defined if this were a server component or in a layout
// export const metadata: Metadata = {
//   title: `Contact Us | ${APP_NAME}`,
//   description: `Get in touch with the ${APP_NAME} team. Send us your feedback, suggestions, or inquiries.`,
// };


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const { toast } = useToast();
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        // Optionally reset form fields here if needed, by managing local state for inputs
        // or by resetting the form element itself. For this example, we rely on page reload or navigation.
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
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required 
                       defaultValue={state.fields?.name}
                />
                {state.issues && state.issues.find(issue => issue.includes("Name")) && (
                  <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes("Name"))}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required 
                       defaultValue={state.fields?.email}
                />
                 {state.issues && state.issues.find(issue => issue.includes("email")) && (
                  <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes("email"))}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                  defaultValue={state.fields?.message}
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
          <p>You can also reach us via email at: <a href="mailto:support@nymgram.com" className="text-primary hover:underline">support@nymgram.com</a></p>
          {/* Add social media links here if desired */}
        </div>
      </div>
    </PageWrapper>
  );
}
