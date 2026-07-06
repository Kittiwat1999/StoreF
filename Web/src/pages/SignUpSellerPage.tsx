import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  getPasswordStrength,
  validateEmail,
  validateUsername,
} from "../utils/validations";
import authApi, {type FormType} from "../api/authApi";

export default function SignUpSellerPage() {
  const [form, setform] = useState<FormType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedPolicy: false,
    role: "seller",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSetform = (
    field: keyof FormType,
    value: string | boolean,
  ) => {
    setform((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const passwordStrength = getPasswordStrength(form.password);
  const usernameError =
    form.username.trim() && !validateUsername(form.username)
      ? "Username must be at least 3 characters and contain only letters, numbers, or underscores."
      : "";
  const emailError =
    form.email.trim() && !validateEmail(form.email)
      ? "Please enter a valid email address."
      : "";
  const confirmPasswordError =
    form.confirmPassword && form.password !== form.confirmPassword
      ? "Passwords do not match."
      : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
    } catch (error : any) {
      setError(error.response?.data?.detail || "An error occurred while signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row-reverse">
        <section className="flex min-h-[40vh] flex-1 flex-col justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-slate-950 px-6 py-12 text-white lg:min-h-screen lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/90">
              <span className="text-orange-100">StoreF</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Create your seller account
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-orange-100/90 sm:text-lg">
              Sign up as a seller and start listing products, monitoring orders,
              and managing your storefront on StoreF.
            </p>
          </div>
        </section>

        <section className="flex min-h-[40vh] w-full flex-col justify-center bg-slate-50 px-6 py-12 text-slate-950 lg:min-h-screen lg:w-[38%] lg:px-12 lg:py-20">
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
                Sign up
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Seller account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block text-sm font-medium text-slate-700">
                Username
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    handleSetform("username", e.target.value)
                  }
                  required
                  className={`mt-2 w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 ${usernameError ? "border-red-300" : "border-slate-200"}`}
                />
                {usernameError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {usernameError}
                  </p>
                )}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleSetform("email", e.target.value)}
                  required
                  className={`mt-2 w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 ${emailError ? "border-red-300" : "border-slate-200"}`}
                />
                {emailError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {emailError}
                  </p>
                )}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    handleSetform("password", e.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                {passwordStrength.level && (
                  <div className="mt-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${passwordStrength.barClass} ${passwordStrength.widthClass}`}
                      />
                    </div>
                    <p
                      className={`mt-2 text-xs font-medium ${passwordStrength.colorClass}`}
                    >
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  Use at least one lowercase letter, one number, and one special
                  character such as @, !, #, $, or *. Example: Abc123!
                </p>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Confirm password
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleSetform("confirmPassword", e.target.value)
                  }
                  required
                  className={`mt-2 w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 ${confirmPasswordError ? "border-red-300" : "border-slate-200"}`}
                />
                {confirmPasswordError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {confirmPasswordError}
                  </p>
                )}
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.acceptedPolicy}
                  onChange={(e) =>
                    handleSetform("acceptedPolicy", e.target.checked)
                  }
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
                <span>I accept the privacy policy and terms of service.</span>
              </label>

              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && !loading && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {error}
                  </p>
                )}
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                Already have an account?
                <Link
                  to="/signin"
                  className="ml-1 font-semibold text-orange-500 hover:text-orange-600"
                >
                  Back to sign in
                </Link>
              </p>
              <p className="mt-3">
                Want a buyer account?
                <Link
                  to="/signup"
                  className="ml-1 font-semibold text-orange-500 hover:text-orange-600"
                >
                  Sign up as buyer
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
