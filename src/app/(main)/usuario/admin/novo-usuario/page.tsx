"use client";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionPhotos from "@/components/UploadPhotos";
import { productSchema, TCreateProductSchema } from "./schema/schema";
import { showToast } from "@/components/toast/showToast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { createUser, CreateUserPayload } from "./services/createUser.services";

type TabDatasProps = {
    onDataFilled?: (data: TCreateProductSchema) => void;
};

export default function NewUser({ onDataFilled }: TabDatasProps) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [photoResident, setPhotoResident] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<TCreateProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            email: "",
            type: "",
        },
    });

    const onSubmit = async (data: TCreateProductSchema) => {
        try {
            const payload: CreateUserPayload = {
                name: data.name,
                email: data.email,
                password: "12345", // temporario
                role: data.type === "1" ? "Support" : data.type === "2" ? "Admin" : "User",
            };

            const createdUser = await createUser(payload);
            console.log("Usuário criado:", createdUser);

            showToast({
                type: "success",
                title: "Usuário salvo com sucesso!",
                description: "Os dados do usuário foram salvos.",
            });

            onDataFilled?.(data);
            reset();

            router.push("lista-usuarios");
        } catch (err) {
            showToast({
                type: "error",
                title: "Erro ao salvar usuário.",
                description: "Ocorreu um erro ao tentar salvar os dados do usuário.",
            });
        }
    };

    // Opções fictícias de categoria
    const typesUser = [
        { id: "1", name: "Suporte" },
        { id: "2", name: "Admin" },
        { id: "3", name: "Usuário" },
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
                    <div className="text-center md:text-left mx-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                            Cadastro de usuário
                        </h1>
                        <p className="text-sm md:text-base !text-sunset">
                            Preencha os dados do novo usuário
                        </p>
                    </div>
                    {/* Parte superior: SectionPhotos + Forms */}
                    <div className="flex gap-4">
                        {/* SectionPhotos à esquerda */}
                        <div className="flex w-1/2 px-4">
                            <SectionPhotos
                                photoResident={photoResident}
                                setPhotoResident={setPhotoResident}
                            />
                        </div>

                        <div className="w-1/2 flex flex-col gap-4 space-y-4">
                            {/* Nome do usuário */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="name">Nome do usuário</Label>
                                <Input
                                    id="name"
                                    placeholder="Nome do usuário"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="usuario@email.com"
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <span className="text-red-600 text-sm">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Tipo de usuário como Select */}
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="type">Tipo de usuário</Label>
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="type" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {typesUser.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.type && (
                                    <span className="text-red-600 text-sm">
                                        {errors.type.message}
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
