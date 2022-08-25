export class Comment{
    constructor(
        public uid:number,
        public content:string,
        public to_comment_or_article:boolean,
        public cid:number,
        public to_cid:number,
        public aid:number,
        public time:string
    ) {
    }
}