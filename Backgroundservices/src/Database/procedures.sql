create or replace procedure UserRegisterEmail()
as 
$$
  begin
      perfom * from users where issent ='0';
  end;
$$
language plpgsql;
