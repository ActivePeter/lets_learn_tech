-----------------------------------------------------------------增
-- select create_article('{}','{}','{}',ARRAY[1,2]::integer[]);

-----------------------------------------------------------------查
-- 无tag约束
SELECT articleid,author_uid,content,tags,title,
                    to_char(createtime,'yyyy-mm-dd hh24:mi:ss'),
                    to_char(edittime,'yyyy-mm-dd hh24:mi:ss')
                FROM public.article_info;

-- 有tag约束
SELECT articleid,author_uid,content,tags,title,
to_char(createtime,'yyyy-mm-dd hh24:mi:ss'),
to_char(edittime,'yyyy-mm-dd hh24:mi:ss')
FROM public.article_info
WHERE articleid in
                (SELECT articleid FROM public.article_tag_relation
                WHERE tagid in (1,2))