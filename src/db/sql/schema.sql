CREATE TABLE public.users (
  email varchar(100) NOT NULL PRIMARY KEY,
  name varchar(20),
  surname varchar(20),
  updated_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone NOT NULL
);