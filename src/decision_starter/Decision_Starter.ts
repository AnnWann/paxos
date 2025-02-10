import Activity_Queue from "activity_queuer/Activity_Queue";
import runDecision from "decision/decisionRunner";


export class Decision_Starter {
    private static _instance: Decision_Starter;
    private isRunning: boolean = false;
  
    private constructor() {}

    static __GET__() {
        if (this._instance == null) {
            this._instance = new Decision_Starter();
        }
        this._instance.run();
        return this._instance;
    }

    private async run() {
        while (this.isRunning) {
          setTimeout(() => {}, 300);
        }
        const current_request = Activity_Queue.__GET__().getActivity();
        if (current_request == null) {
          this.run();
        }
        
        this.isRunning = true;
        runDecision(current_request);

        this.run();
    }
  }
  