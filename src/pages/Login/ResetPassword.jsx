import Navbar from "../../components/SiteManager/Navbar";

const ResetPassword = () => {
  return (
    <>
      <Navbar />

      <div class="min-h-screen flex items-start justify-center bg-gray-100">
        <div class="max-w-md w-full px-6 py-8 mt-10 bg-white shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Reset Password</h2>
          <p class="text-gray-600 mb-6">
            Please enter your new password and confirm password.
          </p>
          <form>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label
                for="confirmPassword"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-center">
              <button
                style={{ backgroundColor: "#FFCC00" }}
                type="submit"
                class="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
