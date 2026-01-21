import { Gamepad2, Mail, FileText, Shield, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { icon: Mail, label: "Contact Us", href: "/contact" },
    { icon: Shield, label: "Privacy Policy", href: "#privacy" },
    { icon: FileText, label: "Documents", href: "#docs" },
    { icon: Briefcase, label: "Internship", href: "#internship" },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Gamepad2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className="text-gradient">GAME</span>
              <span className="text-foreground">HUB</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {footerLinks.map(({ icon: Icon, label, href }) => (
              href.startsWith("/") ? (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              )
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 GameHub. All rights reserved. Play amazing HTML5 games.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
