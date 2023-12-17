import { test, expect } from "@playwright/test";

test("Should register", async ({ request }) => {
  const response = await request.post("/api/register", {
    data: {
      username: "tesiss",
      email: "asd@asd.com",
      password: "asdasdasd",
      confirmPassword: "asdasdasd",
    }
  })

  const resData = await response.json()
  console.log(resData)

  expect(response.ok()).toBeTruthy()


  expect(resData.message).toBe("ok")
});
