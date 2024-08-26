import { serialize } from "cookie";
import { createUser } from "@/lib/actions/user.actions";
import { UserRole } from "@/types";

export async function POST(request: any) {
  const data: { password: string, firstName: string, lastName: string, email: string } = await request.json();
  const {password, firstName, lastName, email} = data;
  const cookie = serialize(process.env.PASSWORD_COOKIE_NAME!, "true",
  {
    httpOnly: true,
    path: "/"
  });

  if (process.env.PAGE_PASSWORD !== password) {
    return new Response("incorrect password", {
      status: 401,
    });
  }

  // TODO update to not hard code data
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: UserRole.Guest,
    hasPlusOne: true,
    tableNumber: 1
  };

  console.log(user);

  const newUser = await createUser(user);

  return new Response(JSON.stringify({
    message: "Password correct",
    user: newUser
  }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json"
    }
  });
}