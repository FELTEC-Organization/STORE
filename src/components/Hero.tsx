"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Hero() {
  const { theme } = useTheme();

  const backgroundOpacity = theme === "light" ? 0.9 : 0.3;
  return (
    <section className="relative mt-10 w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/90 to-background">
      {/* Fundo com gradiente animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundOpacity }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,127,45,0.3),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(0,128,255,0.25),transparent_70%)] blur-3xl"
      />

      {/* Grid principal */}
      <div className="relative z-10 mb-16 container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Coluna esquerda - Conteúdo */}
        <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight text-foreground drop-shadow-md"
          >
            Sua experiência{" "}
            <span className="bg-gradient-to-r from-sunset to-sunset/50 bg-clip-text text-transparent animate-gradient">
              de compra
            </span>{" "}
            começa aqui
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center"
          >
            <Button
              asChild
              size="lg"
              variant="sunset"
              className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Link href="/produtos">
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="adventure"
              className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Link href="#sobre">Saiba Mais</Link>
            </Button>
          </motion.div>
        </div>

        {/* Coluna direita - Lottie */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-full h-hull"
        >
          <DotLottieReact
            src="/shopping.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      </div>

      {/* Efeito de shapes animados no fundo */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-sunset/20 blur-2xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-32 left-10 w-32 h-32 rounded-full bg-adventure/20 blur-2xl"
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-sunset/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-sunset/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
