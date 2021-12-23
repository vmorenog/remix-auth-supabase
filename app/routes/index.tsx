import { json, LoaderFunction, redirect } from 'remix';
import { destroySession, getSession } from '~/session.server';
import { Form } from '@remix-run/react';
import { isSessionAuthorized, isTokenExpired } from '~/auth.server';
import { useEffect } from 'react';

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get('Cookie'));

  const isAuthorized = await isSessionAuthorized(session);

  if (!isAuthorized) {
    return redirect('/login', {
      headers: { 'Set-Cookie': await destroySession(session) },
    });
  } else {
    // User is able to enter the app normally :)
    return json({});
  }
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h3>App Index route</h3>
      <Form action="/logout" method="post">
        <button type="submit">logout</button>
      </Form>
    </div>
  );
}
