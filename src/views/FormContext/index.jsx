import React, { useRef } from 'react'
import Form from './Form'
import FormItem from './FormItem'
import Input from './Input'

const FormContext = () => {
  const formRef = useRef(null)

  const submit = () => {
    formRef.current.submitForm((formData) => {
      console.log(formData)
    })
  }

  const reset = () => {
    formRef.current.resetForm()
  }

  return (
    <div className="form-context">
      <Form ref={formRef}>
        <FormItem name="name" label="用户名">
          <Input />
        </FormItem>
        <FormItem name="password" label="密码">
          <Input type="password" />
        </FormItem>
      </Form>
      <div className="operate">
        <button onClick={submit}>提交</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  )
}

export default FormContext
