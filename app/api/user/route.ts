// import prismadb from "@/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function Post(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, username, password } = body;

//     //email already exist
//     const existingUserByEmail = await prismadb.user.findUnique({
//       where: { email: email },
//     });
//     if (existingUserByEmail)
//       return NextResponse.json(
//         { user: null, message: "User with this email already exists" },
//         { status: 409 }
//       );

//     //username already exist
//     const existingUserByUsername = await prismadb.user.findUnique({
//       where: { username: username },
//     });
//     if (existingUserByEmail)
//       return NextResponse.json(
//         { user: null, message: "User with this username already exists" },
//         { status: 409 }
//       );

//     const newUser = await prismadb.user.create({
//       data: { username, email, password },
//     });
//   } catch (error) {}
// }
