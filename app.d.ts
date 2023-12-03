/// <reference types="lucia" />
type User = import("@/db/schema").User;

declare namespace Lucia {
  type Auth = import("@/lib/lucia").Auth;
  type DatabaseUserAttributes = {
    username: User["username"];
    email: User["email"];
    email_verified: User["emailVerified"];
  };
  type DatabaseSessionAttributes = {};
}
