"use server";
import { Session } from "@/types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//* ENCODE KEY
const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

//* CREATE SESSION
export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);  // تغییر به 2 دقیقه
  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256"
    })
    .setIssuedAt()
    .setExpirationTime("60d")
    .sign(encodedKey);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "strict",
    path: "/"
  });
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"]
    });

    return payload as Session;
  } catch {
    // اگر توکن منقضی شد، کاربر رو به صفحه ورود هدایت می‌کنیم
    redirect("/signin");
  }
}


//* DELETE SESSION
export async function deleteSession() {
  await cookies().delete("session");
  redirect("/");
}

//* UPDATE TOKENS IN SESSION
export async function updateTokens({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    ...payload,
    token: {
      accessToken,
      refreshToken
    }
  };

  await createSession(newPayload);
  // console.log("update session");
}

// //* UPDATE SESSION
// export async function updateSession({
//   user,
//   token
// }: {
//   user?: UserUpdate;
//   token?: TokenUpdate;
// }) {
//   const cookie = cookies().get("session")?.value;
//   if (!cookie) return null;

//   const { payload } = await jwtVerify<Session>(cookie, encodedKey);

//   if (!payload) throw new Error("Session not found");

//   const newPayload = {
//     ...payload,
//     user: {
//       ...payload.user,
//       ...user
//     },
//     token: {
//       ...payload.token,
//       ...token
//     }
//   };
//   await createSession(newPayload);
// }

// //* CHECK SESSION
export async function checkAuth() {
  const session = await getSession();
  if (session) {
    return true;
  } else {
    return false;
  }
}
