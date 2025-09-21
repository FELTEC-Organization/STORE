import Link from 'next/link';
import { Instagram, MessageCircle, Facebook } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = {
    instagram: Instagram,
    whatsapp: MessageCircle,
    facebook: Facebook,
    tiktok: MessageCircle, // Using MessageCircle as placeholder for TikTok
  };

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteConfig.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                {siteConfig.contact.phone}
              </li>
              <li className="text-muted-foreground">
                {siteConfig.contact.email}
              </li>
              <li className="text-muted-foreground">
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Desenvolvido com ❤️ para sua casa dos sonhos
          </p>
        </div>
      </div>
    </footer>
  );
}