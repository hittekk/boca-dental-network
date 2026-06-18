-- Security hardening: do NOT auto-grant a role to signups after the first.
-- Previously every signup after the owner got 'editor' (content + leads access).
-- Now: first user => owner; all later signups => profile row only, NO role,
-- so is_member() is false and RLS denies everything until an owner/admin grants a role.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''));

  -- Only the very first registered user is bootstrapped as owner.
  if (select count(*) from auth.users) = 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'owner');
  end if;
  -- All subsequent signups intentionally receive NO role (no access)
  -- until an owner/admin explicitly assigns one.

  return new;
end;
$function$;