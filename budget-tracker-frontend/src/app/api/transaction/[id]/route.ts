import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const id = (await params).id;

    if (!id) {
      throw new Error("ID транзакції є обов'язковим.");
    }

    const response = await fetch(`${url}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка видалення: ${response.statusText}`);
    }

    revalidatePath(`/transactions`);

    return NextResponse.json({ message: "Транзакція успішно видалена" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Помилка сервера 500", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Помилка сервера", error: String(error) },
        { status: 500 }
      );
    }
  }
}
