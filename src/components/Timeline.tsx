"use client";
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function Timeline() {
  return (
    <section className="relative py-28 overflow-hidden transition-colors duration-500">
      {/* Camada decorativa de brilho */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.25),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.25),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-yellow-600 via-sunset to-pink-500 dark:from-yellow-200 dark:via-sunset dark:to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
            Nossa História
          </h2>
          <p className="text-lg md:text-2xl text-foreground/80 dark:text-white/90 font-light max-w-2xl mx-auto">
            Caminho que percorremos juntos até aqui
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Linha central com animação pulsante */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-sunset/70 dark:bg-sunset/70 rounded-full origin-top"
          />

          {siteConfig.timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-20 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot da timeline com efeito glow */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-sunset to-sunset-dark dark:from-sunset dark:to-sunset-dark rounded-full shadow-[0_0_20px_rgba(255,200,120,0.9)] border-2 border-white dark:border-gray-900 z-20"
              />

              {/* Conteúdo */}
              <div
                className={`mt-6 md:mt-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}
              >
                <div className="backdrop-blur-md bg-white/60 dark:bg-gray-900/40 border border-sunset/80 dark:border-sunset/30 rounded-3xl shadow-xl p-8 transition hover:scale-[1.02] hover:shadow-2xl duration-300">
                  <div className="text-2xl font-bold text-sunset/80 dark:text-sunset mb-2 drop-shadow">
                    {item.year}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fade no final para suavizar a transição */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
