export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://rewear-final-p.onrender.com";
const API_REQUEST_BASE = import.meta.env.DEV ? "/api" : API_BASE_URL;

async function request(path, options = {}) {
  const response = await fetch(`${API_REQUEST_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(payload.detail)
      ? payload.detail.map((item) => item.msg).join(", ")
      : payload.detail || payload.message;
    throw new Error(detail || `Request failed with status ${response.status}`);
  }

  return payload;
}

export function loginUser(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function registerUser(details) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(details),
  });
}

export function getCurrentUser() {
  return request("/").then((payload) => {
    if (payload?.message && !payload.user) {
      return null;
    }

    return payload?.user || payload;
  });
}

export function startGoogleLogin() {
  window.location.assign(`${API_BASE_URL}/auth/login`);
}

export function completeGoogleLogin() {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token") || params.get("token");
  const refreshToken = params.get("refresh_token");

  if (!accessToken) {
    return false;
  }

  localStorage.setItem("wearly_access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("wearly_refresh_token", refreshToken);
  }

  window.history.replaceState({}, document.title, `${window.location.pathname}#home`);
  return true;
}