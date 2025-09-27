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

// Variantes para entrada animada dos cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Por que Mauve é o melhor ecommerce?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-sunset/80">
            Fazemos nosso melhor para oferecer a você uma experiência de compra excepcional, 
            com produtos de alta qualidade e atendimento dedicado.
          </p>
        </motion.div>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  rotateX: 3,
                  rotateY: -3,
                  boxShadow: "0px 10px 35px var(--color-sunset-dark)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group bg-gradient-to-br from-background via-background to-background/90 
                           p-8 rounded-2xl border border-border/50 
                           shadow-card hover:shadow-lg relative overflow-hidden
                           transition-all duration-200"
              >
                {/* Glow Sunset no hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                bg-gradient-to-r from-sunset/20 via-sunset/10 to-transparent pointer-events-none" />

                {/* Ícone */}
                <div className="relative w-12 h-12 bg-sunset/10 rounded-xl flex items-center justify-center mb-6 
                                group-hover:bg-sunset/20 transition-colors duration-200">
                  <Icon className="h-6 w-6 text-sunset" />
                </div>
                
                {/* Título */}
                <h3 className="relative text-xl font-semibold text-foreground mb-4 
                               group-hover:text-sunset transition-colors duration-200">
                  {feature.title}
                </h3>
                
                {/* Descrição */}
                <p className="relative text-muted-foreground leading-relaxed">
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
