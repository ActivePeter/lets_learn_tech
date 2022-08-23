export class TagInfo{
    constructor(
        public tag_id:number,
        public tag_name:string,
        public artcnt:number
    ) {
    }
}
export class TagSet{
    constructor(
        public tagsetname:string,
        public tags:TagInfo[]
    ) {
    }
}
export class AllTags{
    constructor(
        public tagsets:TagSet[],
    ) {
    }
    static pre(){
        return new AllTags([])
    }
}