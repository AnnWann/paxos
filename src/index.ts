require("dotenv").config();
import { Decision_Starter } from "decision_starter/Decision_Starter";
import { SERVER } from "./server/server";
import __GLOBAL__ from "decision/GLOBAL";
import Failure_detector from "failure_detector/failure_detector";
import { election, makeServersStatus } from "election/election";
import { readJsonFromFile } from "disk_io/disk_io";
import Acceptor from "decision/acceptor/acceptor";
import Learner from "decision/learner/learner";

const PORT = process.env.MY_PORT
SERVER.__GET__().setPort(Number(PORT)).run().getServer();

// inicia o estado global

__GLOBAL__.__GET__()

// inicia o failure_detector

Failure_detector.__GET__().start();

const last_saved_state = readJsonFromFile("current_state.json");
if (last_saved_state) { // quando o servidor é reiniciado
    __GLOBAL__.__GET__().recoverState(last_saved_state);
    Acceptor.__GET__().recoverState(last_saved_state.ACCEPTOR);
    Learner.__GET__().recoverState(last_saved_state.LEARNER);

    Decision_Starter.__GET__().continue();
}else {
  // elege lider

  __GLOBAL__.__GET__().state = "LEADER_ELECTION";
  const live_servers = makeServersStatus();
  const new_leader = election(live_servers[0], live_servers[1], live_servers[2], __GLOBAL__.__GET__().current_leader);
  __GLOBAL__.__GET__().current_leader = new_leader;
  
  // inicia decision_starter

    Decision_Starter.__GET__().run();
}






