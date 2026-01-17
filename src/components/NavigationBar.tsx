import './NavigationBar.css'

interface Props {
  navigationHandler: Function;
}

function NavigationBar({navigationHandler}: Props) {
  return (
    <div id="navbar">
        <img src="./src/assets/copy-paste.png" onClick={() => navigationHandler("general")} />
        <img src="./src/assets/copy-paste.png" onClick={() => navigationHandler("system")} />
        <img src="./src/assets/copy-paste.png" onClick={() => navigationHandler("other")} />
    </div>
  )
}

export default NavigationBar