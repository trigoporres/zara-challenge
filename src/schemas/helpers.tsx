import z from 'zod';

const allowedDomain = 'prueba-tecnica-api-tienda-moviles.onrender.com/images/';

export const safeUrl = () =>
  z
    .url()
    .refine(
      (value) =>
        value.startsWith(`https://${allowedDomain}`) ||
        value.startsWith(`http://${allowedDomain}`),
      `URL must use https:// or http:// protocol and ${allowedDomain}`,
    );
