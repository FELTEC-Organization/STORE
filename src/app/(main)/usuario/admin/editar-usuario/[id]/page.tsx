"use client";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionPhotos from "@/components/UploadPhotos";
import { userSchema, TCreateUserSchema } from "./schema/schema";
import { showToast } from "@/components/toast/showToast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { getUserById, updateUser, User } from "./services/editUser.services";

type EditUserForm = {
    name: string;
    email: string;
    role: string;
};

export default function EditUser() {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    const params = useParams();
    const id = Number(params.id);
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty },
    } = useForm<TCreateUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
        },
    });

    const roles = [
        { id: "1", name: "Suporte" },
        { id: "2", name: "Admin" },
        { id: "3", name: "Usuário" },
    ];

    useEffect(() => {
        setLoading(true);
        getUserById(id)
            .then((user) => {
                setUserData(user);
                // Mapeia o role da API para o id do select
                const roleMap: Record<string, string> = {
                    "Support": "1",
                    "Admin": "2",
                    "User": "3",
                };

                reset({
                    name: user.name,
                    email: user.email,
                    role: roleMap[user.role] || "",
                });
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    title: "Erro ao carregar usuário",
                    description: String(err),
                });
            })
            .finally(() => setLoading(false));
    }, [id, reset, router]);

    const onSubmit = async (data: EditUserForm) => {
        setLoading(true);
        try {
            const idToRoleMap: Record<string, string> = {
                "1": "Support",
                "2": "Admin",
                "3": "User",
            };

            await updateUser(id, {
                name: data.name,
                email: data.email,
                role: idToRoleMap[data.role],
            });

            showToast({
                type: "success",
                title: "Usuário atualizado",
                description: "As alterações foram salvas com sucesso.",
            });

            router.push("/usuario/admin/lista-usuarios");
        } catch (err) {
            showToast({
                type: "error",
                title: "Erro ao atualizar usuário",
                description: String(err),
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !userData) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="loader" />
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4">
                    <div className="text-center md:text-left mx-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                            Editar Usuário
                        </h1>
                        <p className="text-sm md:text-base !text-sunset">
                            Atualize os dados do usuário
                        </p>
                    </div>
                    {/* Parte superior: SectionPhotos + Forms */}
                    <div className="flex gap-4">
                        {/* SectionPhotos à esquerda */}
                        <div className="w-1/2 px-4">
                            <SectionPhotos
                                photo={photo}
                                setPhoto={setPhoto}
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
                                <Label htmlFor="role">Tipo de usuário</Label>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="role" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.id}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <span className="text-red-600 text-sm">
                                        {errors.role.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão salvar */}
                <div className="flex justify-end">
                    <Button onClick={handleSubmit(onSubmit)} disabled={!isDirty || loading} variant="sunset">
                        <Save className="mr-2" />
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </div>
        </>
    );
}
