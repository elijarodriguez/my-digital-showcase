const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">©</span> {new Date().getFullYear()} — Built with purpose & precision
      </p>
      <div className="flex items-center gap-6">
        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
          GitHub
        </a>
        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
          LinkedIn
        </a>
        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
          Twitter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
