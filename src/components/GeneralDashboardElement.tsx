import './GeneralDashboardElement.css'
import { Chart } from 'chart.js/auto'
import { useEffect, useRef } from "react"

interface Props {
  cpu_data: Array<number>;
  ram_data: Array<number>;
  data: any;
}

function GeneralDashboardElement({cpu_data, ram_data, data}: Props) {
  const cpuCanvasRef = useRef(null);
  const cpuChartRef = useRef(null);
  const ramCanvasRef = useRef(null);
  const ramChartRef = useRef(null);

  function update_chart(chart: any, value: number){
    if(chart.data.labels.length == 50){
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.data.labels.push(chart.data.labels.at(-1)+1);
    chart.data.datasets[0].data.push(value);
    chart.update();
  }

  function create_chart(ctx: any, data: any, title: string){
    let generated_labels = Array(data.length)
    for(let i = 0; i < generated_labels.length; i++){
      generated_labels[i] = i
    }
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: generated_labels,
        datasets: [{
          label: title,
          data: data,
          fill: false,
          borderColor: 'black',
          tension: 0.1,
          pointStyle: false,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            // beginAtZero: true,
            ticks: {
              color: 'black'
            },
            min: 0,
            max: 100
          },
          x: {
            ticks: {
              color: 'black'
            },
            display: false
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black'
            }
          }
        },
        animation: false
      }
    });
  }

  useEffect(() => {
    cpuChartRef.current = create_chart(cpuCanvasRef.current, cpu_data, "cpu load")
    ramChartRef.current = create_chart(ramCanvasRef.current, ram_data, "ram load")

    return () => {
      cpuChartRef.current?.destroy();
      ramChartRef.current?.destroy();
    }
  }, [])

  useEffect(() => {
    if (!cpuChartRef.current) return;
    if(data.system.accessed){
      update_chart(cpuChartRef.current, cpu_data.at(-1))
      update_chart(ramChartRef.current, ram_data.at(-1))
    }
  })

  return (
    <div id={"home-lab-" + data.ip} className={'environment-system ' + (data.system.accessed ? 'on' : 'inactive')}>
      <span>
        <img src='./src/assets/copy-paste.png' width="20px" onClick={() => navigator.clipboard.writeText(data.ip == "local" ? "127.0.0.1" : data.ip)} />
        <h2 className='system-ip'>{data.system.hostname}</h2>
        <p>{data.ip}</p>
      </span>
      <div className='system-resources' style={{display: "flex"}}>
        <div className='system-resources cpu'>
          <canvas className='system-resources canvas' ref={cpuCanvasRef}/>
        </div>
        <div className='system-resources ram'>
          <canvas className='system-resources canvas' ref={ramCanvasRef}/>
        </div>
      </div>
    </div>
  )
}

export default GeneralDashboardElement