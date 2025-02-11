import { Proposal } from "./prepare"
import client_update from "./view_module"


type Global_ordering = {
  Local_Aru: number,
  Last_Proposed: number,
  Global_History: Map<number, global_slots>, 
}


type global_slots = {
  Proposal: Proposal, 
  Accepts: Map<number, Proposal>,
  Globally_Ordered_Update: client_update
}

export {Global_ordering, global_slots}