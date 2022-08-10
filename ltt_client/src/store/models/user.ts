export class CreateUserRequest{
    constructor(
        public email:string,
        public password:string,
        public verify:string,
        public username:string
    ) {
    }
}