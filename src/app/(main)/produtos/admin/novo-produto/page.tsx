"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionPhotos from "@/components/UploadPhotos";
import { productSchema, TCreateProductSchema } from "./schema/schema";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/components/toast/showToast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const {
  register,
  control,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm<TCreateProductSchema>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    name: "",
    price: 0,
    category: "",
    stock: 0,
    description: "",
  },
});


export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-produtos-feltec.onrender.com/api/Products";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const userData = localStorage.getItem("@NPG-auth-user-data");
  const token = userData ? JSON.parse(userData).token : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Erro ao comunicar com a API");
  }

  return res.json();
}


    // Formatação de preço para reais
    const handlePriceChange = (value: string) => {
        // Remove tudo que não é número
        const numericValue = value.replace(/\D/g, "");
        // Converte para centavos e formata
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(numericValue) / 100);
        setValue("price", Number(numericValue) / 100);
        return formatted;
    };

    const onSubmit = async (data: TCreateProductSchema) => {
        setLoading(true);
        try {
            console.log("Produto criado:", data);
            showToast({
                type: "success",
                title: "Produto salvo com sucesso!",
                description: "Os dados do produto foram salvos.",
            });
            onDataFilled?.(data);
            reset();
        } catch (err) {
            showToast({
                type: "error",
                title: "Erro ao salvar produto.",
                description: "Ocorreu um erro ao tentar salvar os dados do produto.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Opções fictícias de categoria
    const categories = [
        { id: "eletronicos", name: "Eletrônicos" },
        { id: "moveis", name: "Móveis" },
        { id: "roupas", name: "Roupas" },
        { id: "outros", name: "Outros" },
    ];

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
            {loading && (
                <div className="absolute inset-0 bg-background bg-opacity-50 flex items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin" />
                </div>
            )}

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4">
                    {/* Cabelhaço */}
                    <div className="text-center md:text-left mx-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                            Cadastro de Produto
                        </h1>
                        <p className="text-sm md:text-base !text-sunset">
                            Preencha os dados do produto e faça upload da foto
                        </p>
                    </div>
                    {/* Parte superior: SectionPhotos + Forms */}
                    <div className="flex gap-4">
                        {/* SectionPhotos à esquerda */}
                        <div className="w-1/2 px-4">
                            <SectionPhotos
                                photoResident={photoResident}
                                setPhotoResident={setPhotoResident}
                            />
                        </div>

                        <div className="w-1/2 flex flex-col gap-4 space-y-4">
                            {/* Nome do produto */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="name">Nome do Produto</Label>
                                <Input
                                    id="name"
                                    placeholder="Nome do produto"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            {/* Preço */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="price">Preço</Label>
                                <Controller
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="price"
                                            placeholder="R$ 0,00"
                                            onChange={(e) => {
                                                const formatted = handlePriceChange(e.target.value);
                                                e.target.value = formatted;
                                            }}
                                        />
                                    )}
                                />
                                {errors.price && (
                                    <span className="text-red-600 text-sm">
                                        {errors.price.message}
                                    </span>
                                )}
                            </div>

                            {/* Categoria como Select */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="category">Categoria</Label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="category" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && (
                                    <span className="text-red-600 text-sm">
                                        {errors.category.message}
                                    </span>
                                )}
                            </div>

                            {/* Estoque */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="stock">Estoque</Label>
                                <Controller
                                    control={control}
                                    name="stock"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="stock"
                                            type="number"
                                            placeholder="0"
                                            step="1"
                                        />
                                    )}
                                />
                                {errors.stock && (
                                    <span className="text-red-600 text-sm">
                                        {errors.stock.message}
                                    </span>
                                )}
                            </div>

                            {/* Descrição */}
                            <div className="flex flex-col space-y-2 md:col-span-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    className="shadow-md"
                                    placeholder="Descrição do produto"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <span className="text-red-600 text-sm">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão salvar */}
                <div className="flex justify-end">
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading} variant="sunset">
                        <Save className="mr-2" />
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </div>
        </>
    );
}
