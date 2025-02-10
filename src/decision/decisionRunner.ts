import View_module from "models/view_module";
import Proposer from "./proposer/proposer";
import Acceptor from "./acceptor/acceptor";
import Learner from "./learner/learner";
import { buildCurrentState, writeJsonToFile } from "disk_io/disk_io";
import __GLOBAL__ from "./GLOBAL";
import Server_message from "models/server_message";


export default async function runDecision(view: View_module) {

  // Prepare
  const p = Proposer.__GET__() // Inicializa Proposer
  p.Prepare(view); // Envia mensagem de Prepare para todos os servidores 
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  const a = Acceptor.__GET__() // Inicializa Acceptor que já promete a mensagem de Prepare de p
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  setTimeout(() => {}, 100); // Espera um intervalo para receber as mensagens de Prepare de pi e quando recebe retorna sua promesa mais recente para pi. 
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  // Accept
  p.Accept(); // Envia mensagem de Accept para todos os servidores
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  setTimeout(() => {}, 100); // Espera um intervalo para receber as mensagens de Accept de pi e quando recebe retorna a mensagem de Accept mais recente para pi.
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  // Learn
  const l = Learner.__GET__() // Inicializa Learner
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  a.Learn(); // Envia mensagem de Learn para todos os servidores
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  setTimeout(() => {}, 100); // Espera um intervalo para receber as mensagens de Learn de pi e quando recebe retorna a mensagem de Learn mais recente para pi.
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  l.Execute(); // Executa a mensagem de Learn mais recente
  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  __GLOBAL__.getInstance().global_ordering.Last_Proposed = view.time_stamp; // Atualiza o Last_Proposed
  const accepts = new Map<number, Server_message>();
  l.learn_messages.forEach((learn_message) => {
    accepts.set(learn_message.server_id, learn_message);
  });

  __GLOBAL__.getInstance().global_ordering.Global_History
    .set(
      view.time_stamp, 
      {Proposal: null, 
        Accepts: accepts,
      Globally_Ordered_Update: view}); // Adiciona a view ao Global_History

  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo

  Proposer.__DESTROY__(); // Destrói Proposer
  Acceptor.__DESTROY__(); // Destrói Acceptor
  Learner.__DESTROY__(); // Destrói Learner

  writeJsonToFile("current_state.json", buildCurrentState()); // Escreve o estado atual em um arquivo
}