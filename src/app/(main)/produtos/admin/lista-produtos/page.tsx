"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePlus, Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import Image from "next/image";
import { getColumns } from "./components/columns";

export default function ListProducts() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [refetchTable, setRefetchTable] = useState<() => void>(() => () => {});

  const [appliedFilters, setAppliedFilters] = useState<{ value?: string }>({
    value: "",
  });

  const debouncedProductName = useDebounce(productName, 500);

  useEffect(() => {
    setAppliedFilters({ value: debouncedProductName });
  }, [debouncedProductName]);

  useEffect(() => {
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (!userData) {
      router.push("/not-found");
      return;
    }

    const parsed = JSON.parse(userData);
    if (!parsed.token) {
      router.push("/not-found");
      return;
    }

    setAuthorized(true);
  }, []);

  if (!authorized) return null;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gradient-to-r from-indigo-50 to-white dark:from-adventure/10 dark:to-zinc-950 rounded-xl shadow-lg gap-8">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground drop-shadow-sm">
            Gerenciamento de Produtos
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Controle e organize seu inventário de produtos de forma eficiente.
            Adicione, edite e remova itens com facilidade para manter seus dados
            sempre atualizados.
          </p>
          <Button
            className="bg-sunset text-white px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 hover:scale-105"
            onClick={() => router.push("/produtos/admin/novo-produto")}
          >
            <SquarePlus className="w-5 h-5 mr-2" /> Adicionar Novo Produto
          </Button>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/productAdm.png"
            alt="Ilustração de produtos"
            width={500}
            height={350}
            className="max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 p-4 bg-background rounded-lg shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="pl-10 border border-border/30 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg transition-all w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/produtos/admin/novo-produto")}
            className="bg-sunset text-white px-4 py-2 rounded-lg shadow transition-all hover:-translate-y-0.5"
          >
            <SquarePlus className="w-4 h-4 mr-2" /> Criar novo produto
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto mt-2 pb-4 rounded-lg bg-background">
        <DataTable
          filters={appliedFilters}
          columns={getColumns(() => refetchTable?.())}
          onSelectionChange={setSelectedRows}
          onRefresh={(setRefetch) => setRefetchTable(() => setRefetch)}
        />
      </div>
    </>
  );
}

