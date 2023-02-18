CREATE OR REPLACE FUNCTION
    del_article(del_id bigint)
    RETURNS boolean
    LANGUAGE plpgsql
    AS
    $$
begin
    delete from article_info where articleid = del_id;
    delete from article_tag_relation where articleid = del_id;
    return 0;
end;
$$
