import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatBubble from "@/components/shared/ChatBubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, MessageSquare, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

const suggestedQuestions = [
  "How can I improve my chances of getting a senior developer role?",
  "What skills should I prioritize learning next?",
  "Can you review my skill gap analysis?",
  "What are the best resources for learning system design?",
];

const Advisor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Career Advisor. I can help you with career guidance, skill development advice, interview preparation, and more. How can I assist you today?",
      isBot: true,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        isBot: true,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("senior") || lowerQuery.includes("role")) {
      return "To become a senior developer, focus on these key areas:\n\n1. **Technical Excellence**: Master your core technologies and learn system design patterns.\n\n2. **Leadership Skills**: Start mentoring junior developers and leading small projects.\n\n3. **Communication**: Practice explaining complex technical concepts clearly.\n\n4. **Business Acumen**: Understand how your work impacts business outcomes.\n\nBased on your current skill profile, I recommend focusing on TypeScript and Testing first, as these show the largest gaps for senior roles.";
    }

    if (lowerQuery.includes("skill") || lowerQuery.includes("learn")) {
      return "Based on your skill gap analysis, here are my recommendations in order of priority:\n\n1. **Testing (Jest/RTL)** - High priority gap\n   - This is essential for senior roles\n   - Start with unit tests, then integration tests\n\n2. **TypeScript Advanced** - Medium priority\n   - You have basics, time for advanced patterns\n\n3. **System Design** - High priority for senior roles\n   - Begin with fundamental concepts\n\nWould you like me to create a detailed learning plan for any of these?";
    }

    if (lowerQuery.includes("interview") || lowerQuery.includes("prepare")) {
      return "Great question! Here's how to prepare for technical interviews:\n\n**Technical Preparation**:\n- Practice coding challenges on LeetCode/HackerRank\n- Review system design concepts\n- Prepare to discuss your projects in depth\n\n**Behavioral Preparation**:\n- Use the STAR method for behavioral questions\n- Prepare examples of challenges you've overcome\n- Research the company's tech stack and culture\n\n**During the Interview**:\n- Think out loud to show your problem-solving process\n- Ask clarifying questions\n- Don't be afraid to say \"I don't know, but here's how I'd find out\"\n\nWould you like to do a mock interview practice?";
    }

    return "That's a great question! Based on your profile and career goals, here are my thoughts:\n\nYour current skill set shows strong frontend fundamentals, which is excellent. To maximize your career growth, I recommend:\n\n1. Building on your React expertise with TypeScript\n2. Expanding into testing to improve code quality\n3. Learning system design for architectural decisions\n\nIs there a specific area you'd like me to elaborate on?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <div className="p-2 rounded-xl gradient-primary">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Career Advisor</h1>
            <p className="text-sm text-muted-foreground">
              Get personalized career guidance and advice
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="py-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Lightbulb className="h-4 w-4" />
              Suggested questions
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="px-3 py-2 rounded-lg bg-muted text-sm hover:bg-muted/80 transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="pt-4 border-t border-border">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your career..."
              className="min-h-[56px] max-h-[200px] resize-none"
              rows={1}
            />
            <Button
              variant="gradient"
              size="icon"
              className="h-14 w-14 shrink-0"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Advisor;
