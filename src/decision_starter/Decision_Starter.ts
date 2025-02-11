import Activity_Queue from "activity_queuer/Activity_Queue";
import { broadcast } from "decision/broadcast";
import { runPrepare } from "decision/decisionRunner";
import __GLOBAL__ from "decision/GLOBAL";
import Proposer from "decision/proposer/proposer";
import { election, makeServersStatus } from "election/election";
import { Prepare } from "models/prepare";
import { SERVER } from "server/server";


export class Decision_Starter {
    private static _instance: Decision_Starter;
    isRunning: boolean = false;
    timeout: number
    restart: boolean
    skip: boolean

    private constructor() {
      this.isRunning = false;
      if( __GLOBAL__.__GET__().current_leader === __GLOBAL__.__GET__().id) {
        this.timeout = 50;
      }else {
        this.timeout = 500;
      }
    }

    static __GET__() {
        if (this._instance == null) {
            this._instance = new Decision_Starter();
        }
        return this._instance;
    }

    async run() {
        setInterval((() => {
          if (this.skip) { // PULA A RODADA
            this.skip = false;
          }
          else if (!this.isRunning && __GLOBAL__.__GET__().current_leader === __GLOBAL__.__GET__().id && !Activity_Queue.__GET__().isEmpty()) { // TRATA CASO EM QUE O SERVIDOR É LIDER E PRECISA INICIAR UMA DECISÃO
            this.timeout = 1000
            this.isRunning = true;
            __GLOBAL__.__GET__().state = "REG_LEADER";
            runPrepare(Activity_Queue.__GET__().getActivity());
          } else if (__GLOBAL__.__GET__().state === "REG_NONLEADER" && this.isRunning) { // TRATA CASO EM QUE O LIDER NÃO ENVIOU OS ACCEPTS
            __GLOBAL__.__GET__().state = "LEADER_ELECTION";
            const live_servers = makeServersStatus();
            const new_leader = election(live_servers[0], live_servers[1], live_servers[2], __GLOBAL__.__GET__().current_leader);
            this.isRunning = false;
            this.timeout = __GLOBAL__.__GET__().current_leader === __GLOBAL__.__GET__().id ? 50 : 500;
          }
          else{ // ATUALIZA TIMEOUT DE NÃO LIDER
            if (__GLOBAL__.__GET__().current_leader === __GLOBAL__.__GET__().id) this.timeout = 50;
            else this.timeout = 500;
          }

          while(1){ // REINICIA O INTERVALO CASO SOLICITADO
            if (this.restart) {
              this.restart = false;
              this.run();
              return;
            }
          }
        }), this.timeout);
    }

    async continue() {
      if (!(__GLOBAL__.__GET__().state === "REG_LEADER")) {
        this.run();
        this.timeout = 1000;
        return;
      }

      if (!__GLOBAL__.__GET__().Prepare) {
        this.run();
        return;
      }

      if (!__GLOBAL__.__GET__().Prepare_Sent) {
        broadcast(__GLOBAL__.__GET__().Prepare, "prepare", "PUT");
        this.isRunning = true;
        this.timeout = 1000;
        this.run();
      }

      if (!__GLOBAL__.__GET__().Accept_Sent) {
        Proposer.__GET__().Accept();
        this.isRunning = true;
        this.timeout = 1000;
        this.run();
      }

      this.isRunning = true;
      this.timeout = 1000;
      this.run();
  }

}
  