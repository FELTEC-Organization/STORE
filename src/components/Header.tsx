"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
  ChevronUp,
  ChevronDown,
  CircleUserRound,
  Slack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { localstorageService } from "@/services/localstorage.service";
import { AuthContext } from "@/contexts/auth.ctx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { user, handleExitUser } = useContext(AuthContext);

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/produtos" },
  ];

  const isActive = (href: string) => pathname === href;

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  const handleLogout = () => {
    localstorageService.removeDataUserIsLogged();
    handleExitUser();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="dark:text-white font-bold text-lg">
                  <Slack />
                </span>
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </Link>

            {/* Sidebar só aparece se estiver logado */}
            {user?.token && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-1">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                      Área restrita
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-4 px-4">
                    {/* Controle de Usuários */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="users">
                        <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
                          Controle de Usuários
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 flex flex-col gap-2">
                          <Link
                            href="/usuario/admin/novo-usuario"
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            Adicionar Usuário
                          </Link>
                          <Link
                            href="/usuario/admin/lista-usuarios"
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            Listar Usuários
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Produtos */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="products">
                        <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
                          Produtos
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 flex flex-col gap-2">
                          <Link
                            href="/produtos/admin/novo-produto"
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            Adicionar Produto
                          </Link>
                          <Link
                            href="/produtos/admin/lista-produtos"
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            Listar Produtos
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle, User Menu & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
              className="w-9 h-9"
            >
              {getThemeIcon()}
            </Button>

            {/* Só mostra o dropdown se estiver logado */}
            {user?.token && (
              <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2.5 min-h-10 bg-nc-base-800 rounded-[5px] px-2 cursor-pointer mr-1">
                    <CircleUserRound className="min-h-[30px] min-w-[30px]" />
                    <span className="text-sm text-black dark:text-white pr-8">
                      {user?.name}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="rounded shadow-lg min-w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-xs">
                    Version {process.env.NEXT_PUBLIC_APP_VERSION}
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
