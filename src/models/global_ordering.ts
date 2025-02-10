import Server_message from "./server_message"
import View_module from "./view_module"


type Global_ordering = {
  Local_Aru: number,
  Last_Proposed: number,
  Global_History: Map<number, global_slots>, 
}


type global_slots = {
  Proposal: Server_message, 
  Accepts: Map<number, Server_message>,
  Globally_Ordered_Update: View_module
}

export {Global_ordering, global_slots}