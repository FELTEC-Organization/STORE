export const siteConfig = {
  name: "Sua Loja",
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
  slogan: "Lorem ipsum dolor sit amet",
  
  contact: {
    address: "Lorem Ipsum, 123 - Centro, Cidade - UF",
    phone: "+00 00 00000-0000",
    whatsapp: "000000000000",
    email: "contato@sualoja.com",
    hours: "Segunda a Sexta: 9h às 18h"
  },
  
  social: {
    instagram: "https://instagram.com/sualoja",
    whatsapp: "https://wa.me/000000000000",
    facebook: "https://facebook.com/sualoja", 
    tiktok: "https://tiktok.com/@sualoja"
  },
  
  about: {
    title: "Sobre Nós",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  
  features: [
    {
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod",
      icon: "award"
    },
    {
      title: "Dolor Sit Amet", 
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore",
      icon: "palette"
    },
    {
      title: "Consectetur Adipiscing",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: "users"
    },
    {
      title: "Tempor Incididunt",
      description: "Ut labore et dolore magna aliqua ut enim ad minim veniam quis",
      icon: "truck"
    },
    {
      title: "Magna Aliqua", 
      description: "Ut enim ad minim veniam quis nostrud exercitation ullamco",
      icon: "headphones"
    },
    {
      title: "Nostrud Exercitation",
      description: "Ullamco laboris nisi ut aliquip ex ea commodo consequat",
      icon: "ruler"
    }
  ],
  
  timeline: [
    {
      year: "2010",
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod"
    },
    {
      year: "2015", 
      title: "Dolor Sit Amet",
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt"
    },
    {
      year: "2018",
      title: "Consectetur Adipiscing",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      year: "2021",
      title: "Tempor Incididunt",
      description: "Ut labore et dolore magna aliqua ut enim ad minim veniam"
    },
    {
      year: "2024",
      title: "Magna Aliqua", 
      description: "Ut enim ad minim veniam quis nostrud exercitation ullamco"
    }
  ],
  
  testimonials: [
    {
      name: "Lorem Ipsum",
      role: "Lorem Ipsum",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5
    },
    {
      name: "Dolor Sit",
      role: "Consectetur Adipiscing", 
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
      rating: 5
    },
    {
      name: "Magna Aliqua",
      role: "Tempor Incididunt",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 5
    }
  ]
};

export type SiteConfig = typeof siteConfig;