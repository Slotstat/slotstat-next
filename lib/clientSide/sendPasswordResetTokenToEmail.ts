"use client";
import slotStatClientInstance from "./clientInstance";

export default async function sendPasswordResetTokenToEmail(email: string) {
  if (email) {
    try {
      const res = await slotStatClientInstance().request({
        url: `/api/user/password/token`,
        method: "POST",
        data: { email },
      });

      if (res.status != 200) throw new Error("Can't send password reset token to email");

      return res;
    } catch (error) {
      throw new Error("Can't send password reset token to email");
    }
  } else {
    return undefined;
  }
}
