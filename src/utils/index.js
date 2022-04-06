const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 1. Promise是一个类，需要传递一个执行器进去，执行器会立即执行
 * 2. Promise 有三种状态，状态一旦改变就不可二次修改
 * 3. 支持链式回调then函数，返回一个新的 Promise
 */
class MyPromise {
  constructor(executor) {
    /** 增加执行器的错误捕获 */
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  status = PENDING

  /** resolve 的值 */
  value = undefined

  /** reject 的原因 */
  reason = undefined

  successCallbacks = []

  failCallbacks = []

  resove = (value) => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    this.successCallbacks.forEach((successCallback) => {
      successCallback()
    })
  }

  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    this.failCallbacks.forEach((failCallback) => {
      failCallback()
    })
  }

  then = (resolveFn, rejectFn) => {
    resolveFn = resolveFn ? resolveFn : (value) => value
    rejectFn = rejectFn
      ? rejectFn
      : (reason) => {
          throw reason
        }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        /** 异步保证可以拿到 promise2 变量, 增加错误捕获 */
        setTimeout(() => {
          try {
            let value = resolveFn(this.value)
            resolvePromise(promise2, value, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let value = rejectFn(this.reason)
            resolvePromise(promise2, value, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let value = resolveFn(this.value)
              resolvePromise(promise2, value, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let value = rejectFn(this.value)
              resolvePromise(promise2, value, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  static all(arr) {
    let result = []
    /** 标记数组当前已处理的项数 */
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        /** 全部处理成功后，resolve 结果 */
        if (index === arr.lenth) {
          resolve(result)
        }
      }

      for (let i = 0; i < arr.lenth; i++) {
        let current = arr[i]
        if (current instanceof MyPromise) {
          current.then(
            (value) => {
              addData(i, value)
            },
            (reason) => {
              reject(reason)
            }
          )
        } else {
          addData(i, arr[i])
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    } else {
      return new MyPromise((resolve) => {
        resolve(value)
      })
    }
  }
}

/** 处理 then 中返回的promise */
function resolvePromise(promise2, value, resolve, reject) {
  /** 判断是否循环引用 */
  if (promise2 === value) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (value instanceof MyPromise) {
    value.then(
      (value) => {
        resolve(value)
      },
      (reason) => {
        reject(reason)
      }
    )
  } else {
    resolve(value)
  }
}
