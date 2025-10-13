"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import SectionPhotos from "@/components/UploadPhotos";
import { MultipleSelect } from "./MultipleSelect";
import { apiRequest } from "@/services/api";
import { getCategories, postCategory } from "@/services/categories";
import { getLabels, postLabel } from "@/services/labels";
import { productSchema, ProductFormValues } from "./schema/schema";
import { showToast } from "@/components/toast/showToast";

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

      if (data.price != null) payload.price = Number(data.price).toFixed(2);
      if (data.stock != null) payload.stock = data.stock;
      if (data.labelId) payload.labelId = Number(data.labelId);
      if (data.tags && data.tags.length > 0) {
        payload.labelIds = data.tags.map((id) => Number(id));
      }
      await apiRequest("Products", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      showToast({
        type: "success",
        title: "Produto cadastrado!",
        description: "Dados salvos com sucesso.",
      });
      reset();
      setPhotoResident(null);
    } catch (err: any) {
      console.error(err);
      showToast({
        type: "error",
        title: "Erro ao cadastrar produto",
        description: err?.message ?? String(err),
      });
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
    <div className="space-y-6 p-4 relative">
      {loading && (
        <div className="absolute inset-0 bg-background bg-opacity-50 flex items-center justify-center z-10">
          <div className="loader" />
        </div>
      )}

      <div className="text-center md:text-left mx-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">
          Cadastro de Produto
        </h1>
        <p className="text-sm md:text-base !text-sunset">
          Preencha os dados do produto e faça upload da foto
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex w-1/2 px-4">
          <SectionPhotos
            photoResident={photoResident}
            setPhotoResident={setPhotoResident}
          />
        </div>

        <div className="w-1/2 flex flex-col space-y-4">
          {/* Nome */}
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
              render={({ field }) => {
                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  const numeric = e.target.value.replace(/\D/g, "");
                  field.onChange(numeric ? Number(numeric) / 100 : undefined);
                };

                const displayValue = field.value
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(field.value)
                  : "";

                return (
                  <Input
                    id="price"
                    value={displayValue}
                    onChange={handleChange}
                    placeholder="R$ 0,00"
                  />
                );
              }}
            />
            {errors.price && (
              <span className="text-red-600 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Categoria */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="categoryId">Categoria</Label>
            <MultipleSelect
              fetchItems={getCategories}
              createItem={postCategory}
              labelKey="name"
              valueKey="id"
              single
              value={
                watch("categoryId") ? String(watch("categoryId")) : undefined
              }
              onChange={(val) => setValue("categoryId", Number(val))}
              placeholder="Selecione ou crie uma categoria"
            />
            {errors.categoryId && (
              <span className="text-red-600 text-sm">
                {errors.categoryId.message}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <MultipleSelect
              fetchItems={getLabels}
              createItem={postLabel}
              labelKey="name"
              valueKey="id"
              multiple
              value={(watch("tags") ?? []).map(String)}
              onChange={(val) =>
                setValue(
                  "tags",
                  Array.isArray(val) ? val.map(String) : [String(val)]
                )
              }
              placeholder="Selecione ou crie tags"
            />
          </div>

          {/* Estoque */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="stock">Estoque</Label>
            <Controller
              control={control}
              name="stock"
              render={({ field }) => (
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value)
                    )
                  }
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
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
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

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          variant="sunset"
        >
          <Save className="mr-2" />
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
