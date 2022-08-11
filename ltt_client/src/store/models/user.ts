export class CreateUserRequest {
    constructor(
        public email: string,
        public password: string,
        public verify: string,
        public username: string
    ) {
    }
}

export class UserSimpleInfo {
    constructor(
        username: string,//用户名
        avatoraddr: string,//头像地址
    ) {
    }
}