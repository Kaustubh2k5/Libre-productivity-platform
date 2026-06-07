import { prisma } from "../lib/db.js";

async function main() {
  const clientId = "test-client-id";
  const appName = "Test Application";

  console.log(`Checking if application with clientId "${clientId}" exists...`);
  
  const existingApp = await prisma.app.findUnique({
    where: { clientId }
  });

  if (existingApp) {
    console.log(`Application "${appName}" (clientId: ${clientId}) already exists.`);
  } else {
    console.log(`Creating application "${appName}"...`);
    const newApp = await prisma.app.create({
      data: {
        name: appName,
        clientId: clientId,
      }
    });
    console.log("Application created successfully:", newApp);
  }
}

main()
  .catch((e) => {
    console.error("Error seeding application:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
