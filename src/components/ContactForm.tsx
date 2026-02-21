import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

type FormState = "idle" | "loading" | "success";

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [state, setState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, description }),
      });

      if (res.ok) {
        setState("success");
        toast.success("Message sent! We'll be in touch soon.");
        setTimeout(() => onSuccess?.(), 1200);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setState("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <p className="text-3xl font-handwritten text-red-fox mb-2">Got it!</p>
        <p className="text-muted-foreground">
          We'll reach out to <span className="text-foreground font-medium">{email}</span> soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="text-lg font-semibold text-foreground mb-5">
        Tell us what you're working on
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="flex-1">
          <label htmlFor="cf-name" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-2xl border border-brown-outline/30 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-fox/40 focus:border-red-fox/60 transition-all text-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="cf-email" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-2xl border border-brown-outline/30 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-fox/40 focus:border-red-fox/60 transition-all text-sm"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="cf-description" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
          What are you building?
        </label>
        <textarea
          id="cf-description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Give us a quick overview — what's the idea, where you're at, and what kind of help you need."
          className="w-full px-4 py-2.5 rounded-2xl border border-brown-outline/30 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-fox/40 focus:border-red-fox/60 transition-all text-sm resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        variant="organic"
        disabled={state === "loading"}
        className="w-full text-base py-5"
      >
        {state === "loading" ? "Sending…" : "Let's build →"}
      </Button>
    </form>
  );
};

export default ContactForm;
