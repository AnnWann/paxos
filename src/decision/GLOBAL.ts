import  {Global_ordering, global_slots } from "models/global_ordering";
import {Prepare, Prepare_Message} from "models/prepare";
import Server_message from "models/server_message";
import Server_state from "models/server_state";
import { SERVER } from "server/server";


export default class __GLOBAL__ {
    private static _instance: __GLOBAL__;

    private constructor() {
        this.global_ordering = {
            Local_Aru: 0,
            Last_Proposed: 0,
            Global_History: new Map<number, global_slots>()
        };
        this.server_state = {
            My_server_id: SERVER.GET_INSTANCE().PORT,
            State: "LEADER_ELECTION"
        };
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new __GLOBAL__();
        }
        return this._instance;
    }

    Prepare: Prepare;
    Last_Installed: Server_message;
    Last_Attempted: Server_message;
    global_ordering: Global_ordering;
    server_state: Server_state;
    neighbors: Array<number> = [3001, 3002];
    ip = "http://localhost/";
}