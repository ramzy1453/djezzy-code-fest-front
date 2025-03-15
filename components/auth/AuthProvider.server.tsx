// import UserApi from "@/lib/api/user";
// import { RequireAuth } from "./RequireAuth.client";
import UserApi from "@/lib/api/user";
import { cookies } from "next/headers";
import { RequireAuth } from "./RequireAuth.client";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const nextCookies = await cookies();
    const token = nextCookies.get("token")?.value;
    const user = await UserApi.verify(token);

    console.log({ user, token });

    return <RequireAuth user={user.data}>{children}</RequireAuth>;
  } catch {
    return <>{children}</>;
  }
}
