## Remix + Supabase Authentication

Base project that shows how to do a basic auth with Supabase.

### Routes

- `/` -> protected index route, if no login redirects to `/login`
- `/login` -> logs in, creates session and redirects to `/`
- `/register` -> registers a new user, if it already exists, shows error
- `/logout` -> when called as a `POST` action or loaded, it tries to perform a `signOut` to `Supabase` auth, if success, redirects to `/login`

### Needed environment variables
To work fine, this project requires a few configuration environment variables inside `process.env`

- SUPABASE_URL=`url to the supabase project`
- SUPABASE_KEY=`your supabase project key`
- SESSION_SECRET=`a session secret you choose (it can be any random generated string, key, UUID...)`
