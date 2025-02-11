import view from "./view";
import client_update from "./view_module";

type Prepare = {
  server_id: number,
  view: view,
  local_aru: number,
}
type Prepare_Phase = {
  Prepare_message: Prepare,
  Promises: Map<number, Promise>,
}

type Promise = { 
  server_id: number,
  view: view,
  data_list: Proposal[],
}

type Proposal = {
  server_id: number,
  seq: number,
  update: client_update,
  view: view,
}

export {Prepare, Promise, Proposal, Prepare_Phase};