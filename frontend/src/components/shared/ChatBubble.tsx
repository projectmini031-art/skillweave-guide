import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isBot?: boolean;
  timestamp?: string;
}

const ChatBubble = ({ message, isBot = false, timestamp }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          isBot ? "gradient-primary" : "bg-accent"
        )}
      >
        {isBot ? (
          <Bot className="h-5 w-5 text-primary-foreground" />
        ) : (
          <User className="h-5 w-5 text-accent-foreground" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3",
          isBot
            ? "bg-card border border-border rounded-tl-sm"
            : "gradient-primary text-primary-foreground rounded-tr-sm"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p
            className={cn(
              "text-xs mt-2",
              isBot ? "text-muted-foreground" : "text-primary-foreground/70"
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
