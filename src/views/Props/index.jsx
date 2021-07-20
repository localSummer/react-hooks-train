import React from 'react'

const Container = (props) => {
  const ContainerProps = {
    name: 'alien',
    mes: 'let us learn react',
  }
  /** React.Children.map 会自动过滤掉非 ReactElement 类型的子元素 */
  return props.children.map((item, index) => {
    if (React.isValidElement(item)) {
      return React.cloneElement(item, { ...ContainerProps, key: index }, item.props.children)
    } else if (typeof item === 'function') {
      return item(ContainerProps)
    } else return null
  })
}

const Children = (props) => (
  <div>
    <div>hello, my name is {props.name} </div>
    <div> {props.mes} </div>
  </div>
)

/** props 混合注入 */
const Props = () => {
  return (
    <Container>
      <Children test="child-one" />
      {(ContainerProps) => <Children {...ContainerProps} name="haha" />}
    </Container>
  )
}

export default Props
