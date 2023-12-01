export default function Registration() {
  return (
    <main>
      <form className="flex flex-col gap-4 w-[600px] mx-auto m-16">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button>Register</button>
      </form>
    </main>
  );
}
