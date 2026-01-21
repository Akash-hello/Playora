import { useState } from "react";
import { Gamepad2, Send, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Gamepad2 className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-display text-xl font-bold tracking-wider">
              <span className="text-gradient">GAME</span>
              <span className="text-foreground">HUB</span>
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Contact Us
              </h1>
              <p className="mt-3 text-muted-foreground">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Your Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what's on your mind..."
                  className="min-h-[150px] resize-none border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-gaming h-12 w-full gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-12 rounded-xl border border-border bg-card/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                You can also reach us at{" "}
                <a
                  href="mailto:support@gamehub.com"
                  className="text-primary hover:underline"
                >
                  support@gamehub.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
