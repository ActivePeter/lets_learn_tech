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
        uid:number,
        username: string,//用户名
        // avatoraddr: string,//头像地址
    ) {
    }
}