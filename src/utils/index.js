const myInstanceof = (left, right) => {
  // 基础类型直接退出
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}

const getType = (obj) => {
  let type = typeof obj
  // 基础类型直接返回，function类型也返回
  if (type !== 'object' || obj === null) return type
  return console.log(Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'))
}
