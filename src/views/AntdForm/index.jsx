import React from 'react'

const App = () => {
  const handleFinish = (data) => {
    console.log('data: ', data)
  }

  return (
    <Form onFinish={handleFinish}>
      <FormItem name="name" label="小册名称">
        <Input />
      </FormItem>
      <FormItem name="author" label="小册作者">
        <Input />
      </FormItem>
      <Button htmlType="submit">提交</Button>
    </Form>
  )
}

export default App
