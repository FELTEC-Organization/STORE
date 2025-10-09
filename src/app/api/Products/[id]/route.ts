import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ou caminho do seu prisma

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    const deleted = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produto deletado", deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 },
    );
  }
}
