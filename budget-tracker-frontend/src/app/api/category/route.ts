import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const response = await fetch(`${url}/categories`);

    if (!response.ok) {
      throw new Error(`Помилка при завантаженні: ${response.statusText}`);
    }

    const data = await response.json();
    revalidatePath(`/categories`);
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

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const { name, type } = await request.json();

    if (!name) {
      throw new Error("Category name is required.");
    }

    if (!type) {
      throw new Error("Category type is required.");
    }

    const response = await fetch(`${url}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type }),
    });

    if (!response.ok) {
      throw new Error(`Помилка при завантаженні: ${response.statusText}`);
    }

    const data = await response.json();

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
