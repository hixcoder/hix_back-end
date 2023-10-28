import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();
  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       email: "hixmsan@gmail.com",
  //       name: "hix",
  //       age: 44,
  //     },
  //     {
  //       email: "hixman@gmail.com",
  //       name: "hix",
  //       age: 4,
  //     },
  //     {
  //       email: "mano@gmail.com",
  //       name: "hix",
  //       age: 444,
  //     },
  //   ],
  // });
  const user = await prisma.user.updateMany({
    where: {
      name: {
        startsWith: "hix",
      },
    },
    data: {
      name: "ddd@gmail.com",
    },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
