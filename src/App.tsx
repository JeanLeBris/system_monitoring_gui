import { useState, useEffect } from 'react'
import GeneralDashboard from './components/GeneralDashboard'
import PageHeader from './components/PageHeader'
import './App.css'
import NavigationBar from './components/NavigationBar'

function App() {
  const [target, setTarget] = useState("localhost")       // Target to request data from system_monitoring_core process
  const [navigation, setNavigation] = useState("general") // Menu selected on the dashboard
  const [test, set_test] = useState({size: 0, data:[]});  // Data fetched in base JSON format
  const [home_lab_data, ] = useState(new Map());          // Data fetched and processed in a better format
  
  const targetHandler = (value: string) => {
    setTarget(value)
    console.log(value)
  }
  
  const navigationHandler = (value: string) => {
    setNavigation(value)
  }
  
  function process_answer(data: any){
    if(data.data[0].ip == "local")
      data.data[0].ip = "127.0.0.1"
    set_test(data)

    let amount_of_systems = data.size;
    let environment = data.data;
    let system_and_meta;
    let ip;
    let system;
    let size = 50

    for(let i = 0; i < amount_of_systems; i++){
      system_and_meta = environment[i];

      ip = system_and_meta.ip;
      system = system_and_meta.system;

      if(home_lab_data.get(ip) == undefined){
        home_lab_data.set(ip, new Map())
        home_lab_data.get(ip).set("cpu-data", new Array(size).fill(NaN))
        home_lab_data.get(ip).set("ram-data", new Array(size).fill(NaN))
      }
      if(system.accessed){
        home_lab_data.get(ip).get("cpu-data").push(system.cpu.load_percentage)
        home_lab_data.get(ip).set("cpu-data", home_lab_data.get(ip).get("cpu-data").slice(1, size))
        home_lab_data.get(ip).get("ram-data").push(Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram))
        home_lab_data.get(ip).set("ram-data", home_lab_data.get(ip).get("ram-data").slice(1, size))
      }
    }
  }

  function process_disconnection(err: any){
    console.log(err)
    let container_parent = document.getElementById("home-lab") as HTMLElement;
    let container;
    for(let i = 0; i < container_parent.childElementCount; i++){
      container = container_parent.children[i];
      container.className = "environment-system inactive";
    }
  }

  function get_data(target: string){
    // let target = (document.getElementById("environment-target") as HTMLInputElement).value
    if(target == "localhost"){
      target = "127.0.0.1"
    }

    let tmp = new Uint8Array(16);
    tmp.set(new TextEncoder().encode("get info"), 0)
    tmp.reverse()
    let tmp_buffer = tmp.buffer;
    fetch("http://" + target + ":4148", {method: "POST", body: tmp_buffer, signal: AbortSignal.timeout(500)})
    .then(answer => answer.json())
    .then(data => process_answer(data))
    .catch(err => process_disconnection(err))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      get_data(target);
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <>
      <NavigationBar navigationHandler={navigationHandler} />
      <div id='body'>
        <PageHeader targetHandler={targetHandler} />
        {navigation == "general" && <GeneralDashboard target={target} test={test} home_lab_data={home_lab_data} />}
      </div>
    </>
  )
}

export default App