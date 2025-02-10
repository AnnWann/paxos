import Server_message from "./server_message";
import View_module from "./view_module";

type Prepare = {
  Prepare_message: Prepare_Message,
  Promises: Promise[],
}

type Prepare_Message = Server_message & { 
}

type Promise = Server_message & {
}

export {Prepare, Prepare_Message, Promise};