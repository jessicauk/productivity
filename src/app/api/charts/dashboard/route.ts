import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.groupBy({
      by: ["statusId"],
      _count: true,
      orderBy: {
        _count: {
          title: "desc",
        },
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.error();
  }
}
