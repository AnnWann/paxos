import client_update from "./view_module"


type View_state = {
  Last_Attempted: number,
  Last_Installed: number,
  VC: Map<number, client_update[]>
}

export default View_state