import './PageHeader.css'

interface Props {
  targetHandler: Function;
}

function PageHeader({targetHandler}: Props) {
  return (
    <>
      <label htmlFor="environment-target">Target : </label>
      <input type="text" id="environment-target" defaultValue="localhost" onChange={(value) => targetHandler(value)}/>
      <h1>System monitoring</h1>
    </>
  )
}

export default PageHeader