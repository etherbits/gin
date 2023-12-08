"use server";

export async function test() {
  try {
    throw new Error("test error");
  } catch (err) {
    console.log("erroer");
  }
}
