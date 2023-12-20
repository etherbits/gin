import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

const testUser = {
  username: faker.person.fullName() + Date.now(),
  email: Date.now() + faker.internet.email(),
  password: "asdasdasd",
  confirmPassword: "asdasdasd",
};

const authPath = "playwright/.auth/user.json";

test("Should register", async ({ context }) => {
  const res = await context.request.post("/api/register", {
    data: testUser,
  });

  expect(res.ok()).toBeTruthy();
});

test("Should login", async ({ context }) => {
  const res = await context.request.post("/api/log-in", {
    data: {
      email: testUser.email,
      password: testUser.password,
    },
  });

  expect(res.ok()).toBeTruthy();
  await context.storageState({ path: authPath });
});

test("Should logout", async ({ browser }) => {
  const context = await browser.newContext({ storageState: authPath });
  const res = await context.request.post("/api/log-out");

  expect(res.ok()).toBeTruthy();
});
