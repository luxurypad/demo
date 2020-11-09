/*
参数是一个对象，格式如下：
{
    path:String,    eg. '/students'
    query:Object,   eg. { 
                            _page: 1,
                            _limit: 10,
                            param1:value,
                            param2:['value1','value2']
                            ......
                        },
    method:String,  eg.  'POST'||'DELETE'||'PUT'||'GET'
    
}
*/

//服务器地址信息
const HOST = 'http://localhost:5000'
const HEADERS = {
  'content-type': 'application/json',
  'Authorization': ''
}

//定义异步网络请求函数
export default async (request) => {
  //解构网络请求参数
  let { path, query, method, body } = request

  //query对象处理，将query对象转换成?param1=value1&param2=value2&param3=valu4,valu5的形式,同时过滤掉value为undefined和null的参数
  //过滤掉值为null和undefined
  query = Object.entries(query || {})
    .filter(v => v[1] !== undefined && v[1] !== null)
    //过滤掉值为数组中null和undefined成员
    .map(v => {
      if (Array.isArray(v[1])) {
        v[1] = v[1].filter(v => v !== undefined && v !== null)
        return v[0] + '=' + v[1]
      }
      return v.join('=')
    })
    .join('&')

  const url = HOST + path + (query.length === 0 ? '' : '?' + query)

  console.log(method + ':' + url)
  try {
    //通过fetch api进行网络请求
    const response = await fetch(url, {
      headers: HEADERS,
      method,
      body: JSON.stringify(body)
    })
    //从响应头中获取总数（用于分页）,没有总数的话就为undefined，这里获取到的值为string类型
    const totalCount = response.headers.get('X-Total-Count')
    //从响应体解析为json对象
    const data = await response.json()
    //返回数据和总数
    return {
      //返回数据转化为数组，方便遍历
      data: Array.isArray(data) ? data : [data],
      totalCount
    }
  } catch (error) {
    throw error
  }
}