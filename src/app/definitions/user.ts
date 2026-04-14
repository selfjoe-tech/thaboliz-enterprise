// src/definitions/IUser.ts
export type IUser = {
  name: string;
  email: string;
  contactNumber: string;
  role: "customer" | "admin";
  authType: string;
  avatarUrl?: string;
};
