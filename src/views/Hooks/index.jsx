import React, { useState, useRef, useImperativeHandle, useEffect, memo, forwardRef, useCallback } from 'react'

const ChildComponent = memo(
  forwardRef((props, ref) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      console.log('child rerender')
    })

    useImperativeHandle(ref, () => ({
      addCount: handleAdd,
    }))

    const handleAdd = useCallback(() => {
      setCount(count + 1)
    }, [count])

    return (
      <div>
        {count}
        <button onClick={handleAdd}>child</button>
      </div>
    )
  })
)

const Hooks = () => {
  const [language, setLanguage] = useState('zh-cn')
  const childRef = useRef(null)

  const handleLanguage = () => {
    setLanguage(language + Math.random())
  }

  const handClick = () => {
    childRef.current.addCount()
  }

  return (
    <div>
      {language}
      <button onClick={handleLanguage}>update language</button>
      <ChildComponent ref={childRef} />
      <button onClick={handClick}>child component do something</button>
    </div>
  )
}

export default Hooks
