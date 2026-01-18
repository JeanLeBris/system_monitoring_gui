import GeneralDashboardElement from './GeneralDashboardElement'
import './GeneralDashboard.css'

interface Props {
  target: string;
  test: Object;
  home_lab_data: any;
}

function GeneralDashboard({target, test, home_lab_data}: Props) {
  return (
    <>
      <div id="home-lab" className="general-dashboard">
        {test.data.map((item) => (
          <GeneralDashboardElement cpu_data={home_lab_data.get(item["ip"]).get("cpu-data")} ram_data={home_lab_data.get(item["ip"]).get("ram-data")} data={item} key={item["ip"]} />
        ))}
      </div>
    </>
  )
}

export default GeneralDashboard