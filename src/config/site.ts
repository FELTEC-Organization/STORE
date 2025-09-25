export const siteConfig = {
  name: "Mauve Store",
  description: "A Mauve Store é um ecommerce moderno que une tecnologia, estilo e praticidade para oferecer a melhor experiência de compra online.",
  slogan: "Seu estilo, sua tendência.",

  contact: {
    address: "Av. das Nações, 1450 - Centro, Sorocaba - SP",
    phone: "+55 (15) 3222-4455",
    whatsapp: "5515999887766",
    email: "contato@mauvestore.com.br",
    hours: "Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h"
  },

  social: {
    instagram: "https://instagram.com/mauvestore",
    whatsapp: "https://wa.me/5515999887766",
    facebook: "https://facebook.com/mauvestore",
    tiktok: "https://tiktok.com/@mauvestore"
  },

  about: {
    title: "Sobre a Mauve Store",
    description:
      "Fundada com o objetivo de transformar a forma como as pessoas compram online, a Mauve Store é uma loja virtual focada em estilo, inovação e praticidade. Nosso compromisso é oferecer produtos de qualidade com uma experiência de compra simples, rápida e segura."
  },

  features: [
    {
      title: "Qualidade Garantida",
      description: "Selecionamos apenas fornecedores e produtos confiáveis para garantir a satisfação de nossos clientes.",
      icon: "award"
    },
    {
      title: "Design Moderno",
      description: "Uma loja pensada para ser intuitiva, bonita e responsiva em qualquer dispositivo.",
      icon: "palette"
    },
    {
      title: "Atendimento Humanizado",
      description: "Equipe de suporte sempre disponível para ajudar em cada etapa da sua compra.",
      icon: "users"
    },
    {
      title: "Entrega Rápida",
      description: "Parcerias com transportadoras garantem agilidade e segurança nas entregas.",
      icon: "truck"
    },
    {
      title: "Suporte Multicanal",
      description: "Fale conosco por e-mail, WhatsApp ou redes sociais com rapidez e praticidade.",
      icon: "headphones"
    },
    {
      title: "Experiência Personalizada",
      description: "Tecnologia aplicada para recomendar produtos de acordo com seu estilo e preferências.",
      icon: "ruler"
    }
  ],

  timeline: [
    {
      year: "2016",
      title: "O Início",
      description: "A Mauve Store nasce como um pequeno projeto de ecommerce local."
    },
    {
      year: "2018",
      title: "Expansão",
      description: "Ampliamos nosso catálogo e conquistamos clientes em todo o estado de São Paulo."
    },
    {
      year: "2020",
      title: "Transformação Digital",
      description: "Atualizamos nossa plataforma para oferecer uma experiência ainda mais rápida e intuitiva."
    },
    {
      year: "2022",
      title: "Reconhecimento",
      description: "A Mauve Store passa a ser referência em ecommerce de moda e lifestyle."
    },
    {
      year: "2024",
      title: "Presente e Futuro",
      description: "Continuamos inovando e investindo em tecnologia para oferecer sempre a melhor experiência."
    }
  ],

  testimonials: [
    {
      name: "Camila Ferreira",
      role: "Cliente",
      content: "Adorei a experiência de compra! O site é super fácil de usar e meu pedido chegou antes do prazo.",
      rating: 5
    },
    {
      name: "Lucas Andrade",
      role: "Cliente",
      content: "Produtos de excelente qualidade e um atendimento diferenciado. Com certeza voltarei a comprar!",
      rating: 5
    },
    {
      name: "Mariana Souza",
      role: "Cliente",
      content: "Gostei muito da variedade e dos preços justos. A Mauve Store virou minha loja online favorita.",
      rating: 5
    }
  ]
};

export type SiteConfig = typeof siteConfig;
