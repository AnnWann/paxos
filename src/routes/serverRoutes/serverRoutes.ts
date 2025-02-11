import conflict from "conflict_detector/conflict_detector";
import Acceptor from "decision/acceptor/acceptor";
import { onAccept, onLearn, onPrepare, onPromise } from "decision/decisionRunner";
import __GLOBAL__ from "decision/GLOBAL";
import Learner from "decision/learner/learner";
import { Router } from "express";
import Failure_detector from "failure_detector/failure_detector";
import { global_slots } from "models/global_ordering";
import message_types from "models/message_types";
import { Prepare, Promise, Proposal } from "models/prepare";
import view from "models/view";
import { apply_view_change } from "reconciliation/reconciliation";


export default (router: Router) => {
  router.put("/view_change", (req, res) => {
    const message = req.body as {server_id: number, view: view, global_history: Map<number, global_slots>};
    if (conflict(message, message_types.VIEW_CHANGE)) return;
    apply_view_change(message.server_id, message.view, message.global_history);
    fetch("http://localhost/" + message.server_id + "/vc_proof", {
      method: "PUT",
      body: JSON.stringify({server_id: __GLOBAL__.__GET__().id, lastInstalled: __GLOBAL__.__GET__().Last_Installed}),
    });
  });
  /* router.put("/vc_proof", (req, res) => {
    
  }); */
  router.put("/prepare", (req, res) => {
    const message = req.body as Prepare;
    if (conflict(message, message_types.PREPARE)) return;
    onPrepare(message);
  });
  router.put("/promise", (req, res) => {
    const message = req.body as Promise; 
    if (conflict(message, message_types.PROMISE)) return;
    onPromise(message);
  });
  router.put("/accept", (req, res) => {
    const message = req.body as Proposal;
    if (conflict(message, message_types.ACCEPT)) return;
    onAccept(message);
  });
  router.put("/learn", (req, res) => {
    const message = req.body as Proposal;
    if (conflict(message, message_types.LEARN)) return;
    onLearn(message);
  });
  router.put("/heartbeat/:id", (req, res) => {
    const id = req.params.id;
    Failure_detector.__GET__().server_heartbeats.add(Number(id));
  });
}