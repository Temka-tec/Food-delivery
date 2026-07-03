import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@food.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status });

async function readJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function mapPrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return json(
      {
        message:
          "Database connection failed. Check DATABASE_URL in the frontend Vercel project.",
      },
      500,
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return json({ message: "Username or email already exists" }, 409);
    }

    if (error.code === "P2021" || error.code === "P2022") {
      return json(
        {
          message:
            "Database schema is not ready. Run Prisma db push or migrations on the frontend project.",
        },
        500,
      );
    }
  }

  console.error(error);
  return json({ message: "Internal server error" }, 500);
}

async function resolvePath(context: RouteContext) {
  const params = await Promise.resolve(context.params);
  return params.path ?? [];
}

async function handleCategories(request: Request) {
  if (request.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: { foods: true },
        orderBy: { createdAt: "asc" },
      });

      return json(categories);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (request.method === "POST") {
    const body = await readJsonBody(request);

    if (!body?.name) {
      return json({ message: "Category name is required" }, 400);
    }

    try {
      const category = await prisma.category.create({
        data: { name: body.name },
      });

      return json(category, 201);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  return json({ message: "Method not allowed" }, 405);
}

async function handleFoods(request: Request, segments: string[]) {
  if (request.method === "GET" && segments.length === 1) {
    try {
      const foods = await prisma.food.findMany({
        include: { categories: true },
        orderBy: { createdAt: "desc" },
      });

      return json(foods);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (request.method === "POST" && (segments.length === 1 || segments[1] === "create")) {
    const body = await readJsonBody(request);

    try {
      const food = await prisma.food.create({
        data: {
          name: body.name,
          price: body.price,
          image: body.image,
          ingredients: body.ingredients,
          categories: {
            connect: (body.categoryIds ?? []).map((id: string) => ({ id })),
          },
        },
        include: { categories: true },
      });

      return json(food, 201);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (segments.length === 2) {
    const id = segments[1];

    if (request.method === "PUT") {
      const body = await readJsonBody(request);

      try {
        const food = await prisma.food.update({
          where: { id },
          data: {
            name: body.name,
            price: typeof body.price === "string" ? parseFloat(body.price) : body.price,
            ingredients: body.ingredients,
            image: body.image,
            ...(body.categoryIds && {
              categories: {
                set: (body.categoryIds as string[]).map((categoryId) => ({ id: categoryId })),
              },
            }),
          },
          include: { categories: true },
        });

        return json(food);
      } catch (error) {
        return mapPrismaError(error);
      }
    }

    if (request.method === "DELETE") {
      try {
        await prisma.orderItem.deleteMany({ where: { foodId: id } });
        await prisma.food.delete({ where: { id } });

        return json({ message: "Deleted" });
      } catch (error) {
        return mapPrismaError(error);
      }
    }
  }

  return json({ message: "Not found" }, 404);
}

async function handleAuth(request: Request, segments: string[]) {
  if (segments[1] === "login" && request.method === "POST") {
    const body = await readJsonBody(request);
    const { email, password } = body;

    if (!email || !password) {
      return json({ message: "Email and password are required" }, 400);
    }

    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const existingAdmin =
          (await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } })) ??
          (await prisma.user.findUnique({ where: { username: ADMIN_USERNAME } }));

        const adminUser = existingAdmin
          ? await prisma.user.update({
              where: { id: existingAdmin.id },
              data:
                existingAdmin.email === ADMIN_EMAIL
                  ? {
                      password: ADMIN_PASSWORD,
                      role: "admin",
                    }
                  : {
                      email: ADMIN_EMAIL,
                      password: ADMIN_PASSWORD,
                      role: "admin",
                    },
            })
          : await prisma.user.create({
              data: {
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                role: "admin",
              },
            });

        const { password: _password, ...safeAdmin } = adminUser;

        return json(
          {
            user: safeAdmin,
            accessToken: randomUUID(),
          },
          200,
        );
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return json({ message: "User not found" }, 404);
      }

      const { password: userPassword, ...safeUser } = user;

      if (userPassword !== password) {
        return json({ message: "Username or password wrong" }, 401);
      }

      return json(
        {
          user: safeUser,
          accessToken: randomUUID(),
        },
        200,
      );
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (segments[1] === "register" && request.method === "POST") {
    const body = await readJsonBody(request);
    const { username, password, email } = body;

    if (!username || !password || !email) {
      return json({ message: "Username, email, and password are required" }, 400);
    }

    if (email === ADMIN_EMAIL || username === ADMIN_USERNAME) {
      return json(
        {
          message:
            "This account is reserved for admin sign-in. Use the provided admin credentials instead of registering it.",
        },
        400,
      );
    }

    try {
      const isUsernameExist = await prisma.user.findUnique({ where: { username } });

      if (isUsernameExist) {
        return json({ message: "Username already exists" }, 400);
      }

      const isEmailExist = await prisma.user.findUnique({ where: { email } });

      if (isEmailExist) {
        return json({ message: "Email already exists" }, 400);
      }

      const user = await prisma.user.create({
        data: {
          username,
          password,
          email,
        },
      });

      const { password: _password, ...safeUser } = user;

      return json({ user: safeUser }, 201);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  return json({ message: "Not found" }, 404);
}

async function handleOrders(request: Request, segments: string[]) {
  if (segments.length === 1 && request.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: { select: { email: true, username: true } },
          items: { include: { food: { select: { name: true } } } },
        },
        orderBy: { createdAt: "desc" },
      });

      return json({ orders });
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (segments[1] === "user" && segments[2] && request.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        where: { userId: segments[2] },
        include: { items: { include: { food: true } } },
        orderBy: { createdAt: "desc" },
      });

      return json({ orders });
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (segments.length === 1 && request.method === "POST") {
    const body = await readJsonBody(request);
    const { userId, items, address, total } = body;

    if (!userId || !Array.isArray(items)) {
      return json({ message: "userId and items are required" }, 400);
    }

    try {
      const order = await prisma.order.create({
        data: {
          userId,
          address,
          total,
          items: {
            create: items.map((item: { foodId: string; quantity: number; price: number }) => ({
              foodId: item.foodId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { items: { include: { food: true } } },
      });

      return json({ order }, 201);
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  if (segments.length === 3 && segments[2] === "status" && request.method === "PATCH") {
    const body = await readJsonBody(request);

    try {
      const order = await prisma.order.update({
        where: { id: segments[1] },
        data: { status: body.status },
      });

      return json({ order });
    } catch (error) {
      return mapPrismaError(error);
    }
  }

  return json({ message: "Not found" }, 404);
}

async function route(request: Request, context: RouteContext) {
  const segments = await resolvePath(context);
  const [resource] = segments;

  if (resource === "categories") {
    return handleCategories(request);
  }

  if (resource === "foods") {
    return handleFoods(request, segments);
  }

  if (resource === "auth") {
    return handleAuth(request, segments);
  }

  if (resource === "orders") {
    return handleOrders(request, segments);
  }

  return json({ message: "Not found" }, 404);
}

export async function GET(request: Request, context: RouteContext) {
  return route(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return route(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return route(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return route(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return route(request, context);
}
