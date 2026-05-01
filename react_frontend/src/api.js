function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

export async function ensureCsrf() {
  await fetch("/api/csrf/", {
    method: "GET",
    credentials: "include",
  });
}

export async function apiFetch(path, options = {}) {
  const method = options.method ?? "GET";
  const headers = new Headers(options.headers ?? {});
  const hasBody = options.body !== undefined && !(options.body instanceof FormData);

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) {
    await ensureCsrf();
    const token = getCookie("csrftoken");
    if (token) headers.set("X-CSRFToken", token);
  }

  const response = await fetch(path, {
    ...options,
    method,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === "object" ? data.error ?? "Request failed" : data;
    throw new Error(message || `HTTP ${response.status}`);
  }

  return data;
}
