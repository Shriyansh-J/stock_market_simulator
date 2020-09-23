import { db } from "./firebase";

// User API
export const doCreateUser = (
  id: string,
  username: string,
  email: string,
  amount: number
) =>
  db.ref(`users/${id}`).set({
    email,
    username,
    amount,
  });

export const onceGetUsers = () => db.ref("users").once("value");
