import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-background/95 backdrop-blur-sm border-border/50 max-w-md mx-auto [&>button]:text-red-fox [&>button]:hover:text-red-fox-hover">
        <DialogHeader>
          <DialogTitle className="text-red-fox text-2xl font-bold text-center">
            Let's Chat About Your Project
          </DialogTitle>
          <DialogDescription className="text-red-fox/80 text-center">
            Tell me about your project and I'll get back to you within 24 hours
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <ContactForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;