import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import Learner from "decision/learner/learner";
import { Prepare_Message } from "models/prepare";
import Server_message from "models/server_message";


export default class Acceptor {
  private static _instance = new Acceptor();

  lastPromised: Prepare_Message = null;
  accept_messages: Server_message[] = [];

  public static __GET__() {
    return this._instance;
  }

  private constructor() {
    this.lastPromised = __GLOBAL__.getInstance().Prepare.Prepare_message;
    __GLOBAL__.getInstance().Prepare.Promises.push(this.lastPromised);
  }


  Promise(prepare_message: Prepare_Message) {
    if (prepare_message.view.time_stamp > this.lastPromised.view.time_stamp) {
      this.lastPromised = prepare_message;
      __GLOBAL__.getInstance().Prepare.Promises.push(prepare_message);
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
    const message = GetAcceptMessageWithBiggestTimeStamp(this.accept_messages);
    message.server_id = __GLOBAL__.getInstance().server_state.My_server_id;
    __GLOBAL__.getInstance().Last_Attempted = message;   
    Learner.__GET__().learn_messages.push(message);

    broadcast(message, "learn", "PUT");
  }
}


function GetAcceptMessageWithBiggestTimeStamp(accept_messages: Server_message[]) {
  let message = accept_messages[0]; 

  accept_messages.forEach((accept_message) => {
    if (accept_message.view.time_stamp > message.view.time_stamp) {
      message = accept_message;
    }
  });

  return message;
  
}