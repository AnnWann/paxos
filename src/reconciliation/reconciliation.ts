import Current_value from "current_value";
import __GLOBAL__ from "decision/GLOBAL";
import { Decision_Starter } from "decision_starter/Decision_Starter";
import { global_slots } from "models/global_ordering";
import view from "models/view";


function apply_view_change(server_id: number, view: view, global_history: Map<number, global_slots>){
  const lastInstalled = __GLOBAL__.__GET__().Last_Installed;

  if (view.lastInstalled <= lastInstalled) return;

  global_history.forEach((value, key) => {
    Current_value.__GET__().set_current_value(value.Globally_Ordered_Update.f);
  });

  __GLOBAL__.__GET__().Last_Installed = view.lastInstalled;
  __GLOBAL__.__GET__().Last_Attempted = view.lastAttempted;
  __GLOBAL__.__GET__().global_ordering.Global_History = global_history;
  __GLOBAL__.__GET__().global_ordering.Local_Aru = view.lastInstalled;
  __GLOBAL__.__GET__().state = "REG_NONLEADER";
  __GLOBAL__.__GET__().current_leader = 0; //set leader to not be itself without knowing who the leader really is
  
  Decision_Starter.__GET__().isRunning = true;
  Decision_Starter.__GET__().run();
}

export {apply_view_change}