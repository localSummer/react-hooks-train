/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import TestImg from './images/expression.png'

const ImgToClipboard = () => {
  const canvasWrap = useRef(null)
  const canvasRef = useRef(null)

  useEffect(
    () => () => {
      canvasRef.current = null
    },
    []
  )

  const getCanvas = (element) =>
    new Promise((resolve) => {
      if (canvasRef.current) {
        return resolve(canvasRef.current)
      }
      html2canvas(element, {
        useCORS: true,
      }).then((canvas) => {
        canvasRef.current = canvas
        resolve(canvas)
      })
    })

  const handleCopy = () => {
    html2canvas(document.querySelector('.html-canvas'), {
      height: 60,
    }).then((canvas) => {
      let imgUrl = canvas.toDataURL('image/png')
      const image = document.createElement('img')
      image.src = imgUrl
      image.style.height = '60px'
      image.onload = function () {
        const selection = window.getSelection()
        if (selection.rangeCount > 0) {
          selection.removeAllRanges()
        }
        if (!document.queryCommandSupported('copy')) {
          console.log('浏览器不支持复制命令')
        }
        const range = document.createRange()
        range.selectNode(image)
        selection.addRange(range)
        document.execCommand('copy')
        selection.removeAllRanges()
      }
      canvasWrap.current.appendChild(image)
    })
  }

  const handleCopy2 = async () => {
    const canvas = await getCanvas(document.querySelector('.html-canvas'))
    canvas.toBlob(async (blob) => {
      const data = [
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]
      navigator.clipboard
        .write(data)
        .then(() => {
          console.log('Copied to clipboard successfully!')
        })
        .catch(() => {
          console.error('Unable to write to clipboard.')
        })
    })
  }

  const handleSave = async () => {
    let canvas = await getCanvas(document.querySelector('.html-canvas'))
    const imgUrl = canvas.toDataURL('image/png')
    const aEle = document.createElement('a')
    aEle.download = 'download'
    aEle.href = imgUrl
    const event = new MouseEvent('click')
    aEle.dispatchEvent(event)
  }

  return (
    <div className="html-canvas-wrap" ref={canvasWrap}>
      <div className="html-canvas">
        <h3>标题</h3>
        <p>标题描述</p>
        <img src={TestImg} alt="" />
      </div>
      <button onClick={handleCopy}>execCommend copy</button>
      <button onClick={handleCopy2}>clipboard copy</button>
      <button onClick={handleSave}>保存图片</button>
    </div>
  )
}

export default ImgToClipboard
