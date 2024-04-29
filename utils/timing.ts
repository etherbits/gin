import { TimeSpan } from "lucia";

const emailVerificationExpiry = new TimeSpan(5, "m");
const passwordResetExpiry = new TimeSpan(2, "h");

export { emailVerificationExpiry, passwordResetExpiry };
