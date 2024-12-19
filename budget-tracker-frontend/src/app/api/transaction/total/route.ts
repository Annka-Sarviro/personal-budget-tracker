import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const response = await fetch(`${url}/transactions/total`);

    if (!response.ok) {
      throw new Error(`Помилка при завантаженні: ${response.statusText}`);
    }

    const data = await response.json();
    revalidatePath(`/transactions`);
    return NextResponse.json(data);
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
