// 用mockjs模拟生成数据
const Mock = require('mockjs');


// 返回的data会作为json-server的数据
module.exports = () => (
  Mock.mock({
    'students|200': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        'name': '@cname',
        "class|1": ["三年一班", "三年二班"],
        "school|1": ["高新二中", "高新一中"],
        "star|1-5": 1,
        "age|14-18": 1,
        "date": '@date',
        "address":{
          "sex|1":[true,false]
        }
      },
    ],
    "messages|50": [
      {
        'id|+1': 1,
        'content': '@csentence(10,20)',
        'studentId|1-20': 1
      }
    ],
    hobbys: [
      {
        id: 1,
        'name': '篮球',
        studentId: 10
      },
      {
        id: 2,
        'name': '乒乓球球',
        studentId: 10
      }
    ],
    levels: [
      {
        id: 1,
        important: '重要'
      },

      {
        id: 2,
        important: '不重要'
      }
    ]
  })
)