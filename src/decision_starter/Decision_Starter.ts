import Activity_Queue from "activity_queuer/Activity_Queue";


class Decision_Starter {
    private static _instance: Decision_Starter;
    private isRunning: boolean = false;
  
    private constructor() {}

    static __GET__() {
        if (this._instance == null) {
            this._instance = new Decision_Starter();
        }
        return this._instance;
    }

    private async run() {
        while (this.isRunning) {
          setTimeout(() => {}, 300);
        }
        this.isRunning = true;

        const current_request = Activity_Queue.__GET__().getActivity();
        // start decision

        this.run();
    }
  }
  