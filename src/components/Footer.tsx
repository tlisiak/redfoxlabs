import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer 
      className="relative py-12"
      style={{
        backgroundImage: `url(/lovable-uploads/01d6f49c-1f11-4eb2-8c13-d9e6b5c66542.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div 
            className="backdrop-blur-md rounded-2xl p-8 border border-glass shadow-glass max-w-lg mx-auto"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
              boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-red-fox drop-shadow-sm">Red Fox</span>{" "}
                <span className="text-primary drop-shadow-sm">Labs</span>
              </h3>
              <p className="text-foreground/80">
                Strategic product consulting for the future.
              </p>
            </div>
            
            <div className="pt-8 border-t border-glass">
              <p className="text-sm text-foreground/70">© 2025 Red Fox Labs. Building sustainable product futures.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;