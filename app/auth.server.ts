import jwtDecode, { JwtPayload } from 'jwt-decode';
import { supabaseClient } from '~/db.server';
import { Session } from 'remix';

export function isTokenExpired(token: string): boolean {
  const now = new Date();
  const decodedToken: JwtPayload = jwtDecode(token);

  if (!decodedToken.exp) {
    return true;
  }

  const tokenDate = new Date(decodedToken.exp * 1000);

  return tokenDate < now;
}

export async function isSessionAuthorized(session: Session): Promise<boolean> {
  if (!session) {
    return false;
  }

  if (!session.get('access_token')) {
    return false;
  }
  const token = session.get('access_token');

  if (isTokenExpired(token)) {
    return false;
  }

  const { user } = await supabaseClient.auth.api.getUser(token);

  return user?.aud === 'authenticated';
}
