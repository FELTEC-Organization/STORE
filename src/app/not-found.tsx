"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Página não encontrada</p>
        <Link href="/">
          <Button>
            Voltar ao Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
