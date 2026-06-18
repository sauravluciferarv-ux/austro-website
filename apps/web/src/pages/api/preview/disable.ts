// Server-rendered: this route must NOT be prerendered
export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url, cookies, redirect }) => {
  cookies.delete('sanity-preview', { path: '/' });
  const target = new URL(url).searchParams.get('redirect') ?? '/';
  return redirect(target, 302);
};
