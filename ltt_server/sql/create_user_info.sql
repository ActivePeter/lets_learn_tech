CREATE OR REPLACE FUNCTION
create_article(title_ text,content_ text,uid_ bigint,tagids bigint[])
  RETURNS bigint
  LANGUAGE plpgsql
 AS
 $$
 declare
count bigint;
  id_
bigint;
begin
with jjj as (insert into article_info(author_uid, content,
                                      createtime, edittime, title,tags)
values (uid_, content_, now(), now(), title_,
    '['||array_to_string(tagids, ',')||']')
    RETURNING articleid)
select * from jjj into count;
FOREACH
id_ in  ARRAY tagids LOOP
		insert into article_tag_relation(articleid,tagid)
		values(count,id_);
END LOOP;
return count;
end;

 $$