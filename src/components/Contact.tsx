import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="backdrop-blur-md rounded-2xl p-8 md:p-12 border border-glass shadow-glass"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
              boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground drop-shadow-sm">
              Ready to <span className="text-primary">Transform</span> Your Product?
            </h2>
            <p className="text-xl text-foreground/80 mb-12 drop-shadow-sm">
              Let's discuss how Red Fox Labs can accelerate your product success with strategic consulting 
              and proven leadership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;