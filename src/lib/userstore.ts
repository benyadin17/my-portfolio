import { hash } from "bcrypt";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

let users: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "$2b$10$l2ZCHv6I7toBjq3gDOC3E.S61zCTxfxmeF.Z0J86EdweLx58syrJC", // hash dari admin123
  },
];

async function printHashedPassword() {
  const hashValue = await hash("admin123", 10);
  console.log("Hashed password for 'admin123':", hashValue);
}

//printHashedPassword(); 
export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export async function createUser(name: string, email: string, password: string) {
  const existingUser = findUserByEmail(email);
  if (existingUser) return null;

  const hashedPassword = await hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  return newUser;
}
