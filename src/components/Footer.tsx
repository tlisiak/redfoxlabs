import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
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
          
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Explore more of our work:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://tommylisiak.com', '_blank')}
              >
                Tommy Lisiak - Personal Site
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://goalpredict.app', '_blank')}
              >
                GoalPredict - Sports Analytics
              </Button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 Red Fox Labs. Building sustainable product futures.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;