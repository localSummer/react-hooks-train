const formInstanceApi = [
  'setCallback',
  'dispatch',
  'registerValidateFields',
  'setFields',
  'setFieldsValue',
  'getFieldsValue',
  'getFieldValue',
  'validateFields',
  'submit',
  'unRegisterValidate',
]

const isReg = (value) => value instanceof RegExp

class FormStore {
  constructor(forceUpdate, defaultFormValue = {}) {
    this.forceUpdate = forceUpdate
    this.model = {}
    this.control = {}
    this.isSchedule = false
    this.callback = {}
    this.peddingValidateQueue = []
    this.defaultFormValue = defaultFormValue
  }

  getForm() {
    return formInstanceApi.reduce((map, item) => {
      map[item] = this[item].bind(this)
      return map
    }, {})
  }

  /** 创建一个验证模块 */
  static createValidate(validate) {
    const { value, rule, required, message } = validate
    return {
      value,
      rule: rule || (() => true),
      required: required || false,
      message: message || '',
      status: 'pendding',
    }
  }

  /** 处理回调函数 */
  setCallback(callback) {
    if (callback) {
      this.callback = callback
    }
  }

  /** 触发事件 */
  dispatch(action, ...args) {
    if (!action && typeof action !== 'object') return null
    const { type } = action
    if (~formInstanceApi.indexOf(type)) {
      return this[type](...args)
    } else if (typeof this[type] === 'function') {
      return this[type](...args)
    }
  }

  /** 注册表单单元项 */
  registerValidateFields(name, control, model) {
    if (this.defaultFormValue[name]) {
      model.value = this.defaultFormValue[name]
    }
    const validate = FormStore.createValidate(model)
    this.model[name] = validate
    this.control[name] = control
  }
}
