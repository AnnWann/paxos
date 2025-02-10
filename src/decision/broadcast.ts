import __GLOBAL__ from "./GLOBAL";



export async function broadcast(message: any, route: string, method: string) {
  const servers = __GLOBAL__.getInstance().neighbors
    .map((server) => __GLOBAL__.getInstance().ip + server + "/" + route)
    .forEach((server) => {
    fetch(server, {
      method: method,
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
}