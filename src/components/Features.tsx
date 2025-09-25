"use client";
import { Award, Palette, Users, Truck, Headphones, Ruler } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

const iconMap = {
  award: Award,
  palette: Palette,
  users: Users,
  truck: Truck,
  headphones: Headphones,
  ruler: Ruler,
};

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Por que Mauve é o melhor ecommerce?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fazemos nosso melhor para oferecer a você uma experiência de compra excepcional, com produtos de alta qualidade e atendimento dedicado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group bg-gradient-card p-8 rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}