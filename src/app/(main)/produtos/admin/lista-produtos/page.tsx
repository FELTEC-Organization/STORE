"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePlus, Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import Image from "next/image";

export default function ListProducts() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // Chave para forçar a atualização da tabela
  const [refetchTable, setRefetchTable] = useState<() => void>(() => () => {});

  const [appliedFilters, setAppliedFilters] = useState<{ value?: string }>({
    value: "",
  });

  const debouncedProductName = useDebounce(productName, 500);

  useEffect(() => {
    setAppliedFilters({
      value: debouncedProductName,
    });
  }, [debouncedProductName]);

  useEffect(() => {
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (!userData) {
      router.push("/not-found"); // redireciona para 404 fake
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
      <div className="flex flex-col md:flex-row items-center justify-between px-30 p-16 rounded-lg shadow-md">
        {/* Lado esquerdo: texto e botão */}
        <div className="md:w-1/2">
          <h2 className="text-6xl font-bold mb-4">Gerenciamento de Produtos</h2>
          <p className="text-gray-600 mb-6">
            Controle e organize seu inventário de produtos de forma eficiente.
            Adicione, edite e remova itens com facilidade para manter seus dados
            sempre atualizados.
          </p>
          <Button className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition">
            Adicionar Novo Produto
          </Button>
        </div>

        {/* Lado direito: imagem/ilustração */}
        <Image
          src="/productAdm.png"
          alt="Ilustração de produtos"
          width={500}
          height={350}
          className="max-w-full h-auto rounded-xl"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/users/user-profiles/create-profile")}
          >
            <SquarePlus className="w-4 h-4 mr-2" /> Criar novo produto
          </Button>
        </div>
      </div>

      {/* Tabela de dados */}
      <div className="overflow-x-auto mt-4">
        <DataTable
          filters={appliedFilters}
          onSelectionChange={setSelectedRows}
          onRefresh={(setRefetch) => {
            setRefetchTable(() => setRefetch);
          }}
        />
      </div>
    </>
  );
}
