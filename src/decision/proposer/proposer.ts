import Acceptor from "decision/acceptor/acceptor";
import { broadcast } from "decision/broadcast";
import __GLOBAL__ from "decision/GLOBAL";
import {Prepare, Promise, Proposal } from "models/prepare";
import client_update from "models/view_module";
import { SERVER } from "server/server";


export default class Proposer { 
  private static _instance: Proposer = null;

  private constructor() {}

  update: client_update;

  public static __GET__() {
    if (!this._instance)
      this._instance = new Proposer();
    return this._instance;
  }

  public static __DESTROY__() {
    this._instance = null;
  }

  Prepare(update: client_update) {
    if (__GLOBAL__.__GET__().current_leader !== __GLOBAL__.__GET__().id) return;
    __GLOBAL__.__GET__().Last_Attempted = update.time_stamp;

    this.update = update;

    const message: Prepare = {
      server_id: __GLOBAL__.__GET__().id,
      local_aru: __GLOBAL__.__GET__().global_ordering.Local_Aru + 1,
      view: {
        lastInstalled: __GLOBAL__.__GET__().Last_Installed,
        lastAttempted: __GLOBAL__.__GET__().Last_Attempted,
      }
    }

    __GLOBAL__.__GET__().Prepare = message;
    __GLOBAL__.__GET__().Prepare_Phase = {
      Prepare_message: message,
      Promises: new Map<number, Promise>()
    }

    const a = Acceptor.__GET__();
    a.lastPromised = __GLOBAL__.__GET__().Prepare.view.lastAttempted;
    a.proposals.push({
      server_id: SERVER.__GET__().ID,
      seq: update.time_stamp,
      update: update,
      view: {
        lastInstalled: __GLOBAL__.__GET__().Last_Installed,
        lastAttempted: __GLOBAL__.__GET__().Last_Attempted,
      }
    });

    broadcast(message, "prepare", "PUT");

    __GLOBAL__.__GET__().Prepare_Sent = true;
  }

  Accept() {
    const promises = __GLOBAL__.__GET__().Prepare_Phase.Promises
    const proposal = Array.from(promises.values())
      .map((promise) => promise.data_list)
      .flat()
      .reduce((a, b) => a.seq > b.seq ? a : b);

    const my_proposal: Proposal = {
      server_id: SERVER.__GET__().ID,
      seq: this.update.time_stamp,
      update: this.update,
      view: {
        lastInstalled: __GLOBAL__.__GET__().Last_Installed,
        lastAttempted: __GLOBAL__.__GET__().Last_Attempted,
      }
    } 

    const biggestSeqProposal = proposal.seq > my_proposal.seq ? proposal : my_proposal;

    __GLOBAL__.__GET__().Last_Attempted = biggestSeqProposal.seq;

    Acceptor.__GET__().proposals.push(biggestSeqProposal);
    
    broadcast(biggestSeqProposal, "accept", "PUT");

    __GLOBAL__.__GET__().Accept_Sent = true;
  } 
}
