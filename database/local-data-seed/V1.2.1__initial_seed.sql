-- Seed table: role
INSERT INTO public.role (name)
VALUES 
    ('Admin'),
    ('User')
;

-- Seed table: currency
INSERT INTO public.currency (name, prefix)
VALUES ('COP', '$');

-- Seed table: type
INSERT INTO public.type (name)
VALUES ('Trip');

-- Seed table: user
INSERT INTO public.user (username, email, first_name, second_name, password, role_id)
VALUES ('miguelc', 'miguel@example.com', 'Miguel', 'Carrillo', '$2b$10$bDoSWAc8zl46LhoX3c4BIuvzJL1AjPED66b1jJJYQ/TLe5CY93DyK', 1);

-- Seed table: event
INSERT INTO public.event (name, start_date, end_date, type_id)
VALUES ('Beach Trip', '2023-05-01', '2023-05-05', 1);

-- Seed table: expense
INSERT INTO public.expense (description, value, date, currency_id)
VALUES ('Six Pack', 100.00, '2023-05-02 10:00:00', 1);

-- Seed table: user_expense
INSERT INTO public.user_expense (user_id, expense_id, is_owner, ratio, paid)
VALUES (1, 1, true, 1.0, true);

-- Seed table: event_user
INSERT INTO public.event_user (user_id, event_id, is_admin)
VALUES (1, 1, true);

