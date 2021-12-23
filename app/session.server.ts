import { createCookieSessionStorage } from 'remix';

const authTokenID: string = 'authToken';
const refreshTokenID: string = 'refreshToken';

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('env SESSION_SECRET must be set');
}

export let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',

      // all of these are optional
      expires: new Date('2100-01-01T00:00:00Z'),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [sessionSecret],
      secure: true,
    },
  });
