import {UserSimpleInfo} from "@/store/models/user";

export class Article{
    constructor(
        public id:number,
        public title:string,
        public content:string,
        public author:string
    ) {
    }
}

export class ArticlePreview{
    constructor(
        public id:number,
        public title:string,
        public contentcut:string,
        public authorinfo:UserSimpleInfo
    ) {
    }
}