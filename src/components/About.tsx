"use client";
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section
      id="sobre"
      className="relative py-28 overflow-hidden bg-gradient-to-br from-orange-400 via-sunset to-purple-600"
    >
      {/* Camada de efeito de brilho suave */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Título com gradiente e sombra */}
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent drop-shadow-lg">
            {siteConfig.about.title}
          </h2>

          {/* Linha decorativa animada */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-24 h-1 mx-auto mb-8 bg-white/80 rounded-full origin-left"
          />

          {/* Descrição estilizada */}
          <p className="text-lg md:text-2xl leading-relaxed text-white/90 font-light drop-shadow-md">
            {siteConfig.about.description}
          </p>
        </motion.div>
      </div>

      {/* Ornamento no rodapé da section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
