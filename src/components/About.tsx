"use client";
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {siteConfig.about.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {siteConfig.about.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}