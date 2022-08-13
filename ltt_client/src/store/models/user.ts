export class CreateUserRequest {
    constructor(
        public email: string,
        public password: string,
        public verify: string,
        public username: string
    ) {
    }
}

export class UserBasicInfo {
    constructor(
        public uid:number,
        public username: string,//用户名
        public email:string
        // avatoraddr: string,//头像地址
    ) {
    }
}