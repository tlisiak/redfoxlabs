import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const faqs: FAQ[] = [
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-3 weeks from our first conversation to launch. This includes time for feedback, revisions, and testing. Rush projects are available if you have an urgent deadline."
    },
    {
      question: "How much does a website cost?",
      answer: "Projects typically start around $2,500-$5,000 depending on complexity and features. No hidden fees, no subscriptions. You pay once, you own it."
    },
    {
      question: "Can I update the website myself?",
      answer: "Absolutely! Part of my process is teaching you how to manage your own site. I build sites to be easy to update, and I provide training and documentation so you're never dependent on me for simple changes."
    },
    {
      question: "How long until I see SEO results?",
      answer: "Google Business Profile improvements can show results in 2-4 weeks. Overall ranking improvements typically take 2-3 months. SEO is a marathon, not a sprint, but the results are worth it and compound over time."
    },
    {
      question: "Do I need ongoing services?",
      answer: "I set everything up and teach you how to maintain it yourself. Some businesses prefer ongoing help, but it's not required. I design my work to be sustainable without constant paid support."
    },
    {
      question: "Is Google Analytics free?",
      answer: "Yes! Google Analytics is free for small businesses. You only pay me to set it up correctly and teach you how to use it. There are also privacy-focused alternatives we can use if you prefer."
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 bg-background scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={String(index + 1)} 
              className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20"
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
