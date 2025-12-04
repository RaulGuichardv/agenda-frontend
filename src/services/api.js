import { useAuthStore } from '../stores/auth';

const API_BASE = 'http://localhost:8000';

export async function apiFetch(path, { method = 'GET', body = null, headers = {}, queryParams = null } = {}) {
  const auth = useAuthStore();
  const url = new URL(API_BASE + path);
  if (queryParams) {
    Object.entries(queryParams).forEach(([k, v]) => url.searchParams.append(k, v));
  }

  const h = {
    'Content-Type': 'application/json',
    ...headers
  };
  if (auth.token) {
    h['Authorization'] = 'Bearer ' + auth.token;
  }

  const res = await fetch(url.toString(), {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : null
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const errMsg = data && data.error ? data.error : res.statusText;
    throw { status: res.status, message: errMsg, body: data };
  }
  return data;
}
