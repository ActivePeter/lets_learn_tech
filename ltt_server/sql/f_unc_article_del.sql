CREATE OR REPLACE FUNCTION
    del_article(del_id bigint)
    LANGUAGE plpgsql
BEGIN
    delete from article_info where articleid = del_id;
    delete from article_tag_relation where articleid = del_id;
end;
