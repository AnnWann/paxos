import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import {election, election_module, makeServersStatus} from "election/election";


export default class Failure_detector {
    private static instance: Failure_detector;

    private constructor() {}

    timeout: number = 100;
    server_heartbeats: Set<number> = new Set();


    static __GET__(): Failure_detector {
        if (!Failure_detector.instance) {
            Failure_detector.instance = new Failure_detector();
        }
        return Failure_detector.instance;
    }

    async start() {
      setInterval(() => {
        this.heartbeat();
      }, this.timeout);

      setInterval(() => {
        this.update_state();
        if (this.leader_is_dead()) {
          __GLOBAL__.__GET__().state = "LEADER_ELECTION";
          const live_servers = makeServersStatus();
          const new_leader = election(live_servers[0], live_servers[1], live_servers[2], __GLOBAL__.__GET__().current_leader);
          __GLOBAL__.__GET__().current_leader = new_leader;
        }
      }, this.timeout * 2);
    }
    
    private heartbeat() {
      broadcast(null, "heartbeat/" + __GLOBAL__.__GET__().id, "POST");
    }

    private update_state() {
      __GLOBAL__.__GET__().neighbors.forEach((neighbor) => {
        if (!this.server_heartbeats.has(neighbor)) 
          __GLOBAL__.__GET__().neighbors.filter((value) => value !== neighbor);
        
      })
      this.server_heartbeats.clear();
    }

    private leader_is_dead(): boolean {
      const leader = __GLOBAL__.__GET__().current_leader
      return !this.server_heartbeats.has(leader);
    }
}
