import __GLOBAL__ from "decision/GLOBAL";
import { Proposal } from "models/prepare";
import Current_value from "current_value";
import { onUpdate } from "decision/decisionRunner";


export default class Learner {
  private static _instance: Learner = null;

  learn_messages: Proposal[] = [];

  public static __GET__() {
    if  (!this._instance)
      this._instance = new Learner();
    return this._instance;
  }

  public static __DESTROY__() {
    this._instance = null;
  }

  private constructor() {}

  Execute() {
    const proposal = GetMajority(this.learn_messages);
    __GLOBAL__.__GET__().Last_Installed = proposal.seq;
    Current_value.__GET__().set_current_value(proposal.update.f);

    onUpdate(proposal)
  }

  recoverState(state: Learner) {
    this.learn_messages = state.learn_messages;
  }
}

function GetMajority(learn_messages: Proposal[]) {
  const views = new Map<Proposal, number>();

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