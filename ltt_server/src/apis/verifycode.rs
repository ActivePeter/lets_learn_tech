use axum::Json;

// 验证码是发到邮箱里的，根据随机函数随机生成一个六位整数
// 然后将这样一个pair加入到一个哈希表中
// 最后就是定时功能，超过一定时间这个验证码就失效。
struct EmailHash {
    email : String,
    verify_code : i32
}
