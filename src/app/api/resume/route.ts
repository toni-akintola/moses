import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = await fetch("http://127.0.0.1:5000/resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return new NextResponse(data);
}
