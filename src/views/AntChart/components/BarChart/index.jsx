import React, { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
]

const BarChart = () => {
  const chartRef = useRef()

  useEffect(() => {
    const chart = new Chart({
      container: chartRef.current,
      autoFit: true,
      height: 500,
    })
    chart.data(data)
    chart.scale('sales', {
      nice: true,
      min: 0,
      max: 200,
      tickCount: 10,
    })
    chart.legend('year', {
      position: 'bottom',
    })
    chart.tooltip({
      showMarkers: false,
      showCrosshairs: true,
      shared: true,
    })
    chart.axis('year', {
      title: {
        text: '年份',
        style: {
          fill: '#1890ff',
        },
      },
    })
    chart.interaction('active-region')

    chart.interval().position('year*sales')

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [])

  return <div className="bar-chart-container" style={{ width: 500, height: 500 }} ref={chartRef}></div>
}

export default BarChart
