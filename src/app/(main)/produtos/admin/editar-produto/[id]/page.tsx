"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionPhotos from "@/components/UploadPhotos";
import { Save } from "lucide-react";
import { MultipleSelect } from "@/components/MultipleSelect";
import { getCategories, postCategory } from "@/services/categories";
import { getLabels, postLabel } from "@/services/labels";
import { showToast } from "@/components/toast/showToast";
import { productSchema, TEditProductSchema } from "./schema/schema";
import {
  getProductById,
  updateProduct,
  Product,
} from "./services/edit.products.service";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product | null>(null);

  // <-- IMPORTANT: remove generic here to let zodResolver infer types and avoid Resolver mismatch
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      categoryId: null,
      labelId: [],
      stock: 0,
      description: "",
      tags: [],
    },
  });

  // 🔹 Verifica autorização
  useEffect(() => {
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (!userData) return router.push("/not-found");
    const parsed = JSON.parse(userData);
    if (!parsed.token) return router.push("/not-found");
    setAuthorized(true);
  }, [router]);

  // 🔹 Busca dados do produto e labels
  useEffect(() => {
    if (!authorized) return;
    setLoading(true);

    Promise.all([getProductById(id), getLabels()])
      .then(([product]) => {
        setProductData(product);

        // imagem base64 tratada
        const imageWithPrefix = product.imageUrl
          ? `data:image/jpeg;base64,${product.imageUrl}`
          : null;
        setPhoto(imageWithPrefix);

        // o backend retorna `tags: ["3","2","1"]` → converte pra strings
        const labelIdsFromTags = (product.tags ?? []).map(String);

        reset({
          name: product.name,
          description: product.description ?? "",
          categoryId: product.categoryId ?? null,
          price: product.price ?? 0,
          stock: product.stock ?? 0,
          tags: labelIdsFromTags, // IDs em string para o MultipleSelect
        });
      })
      .catch((err) => {
        showToast({
          type: "error",
          title: "Erro ao carregar produto",
          description: String(err),
        });
      })
      .finally(() => setLoading(false));
  }, [authorized, id, reset]);

  // 🔹 Envio do formulário
  const onSubmit = async (data: any /* usando any aqui evita incompatibilidade no handleSubmit */) => {
    try {
      setLoading(true);

      const imageForBackend = photo
        ? photo.replace(/^data:image\/[a-z]+;base64,/, "")
        : null;

      const payload: Partial<Product> = {
        ...data,
        imageUrl: imageForBackend,
        // backend espera labelIds:number[]
        // adicionamos sem forçar types para evitar erro de compilação
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        labelIds: (data.tags ?? []).map(Number),
      };

      await updateProduct(id, payload);

      showToast({
        type: "success",
        title: "Produto atualizado!",
        description: "Alterações salvas com sucesso.",
      });

      router.push("/produtos/admin/lista-produtos");
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Erro ao atualizar produto",
        description: err?.message ?? String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  if (!authorized || (loading && !productData)) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="loader" />
      </div>
    );
  }

  // 🔹 Renderização (mantive tudo igual)
  return (
    <div className="space-y-6 p-4">
      <div className="text-center md:text-left mx-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">
          Editar Produto
        </h1>
        <p className="text-sm text-sunset">
          Atualize as informações do produto cadastrado
        </p>
      </div>

      <div className="flex gap-4">
        {/* Imagem */}
        <div className="flex w-1/2 px-4">
          <SectionPhotos photo={photo} setPhoto={setPhoto} />
        </div>

        {/* Formulário */}
        <div className="w-1/2 flex flex-col space-y-4">
          {/* Nome */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" {...register("name")} />
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
                const handleChange = (value: string) => {
                  const numericValue = value.replace(/\D/g, "");
                  field.onChange(Number(numericValue) / 100);
                };
                return (
                  <Input
                    id="price"
                    type="text"
                    placeholder="R$ 0,00"
                    value={
                      field.value
                        ? new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(field.value)
                        : ""
                    }
                    onChange={(e) => handleChange(e.target.value)}
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
              endpointType="Categories"
              value={
                watch("categoryId") ? String(watch("categoryId")) : undefined
              }
              onChange={(val) => setValue("categoryId", val ? Number(val) : null)}
              placeholder="Selecione ou crie uma categoria"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="labelIds">Tags</Label>
            <MultipleSelect
              key={productData?.id || "new"}
              fetchItems={getLabels}
              createItem={postLabel}
              labelKey="name"
              valueKey="id"
              multiple
              endpointType="ProductLabels"
              value={(watch("tags") ?? []).map(String)}
              onChange={(val) =>
                setValue(
                  "tags",
                  Array.isArray(val) ? val.map(String) : [String(val)],
                )
              }
            />
          </div>

          {/* Estoque */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="stock">Estoque</Label>
            <Controller
              control={control}
              name="stock"
              render={({ field }) => (
                <Input id="stock" type="number" min={0} {...field} />
              )}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Detalhes sobre o produto"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          variant="sunset"
          className="min-w-[160px] font-semibold"
        >
          <Save className="mr-2" />
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}

