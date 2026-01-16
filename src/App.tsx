import { useState } from 'react'
import GeneralDashboard from './components/GeneralDashboard'
import PageHeader from './components/PageHeader'
import './App.css'

function App() {
  const [target, setTarget] = useState("localhost")
  
  const handler = () => {
    setTarget((document.getElementById("environment-target") as HTMLInputElement).value)
  }
  
  console.log(target)

  return (
    <>
      <PageHeader targetHandler={handler} />
      <GeneralDashboard target={target} />
    </>
  )
}

export default App