export async function seedUser() {
  console.log("👤 Seeding users...");

  const data = {
    username: "test account",
    email: "asd@asd.com",
    password: "asdasdasd",
  };

  return await auth.createUser({
    key: {
      providerId: "email",
      providerUserId: data.email,
      password: data.password,
    },
    attributes: {
      username: data.username,
      email: data.email,
      email_verified: true,
    },
  });
