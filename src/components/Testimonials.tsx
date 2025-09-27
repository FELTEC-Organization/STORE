"use client";
import { Star } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function Testimonials() {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* Camada sutil de brilho */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255, 200, 120,0.1),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255, 150, 80,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight pb-6 bg-gradient-to-r from-yellow-400 via-sunset to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Avaliações dos clientes
          </h2>
          <p className="text-lg md:text-2xl text-foreground/80 font-light max-w-2xl mx-auto">
            O que nossos clientes dizem sobre nós
          </p>
        </motion.div>

        {/* Grid de Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {siteConfig.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative group bg-card p-8 rounded-3xl border border-sunset/20 shadow-card overflow-hidden transition-all duration-200"
            >
              {/* Glow sutil ao hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0  transition-opacity duration-200 
                              bg-gradient-to-br from-sunset/20 via-sunset/10 to-transparent pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sunset text-sunset" />
                ))}
              </div>

              {/* Conteúdo */}
              <blockquote className="text-foreground/80 italic mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Autor */}
              <div>
                <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
