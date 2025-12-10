import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-3 weeks from our first conversation to launch. This includes time for feedback, revisions, and testing."
    },
    {
      question: "How much does a website cost?",
      answer: "Projects typically start around $2,500-$5,000 depending on complexity. No hidden fees, no subscriptions—you pay once, you own it."
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
    <section id="faq" className="py-16 sm:py-20 px-4 bg-warm-beige scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Common questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={String(index + 1)} 
              className="bg-background rounded-lg px-6 border border-brown-outline/10"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
