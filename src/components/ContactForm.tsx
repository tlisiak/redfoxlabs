import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  project: z.string().min(10, "Please describe your project (at least 10 characters)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

const ContactForm = ({ onSubmitSuccess }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Save to Supabase database
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          project: data.project,
        });

      if (error) {
        throw error;
      }

      // Send email notification to you
      try {
        await supabase.functions.invoke('send-contact-notification', {
          body: {
            name: data.name,
            email: data.email,
            project: data.project,
          }
        });
        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't fail the whole form if email fails
      }

      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out! I'll get back to you at " + data.email + " within 24 hours.",
      });

      reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Error saving contact form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or email me directly at hello@tommylisiak.com",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-red-fox font-medium">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          className="glass-enhanced text-red-fox placeholder:text-red-fox/60 border-red-fox/30"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-red-fox font-medium">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="glass-enhanced text-red-fox placeholder:text-red-fox/60 border-red-fox/30"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project" className="text-red-fox font-medium">Tell me about your project *</Label>
        <Textarea
          id="project"
          {...register("project")}
          className="glass-enhanced text-red-fox placeholder:text-red-fox/60 border-red-fox/30 min-h-[120px]"
          placeholder="Describe your project, goals, timeline, and any specific requirements..."
        />
        {errors.project && (
          <p className="text-sm text-destructive">{errors.project.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="red-fox"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;