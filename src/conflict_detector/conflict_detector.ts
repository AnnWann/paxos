import __GLOBAL__ from "decision/GLOBAL";
import message_types from "models/message_types";


export default function conflict(message: any, type: message_types ): boolean {
  const global = __GLOBAL__.__GET__();
  switch (type) {
    case message_types.VIEW_CHANGE:
      if (message.server_id === global.id) return true;
      if (global.state !== "LEADER_ELECTION") return true;
      if (global.Progress_Timer) return true;
      if (message.view.seq <= global.Last_Installed ) return true;
      return false;
    
    case message_types.VC_PROOF:
      if (message.server_id === global.id) return true;
      if (global.state !== "LEADER_ELECTION") return true;
      return false;
    
    case message_types.PREPARE:
      if (message.server_id === global.id) return true;
      if (message.view.lastAttempted !== global.Last_Attempted) return true;
      return false;

    case message_types.PROMISE:
      if (global.state !== "LEADER_ELECTION") return true;
      if (message.view.lastAttempted !== global.Last_Attempted) return true;
      return false;

    case message_types.ACCEPT:
      if (message.server_id === global.id) return true;
      if (global.state !== "REG_NONLEADER") return true;
      if (message.view.LastInstalled !== global.Last_Installed) return true;
      return false;

    case message_types.LEARN:
      if (message.server_id === global.id) return true;
      if (message.view.LastInstalled !== global.Last_Installed) return true;
      if (global.global_ordering.Global_History.get(message.view.seq).Proposal.view !== message.view) return true;
      return false;
    
    default:
      return true;
  }
}