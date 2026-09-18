export const API_BASE_URL = "https://rewear-final-p.onrender.com";
const API_REQUEST_BASE = import.meta.env.DEV ? "/api" : API_BASE_URL;

async function request(path, options = {}) {
  const response = await fetch(`${API_REQUEST_BASE}${path}`, {
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

export function startGoogleLogin() {
  window.location.assign(`${API_BASE_URL}/auth/login`);
}