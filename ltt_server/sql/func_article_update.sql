CREATE OR REPLACE FUNCTION
    update_article(aid_ bigint,title_ text,content_ text,rawtext_ text,tagids bigint[])
    RETURNS bigint
    LANGUAGE plpgsql
AS
$$
declare
    id_
        bigint;
begin
    if aid_ not in (select articleid from article_info) then
--         文章不存在
        return 0;
    end if;
    update article_info set content=content_,
                            title=title_,
                            rawtext=rawtext_,
                            tags='['||array_to_string(tagids, ',')||']',
                            edittime=now()
    where articleid=aid_;
--     删除没有了的
    delete from article_tag_relation
    where articleid=aid_ and not (tagid=any(tagids));
--
    FOREACH
        id_ in  ARRAY tagids LOOP
            --          新的插入
            insert into article_tag_relation(articleid, tagid)
            select aid_,id_
                   --     select tagid from article_tag_relation
            where (aid_,id_) not in (select articleid,tagid from article_tag_relation);
        END LOOP;
    return 1;
end

$$