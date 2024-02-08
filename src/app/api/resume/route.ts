import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // const body = await req.body
  // const response = await fetch("http://127.0.0.1:5000/resume", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(body)
  // });
  // const data = await response.json();
  // console.log(data);
  return NextResponse.json({message: "Hello World"});
}
