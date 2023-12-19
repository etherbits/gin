import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

const testUser = {
  username: faker.person.fullName() + Date.now(),
  email: Date.now() + faker.internet.email(),
  password: "asdasdasd",
  confirmPassword: "asdasdasd",
};

test("Should authenticate", async ({ request }) => {
  const registerRes = await request.post("/api/register", {
    data: testUser,
  });

  expect(registerRes.ok(), "Failed to register").toBeTruthy();

  const loginRes = await request.post("/api/log-in", {
    data: {
      email: testUser.email,
      password: testUser.password,
    },
  });

  expect(loginRes.ok(), "Failed to log in").toBeTruthy();
});
