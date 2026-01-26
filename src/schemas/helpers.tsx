import z from 'zod';

const url = 'prueba-tecnica-api-tienda-moviles.onrender.com/images/';

export const safeUrl = () =>
  z
    .url()
    .refine(
      (url) =>
        url.startsWith(`https://${url}`) || url.startsWith(`http://${url}`),
      `URL must use https:// or http:// protocol and ${url}`,
    );
