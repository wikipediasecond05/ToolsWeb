'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // In a real application, you would send an email or save to a database here.
  // For example:
  // try {
  //   await sendEmail({
  //     to: 'your-email@example.com',
  //     subject: `New contact from ${parsed.data.name}`,
  //     html: `<p>Name: ${parsed.data.name}</p><p>Email: ${parsed.data.email}</p><p>Message: ${parsed.data.message}</p>`,
  //   });
  // } catch (error) {
  //   return { message: "Failed to send message. Please try again later.", success: false };
  // }

  console.log('Contact form submitted:', parsed.data);

  return { message: "Thank you for your message! We'll get back to you soon.", success: true };
}
