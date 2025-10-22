import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContentSection } from "@/hooks/useContentSection";
import { Loader2 } from "lucide-react";

interface ContentSectionModalProps {
  children: ReactNode;
  sectionKey: string;
  title: string;
  description: string;
}

const ContentSectionModal = ({
  children,
  sectionKey,
  title,
  description,
}: ContentSectionModalProps) => {
  const { data, isLoading, error } = useContentSection(sectionKey);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background/95 backdrop-blur-sm border-border/50 max-w-3xl max-h-[85vh] overflow-y-auto [&>button]:text-red-fox [&>button]:hover:text-red-fox-hover">
        <DialogHeader>
          <DialogTitle className="text-red-fox text-3xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-red-fox/80 text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-fox" />
          </div>
        )}

        {error && (
          <div className="text-red-fox/60 py-8 text-center">
            Unable to load content. Please try again.
          </div>
        )}

        {data && (
          <div className="space-y-8 py-4">
            {/* Opening Hook */}
            <p className="text-lg leading-relaxed text-red-fox/90 italic border-l-4 border-red-fox/30 pl-4 py-2">
              {data.opening_hook}
            </p>

            {/* Content Items */}
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-red-fox/5 rounded-lg p-6 border border-red-fox/10 hover:border-red-fox/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-fox/10"
                >
                  {/* Item number badge */}
                  <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-red-fox text-background flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-red-fox mb-3 group-hover:text-red-fox-hover transition-colors">
                    {item.heading}
                  </h3>
                  <p className="text-red-fox/80 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContentSectionModal;
