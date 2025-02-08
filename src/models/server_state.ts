type Server_state = {
  My_server_id: number,
  State: "LEADER_ELECTION" | "REG_LEADER" | "REG_NONLEADER"
}

export default Server_state