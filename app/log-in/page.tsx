export default async function LogIn() {  
  return (
    <main>
      <form
        className="flex flex-col gap-4 max-w-[600px] mx-auto m-16"
        action="/api/log-in"
        method="POST"
      >
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button>Log In</button>
      </form>
    </main>
  );
}
