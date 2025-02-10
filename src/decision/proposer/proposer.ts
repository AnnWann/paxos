import Acceptor from "decision/acceptor/acceptor";
import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import {Prepare,  Prepare_Message,  Promise } from "models/prepare";
import Server_message from "models/server_message";
import View_module from "models/view_module";
import { SERVER } from "server/server";


class Proposer { 
  private static _instance = new Proposer();

  private constructor() {}

  public static __GET__() {
    return this._instance;
  }


  Prepare(view: View_module) {
    view.time_stamp = __GLOBAL__.getInstance().global_ordering.Last_Proposed + 1;
    const message: Server_message = {
      view: view,
      server_id: SERVER.GET_INSTANCE().PORT,
      aru: __GLOBAL__.getInstance().global_ordering.Local_Aru,
    }

    __GLOBAL__.getInstance().Prepare.Prepare_message = message;
    __GLOBAL__.getInstance().Last_Installed = message;
    __GLOBAL__.getInstance().Last_Attempted = message;

    broadcast(message, "prepare", "PUT");
  }

  Accept() {
    const promise = GetPromiseWithBiggestTimeStamp(__GLOBAL__.getInstance().Prepare.Promises);
    __GLOBAL__.getInstance().Last_Attempted = promise;
    promise.server_id = SERVER.GET_INSTANCE().PORT;
    Acceptor.__GET__().accept_messages.push(promise);
    
    broadcast(promise, "accept", "PUT");
  } 
}

function GetPromiseWithBiggestTimeStamp(promises: Promise[]) {
  let oper: Promise; 

  promises.forEach((promise) => {
    if (promise.view.time_stamp > oper.view.time_stamp) {
      oper = promise;
    }
  });

  return oper;
  
}