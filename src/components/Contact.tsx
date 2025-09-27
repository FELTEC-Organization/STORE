"use client";
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function Contact() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos da Elegance Store.");
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudar você a encontrar a peça perfeita
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, label: "Endereço", value: siteConfig.contact.address },
              { icon: Phone, label: "Telefone", value: siteConfig.contact.phone },
              { icon: Mail, label: "E-mail", value: siteConfig.contact.email },
              { icon: Clock, label: "Horário", value: siteConfig.contact.hours },
            ].map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sunset/20">
                    <Icon className="h-5 w-5 text-sunset" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium">{info.label}</h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="bg-gradient-to-r from-sunset to-sunset-dark p-10 rounded-3xl text-center shadow-lg hover:shadow-[0_15px_35px_var(--color-sunset-dark)] transition-shadow duration-200">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-lg bg-white/20">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Fale Conosco no WhatsApp
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Tire suas dúvidas ou solicite orçamentos rapidamente!
              </p>
              <Button
                onClick={handleWhatsApp}
                variant="secondary"
                size="lg"
                className="bg-white text-sunset hover:bg-white/90 font-semibold px-6 py-4"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chamar no WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}