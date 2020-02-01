import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    imgUrl: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    datetime: +Mock.Random.date('T'),
    title: '@name()'
  }))
}
export default {
  getList: () => {
    return {
      total: List.length,
      list: List
    }
  }
}
