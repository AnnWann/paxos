import client_update from "models/view_module";
import Proposer from "./proposer/proposer";
import Acceptor from "./acceptor/acceptor";
import Learner from "./learner/learner";
import { buildCurrentState, writeJsonToFile } from "disk_io/disk_io";
import __GLOBAL__ from "./GLOBAL";
import { Prepare, Promise, Proposal } from "models/prepare";
import Current_value from "current_value";
import { Decision_Starter } from "decision_starter/Decision_Starter";

async function runPrepare(update: client_update) {
  const p = Proposer.__GET__();
  Acceptor.__GET__();
  Learner.__GET__();


  p.Prepare(update);
  writeJsonToFile("current_state.json", buildCurrentState());
}

async function onPrepare(prepare: Prepare) {
  Acceptor.__GET__().Promise(prepare);
  __GLOBAL__.__GET__().state = "REG_NONLEADER";
  __GLOBAL__.__GET__().Prepare = prepare;
  writeJsonToFile("current_state.json", buildCurrentState());

  Decision_Starter.__GET__().isRunning = true;
  Decision_Starter.__GET__().timeout = 200;
  Decision_Starter.__GET__().skip = true;
  
}

async function onPromise(promise: Promise) {
  __GLOBAL__.__GET__().Prepare_Phase.Promises.set(promise.server_id, promise);
  const promises = __GLOBAL__.__GET__().Prepare_Phase.Promises;
  if (promises.size <= (__GLOBAL__.__GET__().neighbors.length + 1)/2)
    return;

  Proposer.__GET__().Accept();

  __GLOBAL__.__GET__().state = "REG_NONLEADER";
  writeJsonToFile("current_state.json", buildCurrentState());
}

async function onAccept(proposal: Proposal) {
  const a = Acceptor.__GET__();
  a.proposals.push(proposal);

  const proposals = a.proposals;
  if (proposals.length <= (__GLOBAL__.__GET__().neighbors.length + 1)/2)
    return;

  a.Learn();
  writeJsonToFile("current_state.json", buildCurrentState());
}

async function onLearn(accept: Proposal) {
  const l = Learner.__GET__();
  l.learn_messages.push(accept);

  if (l.learn_messages.length <= (__GLOBAL__.__GET__().neighbors.length + 1)/2)
    return;

  l.Execute();
  writeJsonToFile("current_state.json", buildCurrentState());

  Decision_Starter.__GET__().isRunning = false;
}

async function onUpdate(proposal: Proposal) {
  
  const global_ordering = __GLOBAL__.__GET__().global_ordering;

  global_ordering.Last_Proposed = proposal.seq;

  const AcceptsMap = new Map<number, Proposal>();
  Learner.__GET__().learn_messages.forEach((learn_message) => {
    AcceptsMap.set(learn_message.server_id, learn_message);
  });
  global_ordering.Global_History.set(proposal.seq, {
    Proposal: proposal,
    Accepts: AcceptsMap,
    Globally_Ordered_Update: proposal.update
  })

  __GLOBAL__.__GET__().global_ordering = global_ordering;
  
  advance_aru();

  const response = {
    server_id: __GLOBAL__.__GET__().id,
    value: Current_value.__GET__().get_current_value(),
    seq: proposal.seq
  }

  proposal.update.res.json(response);

  Proposer.__DESTROY__();
  Acceptor.__DESTROY__();
  Learner.__DESTROY__();
  __GLOBAL__.__GET__().clear();
  writeJsonToFile("current_state.json", buildCurrentState());
}

function advance_aru() {
  let i = __GLOBAL__.__GET__().global_ordering.Local_Aru + 1;
  while(1) {
    if(__GLOBAL__.__GET__().global_ordering.Global_History.has(i)) {
      __GLOBAL__.__GET__().global_ordering.Local_Aru++;
      i++;
    } else {
      return;
    }
  }
}

export { runPrepare, onPrepare, onPromise, onAccept, onLearn, onUpdate}