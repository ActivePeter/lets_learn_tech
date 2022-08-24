import {UserBasicInfo} from "@/store/models/user";

export class Article{
    constructor(
        public id:number,
        public title:string,
        public content:string,
        public author_id:number,
        public create_time:string,
        public edit_time:string,
        public tag_ids:number[]
    ) {
    }
    static emptu(){
        return new Article(
            -1,"","",-1,"",
            "",[]
        )
    }
}

export class ArticlePreview{
    constructor(
        public id:number,
        public title:string,
        public preview:string,
        public author_id:number,
        public create_time:string,
        public edit_time:string,
        public tag_ids:number[]
    ) {
    }
}
// export class PageOfArticle{
//     constructor(
//         public pageindex:number,
//         public articles:ArticlePreview[]
//     ) {
//     }
//     static testpre(){
//         let arr=[]
//         for(let i=0;i<10;i++){
//             arr.push(
//                 new ArticlePreview(
//                     0,
//                     "title",
//                     "content",
//                     new UserBasicInfo(
//                         "hhh",
//                         "",""
//                     )
//                 )
//             )
//         }
//         return new PageOfArticle(
//             0,
//             arr
//         )
//     }
// }

export class ArticlePreviewMap{
    private _map:any={}
    insert(article:ArticlePreview){
        this._map["$"+article.id]=article
    }
    getbyid(id:number):ArticlePreview{
        return this._map["$"+id]
    }
    constructor() {
    }
}