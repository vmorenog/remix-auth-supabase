import { Form, useActionData } from '@remix-run/react';
import { ActionFunction } from 'remix';
import { supabaseClient } from '~/db.server';

export let action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = String(form.get('email'));
  const password = String(form.get('password'));
  const repeatPassword = form.get('repeat-password');

  if (password !== repeatPassword) {
    return {
      error: 'passwords must match',
    };
  }

  // Create user on supabase auth
  try {
    const { user } = await supabaseClient.auth.signUp(
      {
        email,
        password,
      },
      { redirectTo: 'http://localhost:3000/login/' }
    );

    if (user !== null) {
      return {
        error: 'User email already registered 😤',
      };
    }

    return {
      message: 'Confirm your email 😉',
    };
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default function Register() {
  const actionData = useActionData();

  return (
    <section>
      <Form method="post">
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Password</label>
          <input type="password" name="password" id="password" />
        </fieldset>
        <fieldset>
          <label htmlFor="repeat-password">Repeat password</label>
          <input type="password" name="repeat-password" id="repeat-password" />
        </fieldset>

        <div>
          <button type="submit">Register user</button>
        </div>
        <div>
          {actionData?.error && (
            <span style={{ color: 'red' }}>{actionData.error}</span>
          )}
          {actionData?.message && (
            <span style={{ color: 'blue' }}>{actionData.message}</span>
          )}
        </div>
      </Form>
    </section>
  );
}
