import Link from 'next/link';
import { Instagram, MessageCircle, Facebook, Slack } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-sunset to-sunset-dark rounded-lg flex items-center justify-center">
                <Slack className="text-white h-5 w-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-4">
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
            © {currentYear} FELTEC. Todos os direitos reservados.
            {/* © {currentYear} {siteConfig.name}. Todos os direitos reservados. */}
          </p>
          <p className="text-muted-foreground text-sm">
            Desenvolvido pela equipe FELTEC
          </p>
        </div>
      </div>
    </footer>
  );
}