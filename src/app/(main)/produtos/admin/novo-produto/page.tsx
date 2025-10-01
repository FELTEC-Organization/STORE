"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionPhotos from "@/components/UploadPhotos";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/services/api";
import { productSchema, ProductFormValues } from "./schema/schema";
import { MultipleSelect } from "@/app/(main)/produtos/admin/novo-produto/MultipleSelect";
import { getCategories, postCategory } from "@/services/categories";
import { getLabels, postLabel } from "@/services/labels";

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [photoResident, setPhotoResident] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
      tags: [],
    },
  });

  // 🔹 Submissão
  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      setLoading(true);

      const payload = {
        name: data.name,
        price: data.price.toString(),
        categoryId: Number(data.category), // categoria única
        stock: data.stock,
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags.map(Number) : [],
      };

      await apiRequest("Products", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("Produto cadastrado com sucesso!");
      reset();
      setPhotoResident(null);
    } catch (error: any) {
      console.error(error);
      alert(
        "Erro ao cadastrar produto: " + (error.message || "Erro desconhecido")
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Autorização
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
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="space-y-6 p-4">
      {loading && (
        <div className="absolute inset-0 bg-background bg-opacity-50 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin" />
        </div>
      )}

      <h1 className="text-2xl font-extrabold">Cadastro de Produto</h1>

      <div className="flex gap-4">
        {/* Upload de Foto */}
        <div className="w-1/2">
          <SectionPhotos
            photoResident={photoResident}
            setPhotoResident={setPhotoResident}
          />
        </div>

        {/* Formulário */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* Preço */}
          <div>
            <Label htmlFor="price">Preço</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  id="price"
                  placeholder="R$ 0,00"
                  type="number"
                  step="0.01"
                  min={0}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : parseFloat(val));
                  }}
                />
              )}
            />
            {errors.price && (
              <span className="text-red-600">{errors.price.message}</span>
            )}
          </div>

          {/* Categoria (SingleSelect) */}
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <MultipleSelect
                  control={control}
                  name="category"
                  fetchItems={getCategories}
                  createItem={postCategory}
                  labelKey="name"
                  valueKey="id"
                  placeholder="Selecione ou crie uma categoria"
                  single
                  onChange={(val: string) => setValue("category", val)}
                  value={watch("category")} 
                />
              )}
            />
            {errors.category && (
              <span className="text-red-600">{errors.category.message}</span>
            )}
          </div>

          {/* Tags (MultiSelect) */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <MultipleSelect
                  control={control}
                  name="tags"
                  fetchItems={getLabels}
                  createItem={postLabel}
                  labelKey="name"
                  valueKey="id"
                  placeholder="Selecione ou crie tags"
                  multiple
                  onChange={(val: string[]) => setValue("tags", val)}
                  value={watch("tags")}
                />
              )}
            />
            {errors.tags && (
              <span className="text-red-600">{errors.tags.message}</span>
            )}
          </div>

          {/* Estoque */}
          <div>
            <Label htmlFor="stock">Estoque</Label>
            <Controller
              control={control}
              name="stock"
              render={({ field }) => (
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : parseInt(val));
                  }}
                />
              )}
            />
            {errors.stock && (
              <span className="text-red-600">{errors.stock.message}</span>
            )}
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <span className="text-red-600">{errors.description.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Botão */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
          <Save className="mr-2" />
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
