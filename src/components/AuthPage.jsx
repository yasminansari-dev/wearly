import { useEffect, useState } from "react";
import { loginUser, registerUser, startGoogleLogin } from "../api";

const inputStyles = "w-full rounded-2xl border border-olive/15 bg-ivory px-4 py-3.5 text-sm text-olive outline-none transition-all placeholder:text-brown/55 focus:border-moss focus:ring-4 focus:ring-moss/15";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.21Z" />
      <path fill="#34A853" d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.6Z" />
      <path fill="#FBBC05" d="M6.54 13.69a5.85 5.85 0 0 1 0-3.38V7.79H3.3a9.74 9.74 0 0 0 0 8.42l3.24-2.52Z" />
      <path fill="#EA4335" d="M12 6.28c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.36 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8 9.46 6.28 12 6.28Z" />
    </svg>
  );
}

function AuthPage({ initialMode }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMode(initialMode);
    setStatus("");
    setError("");
  }, [initialMode]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatus("");
    setError("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStatus("");
    setError("");
    window.history.replaceState({}, "", nextMode === "register" ? "#register" : "#login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setError("");

    try {
      if (mode === "login") {
        const tokens = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem("wearly_access_token", tokens.access_token);
        localStorage.setItem("wearly_refresh_token", tokens.refresh_token);
        setStatus("You are logged in. Your session is ready.");
      } else {
        await registerUser({ username: formData.username, email: formData.email, password: formData.password });
        switchMode("login");
        setStatus("Account created. You can now log in.");
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePointerMove = (event) => {
    const card = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - card.left) / card.width - 0.5;
    const y = (event.clientY - card.top) / card.height - 0.5;
    setTilt({ x: y * -5, y: x * 5 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });
  const isRegistering = mode === "register";

  return (
    <main className="min-h-screen bg-[#f3efe9] text-[#233126]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <section className="relative flex min-h-[360px] flex-1 overflow-hidden md:min-h-screen md:flex-[1.15]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/src/assets/login.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[#1d2d25]/75" />

          <div className="relative z-10 flex w-full flex-col mt-8 sm:p-8 lg:p-12">
            <div className="flex items-center gap-0.5 text-[#f8f2eb]">
            </div>

            <div className="max-w-[620px] text-[#f8f2eb]">
              <h1 className="font-display text-4xl font-bold leading-[0.88] tracking-[-0.06em] sm:text-5xl lg:text-[5rem]">
                Good Clothes <br /> Deserve a <br />
                <span className="text-moss">Second Chance.</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#f8f2eb]/80 sm:text-lg">
                Buy and sell pre-owned clothes with confidence. Quality pieces, better prices, and a more sustainable tomorrow.
              </p>

              <div className="mt-8 flex max-w-lg flex-wrap gap-4 text-sm text-[#f8f2eb]/90">
                {[
                  "Verified Sellers",
                  "Sustainable Fashion",
                  "Great Preloved Prices",
                  "Second Hand, High Value.",
                ].map((item) => (
                  <div key={item} className="min-w-[120px] rounded-full border border-[#f8f2eb]/20 bg-[#f8f2eb]/5 px-3 py-2 text-center backdrop-blur-[1px]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-10 flex items-center justify-between text-[#f8f2eb]">
              <div className="font-display text-3xl italic font-light tracking-[-0.05em] text-[#f3efe9]">
                Wear Less <span className="block text-left">Waste Less</span>
              </div>
            </div>
          </div>
        </section> 

        <section className="relative flex min-w-0 flex-1 items-center justify-center bg-[#f5f1ec] px-5 pb-10 pt-24 sm:px-8 sm:pt-24 lg:px-12 lg:py-8 md:flex-1">
          <a
            className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-[#233126]/15 bg-transparent px-4 py-2 text-sm font-bold text-[#233126] transition-all hover:-translate-y-0.5 hover:border-[#233126]/25 hover:bg-[#e8e3dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f9e6c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1ec] sm:left-8 sm:top-8"
            href="#home"
          >
            <span aria-hidden="true">←</span>
            Back to home
          </a>

          <div
            className="relative w-full max-w-[520px] rounded-[28px] p-6 text-[#233126] sm:p-8"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >

            <div className="text-center">
              <h2 className="font-display text-4xl font-bold tracking-[-0.05em] text-[#233126]">
                {isRegistering ? "Create your account" : "Welcome Back"}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#3d4431]/75">
                {isRegistering
                  ? "Start your Wearly journey today."
                  : "Log in to your account and continue your sustainable fashion journey."}
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {isRegistering && (
                <label className="block text-sm font-bold text-[#233126]">
                  Username
                  <input
                    className={`${inputStyles} mt-2`}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={updateField}
                    placeholder="yourname"
                    required
                    autoComplete="username"
                  />
                </label>
              )}

              <label className="block text-sm font-bold text-[#233126]">
                Email address
                <input
                  className={`${inputStyles} mt-2`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </label>

              <label className="block text-sm font-bold text-[#233126]">
                Password
                <div className="relative mt-2">
                  <input
                    className={`${inputStyles} pr-12`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={updateField}
                    placeholder="Enter your password"
                    required
                    minLength="8"
                    autoComplete={isRegistering ? "new-password" : "current-password"}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-[#233126]/60 hover:text-[#233126]"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {!isRegistering && (
                <div className="flex justify-end">
                  <button
                    className="text-xs font-bold text-[#233126]/70 hover:text-[#233126]"
                    type="button"
                    onClick={() => {
                      setStatus("working on Password reset");
                      setError("");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1d2d25] py-4 text-base font-bold text-[#f8f2eb] shadow-[0_8px_0_rgba(29,45,37,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#233126] disabled:cursor-wait disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : isRegistering ? "Create account" : "Log in"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#233126]/40">
              <span className="h-px flex-1 bg-[#233126]/15" />
              or
              <span className="h-px flex-1 bg-[#233126]/15" />
            </div>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#233126]/15 bg-transparent py-3.5 text-sm font-bold text-[#233126] transition-all hover:-translate-y-0.5 hover:border-[#233126]/20 hover:bg-[#e8e3dd]"
              type="button"
              onClick={startGoogleLogin}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {error && (
              <p className="mt-4 rounded-xl bg-red-100 px-3 py-2 text-center text-xs font-semibold text-red-800" role="alert">
                {error}
              </p>
            )}
            {status && (
              <p className="mt-4 rounded-xl bg-moss/15 px-3 py-2 text-center text-xs font-semibold text-[#233126]" role="status">
                {status}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-[#233126]/70">
              {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                className="font-bold text-[#233126] hover:text-[#1d2d25]"
                type="button"
                onClick={() => switchMode(isRegistering ? "login" : "register")}
              >
                {isRegistering ? "Log in" : "Sign up"}
              </button>
            </p>

            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#233126]/50">
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;