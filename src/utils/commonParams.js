import { list, detail } from "@/api/pur/msg"

// 获取结算方式
export default function getmsglist(){
  list().then(res => {
    return res
  });
}