import { ActionFunction, LoaderFunction, redirect } from 'remix';
import { destroySession, getSession } from '~/session.server';
import { supabaseClient } from '~/db.server';

const doLogout: LoaderFunction | ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const access_token = session.get('access_token');

  if (!access_token) return redirect('/');

  const { error } = await supabaseClient.auth.api.signOut(access_token);

  if (error) {
    console.log('Logout error. ', error);
    return redirect('/');
  }

  session.unset('access_token');

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export let loader = doLogout;
export let action = doLogout;

export default function Logout() {
  return null;
}
