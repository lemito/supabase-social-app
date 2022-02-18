CREATE TABLE users (
  id text PRIMARY KEY NOT NULL,
  email text NOT NULL,
  username text NOT NULL,
  first_name text,
  last_name text,
  age int,
  avatar_url: text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  user_id text REFERENCES users,
  created_at timestamp DEFAULT now()
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  content text NOT NULL,
  user_id text REFERENCES users,
  post_id int REFERENCES posts,
  created_at timestamp DEFAULT now()
);

CREATE TABLE likes (
  id serial PRIMARY KEY,
  user_id text REFERENCES users,
  post_id int REFERENCES posts,
  created_at timestamp DEFAULT now()
);