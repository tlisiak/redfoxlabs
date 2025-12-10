import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaveDivider } from "@/components/ui/WaveDivider";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-3 weeks from our first conversation to launch. This includes time for feedback, revisions, and testing."
    },
    {
      question: "How much does a website cost?",
      answer: "Projects start at $999 depending on complexity. No hidden fees, no subscriptions—you pay once, you own it."
    },
    {
      question: "Can I update the website myself?",
      answer: "Absolutely! I teach you how to manage your own site and provide documentation so you're never dependent on me for simple changes."
    },
    {
      question: "Do you work with clients outside the Bay Area?",
      answer: "Yes, on a case-by-case basis. While I'm based in the Bay Area, I work with select clients remotely."
    },
  ];

  return (
    <section id="faq" className="relative py-16 sm:py-20 px-4 bg-background paper-texture scroll-mt-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-warm-beige/50 blob animate-blob opacity-50" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-fox/5 blob animate-blob opacity-40" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <p className="font-handwritten text-2xl text-red-fox text-center mb-2">Got questions?</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Common questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={String(index + 1)} 
              className="card-organic bg-background px-6 border-0"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-red-fox transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Wavy divider */}
      <WaveDivider color="hsl(var(--red-fox))" className="mt-16" />
    </section>
  );
};

export default FAQSection;
