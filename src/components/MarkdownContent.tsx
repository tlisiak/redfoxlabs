import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className="markdown-content space-y-4 text-left">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-red-fox mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h4 className="font-semibold text-red-fox mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-sm text-red-fox/80 leading-relaxed mb-4">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-red-fox">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;