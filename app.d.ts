/// <reference types="lucia" />
type User = import("@/db/schema/user").User

declare namespace Lucia {
  type Auth = import("@/lib/lucia").Auth
  type DatabaseUserAttributes = {
    username: User["username"]
    email: User["email"]
    email_verified: User["email_verified"]
  }
  type DatabaseSessionAttributes = {}
}
