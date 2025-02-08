import View_module from "./view_module"


type global_ordering = {
  Local_Aru: number,
  Last_Proposed: number,
  Global_History: Map<number, global_slots>, 
}


type global_slots = {
  Proposal: Proposal, 
  Accepts: Map<number, Accept>,
  Globally_Ordered_Update: View_module
}