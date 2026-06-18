import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const previewCookie = context.cookies.get('sanity-preview');
  context.locals.isPreview = previewCookie?.value === 'true';
  return next();
});
