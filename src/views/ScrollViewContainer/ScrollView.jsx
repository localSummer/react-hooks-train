import React, { Component } from 'react'

class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
    this.handerScrolltolower = debounce(this.handerScrolltolower, 300)
  }

  node = null

  handleScroll = (e) => {
    const { scroll } = this.props
    scroll && scroll(e)
    this.handerScrolltolower()
  }

  /** 判断滚动条是否到底部 */
  handerScrolltolower() {
    const { scrolltolower } = this.props
    const { scrollHeight, scrollTop, offsetHeight } = this.node
    if (scrollHeight === scrollTop + offsetHeight) {
      scrolltolower && scrolltolower()
    }
  }

  componentDidMount() {
    this.node.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { list } = this.state
    const { component } = this.props
    return (
      <div className="list_box" ref={(node) => (this.node = node)}>
        <div>
          {list.map((item) =>
            React.createElement(component, {
              item,
              key: item.id,
            })
          )}
        </div>
      </div>
    )
  }
}

export default ScrollView
