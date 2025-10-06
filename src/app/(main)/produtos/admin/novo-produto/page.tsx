"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionPhotos from "./SectionPhotos";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/services/api";
import { productSchema, ProductFormValues } from "./schema/schema";
import { MultipleSelect } from "./MultipleSelect";
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
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: undefined,
      categoryId: 0,
      labelId: undefined,
      stock: undefined,
      description: "",
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      setLoading(true);

      const payload: any = {
        name: data.name,
        description: data.description || "",
        categoryId: Number(data.categoryId),
        imageUrl: photoResident ?? null,
      };

      if (data.price !== undefined && data.price !== null) {
        payload.price = Number(data.price).toFixed(2);
      }

      if (data.stock !== undefined && data.stock !== null) {
        payload.stock = data.stock;
      }

      if (data.labelId) {
        payload.labelId = Number(data.labelId);
      }

      if (data.tags && data.tags.length > 0) {
        payload.tags = data.tags;
      }

      await apiRequest("Products", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("Produto cadastrado com sucesso!");
      reset();
      setPhotoResident(null);
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar produto: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (!userData) return router.push("/not-found");
    const parsed = JSON.parse(userData);
    if (!parsed.token) return router.push("/not-found");
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
        <div className="w-1/2">
          <SectionPhotos
            photoResident={photoResident}
            setPhotoResident={setPhotoResident}
          />
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="price">Preço</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => {
                const formatCurrency = (value: number | undefined) => {
                  if (value === undefined || isNaN(value)) return "";
                  return value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });
                };

                const parseCurrency = (value: string) => {
                  if (!value) return undefined;
                  const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
                  const number = parseFloat(cleaned);
                  return isNaN(number) ? undefined : number;
                };

                return (
                  <Input
                    id="price"
                    placeholder="R$ 0,00"
                    type="text"
                    value={formatCurrency(field.value)}
                    onChange={(e) => field.onChange(parseCurrency(e.target.value))}
                  />
                );
              }}
            />
            {errors.price && (
              <span className="text-red-600">{errors.price.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="categoryId">Categoria</Label>
            <MultipleSelect
              fetchItems={getCategories}
              createItem={postCategory}
              labelKey="name"
              valueKey="id"
              single
              value={watch("categoryId") ? String(watch("categoryId")) : undefined}
              onChange={(val) => setValue("categoryId", Number(val))}
              placeholder="Selecione ou crie uma categoria"
            />
            {errors.categoryId && (
              <span className="text-red-600">{errors.categoryId.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="labelId">Label</Label>
            <MultipleSelect
              fetchItems={getLabels}
              createItem={postLabel}
              labelKey="name"
              valueKey="name"
              multiple
              value={(watch("tags") ?? []).map(String)}
              onChange={(val) =>
                setValue("tags", Array.isArray(val) ? val.map(String) : [String(val)])
              }
              placeholder="Selecione ou crie tags (nomes)"
            />
          </div>

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
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : parseInt(e.target.value)
                    )
                  }
                />
              )}
            />
            {errors.stock && (
              <span className="text-red-600">{errors.stock.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <span className="text-red-600">{errors.description.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
          <Save className="mr-2" />
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
