import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const searchParams = request.nextUrl.searchParams;
    const category_id = searchParams.get("category_id");
    const date = searchParams.get("date");
    const page = searchParams.get("page");
    const limit = 5;
    const response = await fetch(
      `${url}/transactions?category_id=${category_id}&date=${date}&page=${page}&limit=${limit}`
    );

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

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_BACKEND_URL;
    if (!url) {
      throw new Error("NEXT_BACKEND_URL не визначено");
    }

    const { amount, type, category_id, description } = await request.json();
    console.log(category_id);
    if (!amount) {
      throw new Error("Transaction amount is required.");
    }

    if (!type) {
      throw new Error("Transaction type is required.");
    }

    if (!category_id) {
      throw new Error("Category is required.");
    }

    if (!description) {
      throw new Error("Transaction description is required.");
    }
    const response = await fetch(`${url}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, type, category_id, description }),
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
