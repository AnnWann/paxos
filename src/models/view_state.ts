import View_module from "./view_module"


type View_state = {
  Last_Attempted: number,
  Last_Installed: number,
  VC: Map<number, View_module[]>
}

export default View_state