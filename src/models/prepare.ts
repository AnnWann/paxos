import Server_message from "./server_message";

type Prepare = {
  Prepare: Prepare_Message,
  Prepare_oks: Prepare_oks[],
}

type Prepare_Message = Server_message & {

}

type Prepare_oks = Server_message & {
  
}

export default Prepare;