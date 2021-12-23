import { Form, Link, useActionData } from '@remix-run/react';
import { ActionFunction, redirect } from 'remix';
import { commitSession, getSession } from '~/session.server';
import { supabaseClient } from '~/db.server';

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  if (!email || !password) {
    return { error: 'email or password not sent' };
  }

  // login using the credentials
  const { session: userSession, error } = await supabaseClient.auth.signIn({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!userSession) {
    return {
      error: 'Session for user not found',
    };
  }

  session.set('access_token', userSession.access_token);
  session.set('refresh_token', userSession.access_token);
  supabaseClient.auth.setAuth(userSession.access_token);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div>
      <Form method="post">
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="email">password</label>
          <input type="password" name="password" id="password" />
        </fieldset>

        <fieldset>
          <button type="submit">Login</button>
        </fieldset>
      </Form>
      <div>
        <Link to="/register">Register new user </Link>
      </div>
      <div>
        {actionData?.error && (
          <span style={{ color: 'red' }}>{actionData?.error}</span>
        )}
      </div>
    </div>
  );
}
