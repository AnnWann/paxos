import disk_write from "models/disk_writer_type";
import  {Global_ordering, global_slots } from "models/global_ordering";
import {Prepare, Prepare_Phase} from "models/prepare";
import { SERVER } from "server/server";


export default class __GLOBAL__ {
    private static _instance: __GLOBAL__;

    private constructor() {
        this.global_ordering = {
            Local_Aru: 0,
            Last_Proposed: 0,
            Global_History: new Map<number, global_slots>()
        };
        this.id = SERVER.__GET__().ID,
        this.state = "LEADER_ELECTION";
        this.neighbors = [Number(process.env.PORT1), Number(process.env.PORT2), Number(process.env.PORT3)].filter((v) => v != this.id);
        this.current_leader = 0;
        this.Progress_Timer = null;
        this.Prepare = null;
        this.Last_Installed = null;
        this.Last_Attempted = null;
        this.global_ordering = null; 
    }

    public static __GET__() {
        if (!this._instance) {
            this._instance = new __GLOBAL__();
        }
        return this._instance;
    }

    public recoverState(state: disk_write){
        this.Prepare = state.GLOBAL.Prepare;
        this.Prepare_Phase = state.GLOBAL.Prepare_Phase;
        this.neighbors = state.GLOBAL.neighbors;
        this.current_leader = state.GLOBAL.current_leader;
        this.global_ordering = state.GLOBAL.global_ordering;
        this.state = state.GLOBAL.state;
        this.Prepare_Sent = state.GLOBAL.Prepare_Sent;
        this.Accept_Sent = state.GLOBAL.Accept_Sent;
    }

    public clear() {
        this.Prepare_Phase = null;
        this.Prepare = null;
        this.Prepare_Sent = false;
        this.Accept_Sent = false;
    }

    Prepare_Phase: Prepare_Phase;
    Prepare: Prepare;
    Prepare_Sent: boolean;
    Accept_Sent: boolean;
    Last_Installed: number;
    Last_Attempted: number;
    global_ordering: Global_ordering;
    state: "LEADER_ELECTION" | "REG_LEADER" | "REG_NONLEADER";
    id: number;
    neighbors: Array<number>;
    ip = "http://localhost/";
    Progress_Timer: NodeJS.Timeout | null = null;
    current_leader: number;
}