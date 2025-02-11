import __GLOBAL__ from "decision/GLOBAL";

type election_module = {
  id: number,
  status: string
}

function election (a: election_module, b: election_module, c: election_module, liderID: number): number{
  const concorrentes = [a, b, c]
    .map((x) => x.status !== "crashed" ? x.id : null)
    .filter((x) => x !== liderID)

  return concorrentes[0]
}

function makeServersStatus(): election_module[] {
  const servers = __GLOBAL__.__GET__().neighbors.map((id) => {
    if (this.server_heartbeats.has(id)) {
      return {
        id: id,
        status: "alive"
      }
    }else {
      return {
        id: id,
        status: "crashed"
      }
    }
  });

  return servers;
}


export {election_module, election, makeServersStatus}
