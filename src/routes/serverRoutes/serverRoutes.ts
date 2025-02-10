import Acceptor from "decision/acceptor/acceptor";
import __GLOBAL__ from "decision/GLOBAL";
import Learner from "decision/learner/learner";
import { Router } from "express";
import { Prepare_Message } from "models/prepare";


export default (router: Router) => {
  router.put("/View_Change", (req, res) => {
    
  });
  router.put("/VC_Proof", (req, res) => {
  
  });
  router.put("/Prepare", (req, res) => {
    const message = req.body as Prepare_Message;
    Acceptor.__GET__().Promise(message);
  });
  router.put("/Promise", (req, res) => {
    const message = req.body as Prepare_Message; 
    __GLOBAL__.getInstance().Prepare.Promises.push(message);
  });
  router.put("/Accept", (req, res) => {
    const message = req.body as Prepare_Message;
    Acceptor.__GET__().accept_messages.push(message);
  });
  router.put("/Learn", (req, res) => {
    const message = req.body as Prepare_Message;
    Learner.__GET__().learn_messages.push(message);
  });
}