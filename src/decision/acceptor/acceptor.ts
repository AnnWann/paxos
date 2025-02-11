import Activity_Queue from "activity_queuer/Activity_Queue";
import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import Learner from "decision/learner/learner";
import { Prepare, Promise, Proposal } from "models/prepare";


export default class Acceptor {
  private static _instance: Acceptor = null;

  lastPromised: number;
  proposals: Proposal[] = [];
  data_list: Proposal[];

  public static __GET__() {
    if (!this._instance)
      this._instance = new Acceptor();
    return this._instance;
  }

  public static __DESTROY__() {
    this._instance = null;
  }

  private constructor() {
    if (Activity_Queue.__GET__().isEmpty()) {
      return;
    }

    const data_list = buildDataList()
    this.data_list = data_list;
    this.lastPromised = data_list.reduce((a, b) => a.seq > b.seq ? a : b).seq;
  }


  Promise(prepare_message: Prepare) {
    
    if (__GLOBAL__.__GET__().global_ordering.Local_Aru >= prepare_message.local_aru) {
      const url = "http://localhost/" + prepare_message.server_id + "/view_change";
      const message = {
        server_id: __GLOBAL__.__GET__().id,
        view: __GLOBAL__.__GET__().Last_Attempted,
        global_history: __GLOBAL__.__GET__().global_ordering.Global_History
      }
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return;
    }


    if (prepare_message.view.lastAttempted > this.lastPromised) {
      this.lastPromised = prepare_message.view.lastAttempted;
      __GLOBAL__.__GET__().Prepare_Phase.Prepare_message = prepare_message;
    }

  

    const promise: Promise = {
      server_id: __GLOBAL__.__GET__().id,
      view: prepare_message.view,
      data_list: this.data_list
    }

    const url = "http://localhost/" + prepare_message.server_id + "/promise";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(prepare_message),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  
  Learn() {
    const message = GetAcceptMessageWithBiggestTimeStamp(this.proposals);
    message.server_id = __GLOBAL__.__GET__().id;
    __GLOBAL__.__GET__().Last_Attempted = message.seq;  

    Learner.__GET__().learn_messages.push(message);
    broadcast(message, "learn", "PUT");
  }

  recoverState(state: Acceptor) {
    this.lastPromised = state.lastPromised;
    this.proposals = state.proposals;
    this.data_list = state.data_list;
  }
}


function GetAcceptMessageWithBiggestTimeStamp(accept_messages: Proposal[]) {
  let message = accept_messages[0]; 

  accept_messages.forEach((accept_message) => {
    if (accept_message.seq > message.seq) {
      message = accept_message;
    }
  });

  return message;
}


function buildDataList(): Proposal[] {
  const data_list: Proposal[] = [];
  Activity_Queue.__GET__().getList().forEach((update) => {
    const p: Proposal = {
      server_id: __GLOBAL__.__GET__().id,
      seq: update.time_stamp,
      update: update,
      view: {
        lastInstalled: __GLOBAL__.__GET__().Last_Installed,
        lastAttempted: __GLOBAL__.__GET__().Last_Attempted,
      }
    }
    data_list.push(p);
  });
  return data_list;
}
