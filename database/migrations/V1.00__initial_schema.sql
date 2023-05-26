-- Create table: role
CREATE TABLE IF NOT EXISTS public.role
(
    id serial CONSTRAINT role_pk PRIMARY KEY,
    name text
);

-- Create table: currency
CREATE TABLE IF NOT EXISTS public.currency
(
    id serial CONSTRAINT currency_pk PRIMARY KEY,
    name text,
    prefix text
);

-- Create table: type
CREATE TABLE IF NOT EXISTS public.type
(
    id serial CONSTRAINT type_pk PRIMARY KEY,
    name text
);

-- Create table: user
CREATE TABLE IF NOT EXISTS public.user
(
    id serial CONSTRAINT user_pk PRIMARY KEY,
    username text,
    email text,
    first_name text,
    second_name text,
    password text,
    role_id integer REFERENCES public.role (id)
);

-- Create table: event
CREATE TABLE IF NOT EXISTS public.event
(
    id serial CONSTRAINT event_pk PRIMARY KEY,
    name text,
    start_date date,
    end_date date,
    type_id integer REFERENCES public.type (id)
);

-- Create table: expense
CREATE TABLE IF NOT EXISTS public.expense
(
    id serial CONSTRAINT expense_pk PRIMARY KEY,
    description text,
    value float,
    date timestamp,
    currency_id integer REFERENCES public.currency (id)
);

-- Create table: user_expense
CREATE TABLE IF NOT EXISTS public.user_expense
(
    id serial CONSTRAINT user_expense_pk PRIMARY KEY,
    user_id integer REFERENCES public.user (id),
    expense_id integer REFERENCES public.expense (id),
    is_owner boolean,
    ratio float,
    paid boolean
);

-- Create table: event_user
CREATE TABLE IF NOT EXISTS public.event_user
(
    id serial CONSTRAINT event_user_pk PRIMARY KEY,
    user_id integer REFERENCES public.user (id),
    event_id integer REFERENCES public.event (id),
    is_admin boolean
);

-- Add relationships between tables
ALTER TABLE public.user ADD CONSTRAINT user_role_fk FOREIGN KEY (role_id) REFERENCES public.role (id);
ALTER TABLE public.event ADD CONSTRAINT event_type_fk FOREIGN KEY (type_id) REFERENCES public.type (id);
ALTER TABLE public.expense ADD CONSTRAINT expense_currency_fk FOREIGN KEY (currency_id) REFERENCES public.currency (id);
ALTER TABLE public.user_expense ADD CONSTRAINT user_expense_user_fk FOREIGN KEY (user_id) REFERENCES public.user (id);
ALTER TABLE public.user_expense ADD CONSTRAINT user_expense_expense_fk FOREIGN KEY (expense_id) REFERENCES public.expense (id);
ALTER TABLE public.event_user ADD CONSTRAINT event_user_user_fk FOREIGN KEY (user_id) REFERENCES public.user (id);
ALTER TABLE public.event_user ADD CONSTRAINT event_user_event_fk FOREIGN KEY (event_id) REFERENCES public.event (id);

