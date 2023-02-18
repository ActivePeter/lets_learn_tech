#run in prj root

class Api:
    # default constructor
    def __init__(self,apiname_snake:str,req,resp):
        self.apiname_snake = apiname_snake
        self.req=req
        self.resp=resp
class Arg:
    type_=""
    is_arr=False
    name=""
    def __init__(self,argname_snake:str):
        self.name=argname_snake
    def set_int(self):
        self.type_="int"
        return self
    def set_float(self):
        self.type_="float"
        return self
    def set_str(self):
        self.type_="str"
        return self
    def set_arr(self):
        self.is_arr=True
        return self

    def serialize_rust(self):
        def typename(type_):
            match type_:
                case "int":
                    return "i64"
                case "float":
                    return "f32"
                case "str":
                    return "String"
        return self.name+":"+typename(self.type_)

    def serialize_ts(self):
        def typename(type_):
            match type_:
                case "int":
                    return "number"
                case "float":
                    return "number"
                case "str":
                    return "string"
        return self.name+":"+typename(self.type_)

def snake_2_bigcamel(snake:str):
    components = snake.split('_')
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return ''.join(x.title() for x in components)

def file_read(path:str):
    file_object = open(path,'r') #创建一个文件对象，也是一个可迭代对象
    all_the_text=""
    try:
        all_the_text = file_object.read()  #结果为str类型
        print ("all_the_text=",all_the_text)
    finally:
        file_object.close()
    return all_the_text
def file_overwrite(path:str,content:str):
    with open(path, 'w') as file_object:
        file_object.write(content)

def client2server():
    apis=[
        Api("article_delete",
            [
                Arg("token").set_str(),
                Arg("articleid").set_int()
            ],
            [
                Arg("succ1_fail0").set_int(),
                Arg("info").set_str()
            ]
        )
    ]
    #生成apitrait约束的代码（函数模板）
    apitrait=""
    for api in apis:
        apitrait=apitrait+"async fn "+api.apiname_snake+"(\n"+\
        "   req:"+snake_2_bigcamel(api.apiname_snake)+"Req,\n"+\
        "   resp:"+snake_2_bigcamel(api.apiname_snake)+"Resp\n"+\
        ");\n"
    print(apitrait)

    apistruct=""
    for api in apis:
        # reqs
        apistruct=apistruct+"#[derive(Deserialize, Serialize)]\n"+\
        "pub(crate) struct "+snake_2_bigcamel(api.apiname_snake)+"Req{\n"
        fisrt=True
        for arg in api.req:
            if not fisrt:
                apistruct+=",\n"
            fisrt=False
            apistruct+="   pub(crate) "+arg.serialize_rust()
        apistruct=apistruct+"\n}\n"
        
        # resps
        apistruct=apistruct+"#[derive(Deserialize, Serialize)]\n"+\
        "pub(crate) struct "+snake_2_bigcamel(api.apiname_snake)+"Resp{\n"
        fisrt=True
        for arg in api.resp:
            if not fisrt:
                apistruct+=",\n"
            fisrt=False
            apistruct+="   pub(crate) "+arg.serialize_rust()
        apistruct=apistruct+"\n}\n"
    print(apistruct)

    # read template and replace
    file_object = open("./scripts/temp_api_generated.rs",'r') #创建一个文件对象，也是一个可迭代对象
    all_the_text=""
    try:
        all_the_text = file_object.read()  #结果为str类型
        # print (type(all_the_text))
        all_the_text=all_the_text.replace("[apitrait]",apitrait)
        all_the_text=all_the_text.replace("[apistruct]",apistruct)
        
        print ("all_the_text=",all_the_text)
    finally:
        file_object.close()

    with open("./ltt_server/src/apis/api_generated.rs", 'w') as file_object:
        file_object.write(all_the_text)

    # ts
    def gen_ts():
        apicall=""
        for api in apis:
            apicall=apicall+"export async function api_"+api.apiname_snake+"(\n"+\
            "   req:"+snake_2_bigcamel(api.apiname_snake)+"Req\n"+\
            "):Promise<"+snake_2_bigcamel(api.apiname_snake)+"Resp|undefined>{\n"\
            "    return axios.post(BaseUrl+'"+api.apiname_snake+"',req).then((res)=>{\n"\
            "        return res.data\n"\
            "    }).catch((e)=>{\n"\
            '        console.log("req err",e)\n'\
            "        return undefined\n"\
            "    })\n"\
            "}\n"
        print(apicall)

        apiclass=""
        for api in apis:
            # reqs
            apiclass=apiclass+\
            "export class "+snake_2_bigcamel(api.apiname_snake)+"Req{\n"\
            "   constructor(\n"
            fisrt=True
            for arg in api.req:
                if not fisrt:
                    apiclass+=",\n"
                fisrt=False
                apiclass+="      public "+arg.serialize_ts()
            apiclass=apiclass+"\n   ){}\n}\n"
            
            # resps
            apiclass=apiclass+\
            "export class "+snake_2_bigcamel(api.apiname_snake)+"Resp{\n"\
            "   constructor(\n"
            fisrt=True
            for arg in api.resp:
                if not fisrt:
                    apiclass+=",\n"
                fisrt=False
                apiclass+="      public "+arg.serialize_ts()
            apiclass=apiclass+"\n   ){}\n}\n"
        print(apiclass)
        file_overwrite(
            "ltt_client/src/store/net/api_generated.ts",
            file_read("scripts/temp_api_generated.ts").replace("[apicall]",apicall).replace("[apiclass]",apiclass)
        ) 
    gen_ts()
client2server()