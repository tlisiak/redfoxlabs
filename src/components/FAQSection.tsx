import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
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
    <section id="faq" className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 bg-background scroll-mt-20 overflow-hidden">
      {/* Single ambient blob */}
      <div className="absolute top-10 right-0 w-48 h-48 bg-warm-beige/30 blob animate-blob opacity-20" />
      
      <div className="max-w-2xl mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-handwritten text-2xl text-red-fox mb-2">Got questions?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Common questions
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={String(index + 1)} 
              className={`card-organic bg-background px-6 border-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 80 + 100}ms` }}
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
      
      {/* Subtle wavy divider */}
      <WaveDivider color="hsl(var(--red-fox))" className="mt-8" opacity={0.6} />
    </section>
  );
};

export default FAQSection;
