import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import Server_message from "models/server_message";
import View_module from "models/view_module";


export default class Learner {
  private static _instance = new Learner();

  learn_messages: Server_message[] = [];

  public static __GET__() {
    return this._instance;
  }

  private constructor() {}

  Execute() {
    const message = GetMajority(this.learn_messages);
    __GLOBAL__.getInstance().Last_Installed = message;
  }
}

function GetMajority(learn_messages: Server_message[]) {
  const views = new Map<Server_message, number>();

  learn_messages.forEach((learn_message) => {
    if (views.has(learn_message)) {
      views.set(learn_message, views.get(learn_message) + 1);
    } else {
      views.set(learn_message, 1);
    }
  });

  const majority = Array.from(views.entries()).reduce((a, b) => a[1] > b[1] ? a : b);

  return majority[0];
  
}