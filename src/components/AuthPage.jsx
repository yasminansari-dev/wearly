import { useEffect, useState } from "react";
import { loginUser, registerUser, startGoogleLogin } from "./api";

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
    <main className="relative min-h-[calc(100vh-82px)] overflow-hidden bg-olive px-5 py-12 text-ivory sm:px-10 lg:px-16 lg:py-20">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-moss/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-peach/15 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <section className="max-w-md lg:pl-6">
          <a className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-peach transition-colors hover:text-ivory" href="#">
            <span aria-hidden="true">←</span> Back to Wearly
          </a>
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.22em] text-moss">Your wardrobe, reimagined</p>
          <h1 className="max-w-lg font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-ivory sm:text-6xl">
            Good clothes deserve a good story.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-ivory/70">
            Join a more thoughtful way to discover, exchange, and give fashion a second life.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-ivory/65">
            <span className="h-px w-12 bg-moss" />
            <span>Community powered</span>
          </div>
        </section>

        <section className="relative [perspective:1400px]" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
          <div
            className="relative mx-auto max-w-[480px] rounded-[32px] border border-ivory/20 bg-ivory p-6 text-olive shadow-[14px_16px_0_#8F9E6C] transition-transform duration-200 sm:p-9"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="font-display text-lg font-bold">Wearly</span>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-brown/60">Member access</p>
              </div>
              <span className="grid h-10 w-10 rotate-[-8deg] place-items-center rounded-[12px_12px_12px_3px] bg-moss font-display font-bold text-ivory">W</span>
            </div>

            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">{isRegistering ? "Create your account" : "Welcome back"}</h2>
              <p className="mt-2 text-sm text-brown/65">{isRegistering ? "Start your Wearly journey today." : "Pick up where you left off."}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegistering && <label className="block text-sm font-bold text-brown">Username<input className={`${inputStyles} mt-2`} type="text" name="username" value={formData.username} onChange={updateField} placeholder="yourname" required autoComplete="username" /></label>}
              <label className="block text-sm font-bold text-brown">Email address<input className={`${inputStyles} mt-2`} type="email" name="email" value={formData.email} onChange={updateField} placeholder="you@example.com" required autoComplete="email" /></label>
              <label className="block text-sm font-bold text-brown">Password<div className="relative mt-2"><input className={`${inputStyles} pr-16`} type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={updateField} placeholder="Enter your password" required minLength="8" autoComplete={isRegistering ? "new-password" : "current-password"} /><button className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-moss hover:text-olive" type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? "Hide" : "Show"}</button></div></label>
              {!isRegistering && <div className="flex justify-end"><button className="text-xs font-bold text-moss hover:text-brown" type="button" onClick={() => { setStatus("working on Password reset"); setError(""); }}>Forgot password?</button></div>}
              <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-brown py-4 text-sm font-bold text-ivory shadow-[4px_4px_0_#8F9E6C] transition-all hover:-translate-y-1 hover:bg-olive hover:shadow-[6px_6px_0_#8F9E6C] disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : isRegistering ? "Create account" : "Log in"}<span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-brown/45"><span className="h-px flex-1 bg-brown/15" />or<span className="h-px flex-1 bg-brown/15" /></div>
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-brown/20 bg-transparent py-3.5 text-sm font-bold text-brown transition-all hover:-translate-y-0.5 hover:border-moss hover:bg-peach" type="button" onClick={startGoogleLogin}><GoogleIcon />Continue with Google</button>
            {error && <p className="mt-4 rounded-xl bg-red-100 px-3 py-2 text-center text-xs font-semibold text-red-800" role="alert">{error}</p>}
            {status && <p className="mt-4 rounded-xl bg-moss/15 px-3 py-2 text-center text-xs font-semibold text-brown" role="status">{status}</p>}
            <p className="mt-6 text-center text-sm text-brown/65">{isRegistering ? "Already have an account?" : "New to Wearly?"} <button className="font-bold text-moss hover:text-brown" type="button" onClick={() => switchMode(isRegistering ? "login" : "register")}>{isRegistering ? "Log in" : "Create an account"}</button></p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;