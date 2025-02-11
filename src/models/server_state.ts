type Server_state = {
  My_server_id: number,
  State: "LEADER_ELECTION" | "REG_LEADER" | "REG_NONLEADER"
}

export default Server_state




/**
 * "LEADER_ELECTION" -> O servidor tentando instalar um novo lider
 * "REG_LEADER" -> O lider completa a fase de Prepare
 * "REG_NONLEADER" -> O não-lider envia os updates do cliente para o lider para sequenciamento e responde a propostas feitas pelo lider
 */