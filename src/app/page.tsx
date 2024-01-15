import { prisma } from "@/../lib/prisma";

export const metadata = {
  title: "dashboard",
};

async function getUsers() {
  const allUsers = await prisma.user.findFirst();
  return allUsers;
}

export default async function Home() {
  const user = await getUsers();
  console.log(user);
  
  return <main>Home</main>;
}
