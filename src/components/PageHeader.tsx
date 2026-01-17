import './PageHeader.css'

interface Props {
  targetHandler: Function;
}

function PageHeader({targetHandler}: Props) {
  return (
    <div id="header">
      <div>
        <label htmlFor="environment-target">Target : </label>
        <input type="text" id="environment-target" defaultValue="localhost" onChange={() => targetHandler((document.getElementById("environment-target") as HTMLInputElement).value)}/>
      </div>
      <h1>System monitoring</h1>
      <div />
    </div>
  )
}

export default PageHeader