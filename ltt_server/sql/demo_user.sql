
-----------------------------------------------------------------增
insert into user_info(username, password, email)
values ('haskd', 'sadasdasd', 'sdasdsd')
RETURNING id;

-----------------------------------------------------------------查
select * from user_info;