export class TagInfo{
    constructor(
        public tagid:number,
        public tagname:string
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
// export class TagProxy{
//
// }