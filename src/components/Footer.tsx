import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-secondary py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-red-fox">Red Fox</span>{" "}
              <span className="text-primary">Labs</span>
            </h3>
            <p className="text-muted-foreground">
              Strategic product consulting for the future.
            </p>
          </div>
          
          
          
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2025 Red Fox Labs. Building sustainable product futures.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;