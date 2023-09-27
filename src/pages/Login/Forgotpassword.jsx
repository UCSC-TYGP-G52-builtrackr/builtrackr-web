

const ForgotPassword = () => {
  return (
    <>
     

      <div class="min-h-screen flex items-start justify-center bg-gray-100">
        <div class="max-w-md w-full px-6 py-8 mt-10 bg-white shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Forgot Password</h2>
          <p class="text-gray-600 mb-6">
            Please enter your email address to receive a password reset link.
          </p>
          <form>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-center">
              <button
                type="submit"
                style={{ backgroundColor: "#FFCC00" }}
                class=" text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
