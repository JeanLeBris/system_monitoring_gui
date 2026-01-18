import { useState, useEffect } from 'react'
// import GeneralDashboardElement from './GeneralDashboardElement'
import './SystemDashboard.css'

interface Props {
  target: string;
  test: Object;
  home_lab_data: any;
}

function SystemDashboard({target, test, home_lab_data}: Props) {
  const [system, setSystem] = useState("localhost")       // Target to request data from system_monitoring_core process

  return (
    <div id="home-lab" className="system-dashboard">
      <div>
        <label htmlFor="system-target">System : </label>
        <input type="text" id="system-target" defaultValue={system} onChange={() => setSystem((document.getElementById("system-target") as HTMLInputElement).value)}/>
      </div>
      <div className="system-dashboard-content">
        <p style={{gridRow: 0, gridColumn: 0}}>test1</p>
        <p style={{gridRow: 0, gridColumn: 1}}>test2</p>
        <p style={{gridRow: 1, gridColumn: 0/1}}>test3</p>
        <p style={{gridRow: 2, gridColumn: 0/1}}>test4</p>
      </div>
    </div>
  )
}

export default SystemDashboard