type election_module = {
  id: number,
  status: string
}

export default function election (a: election_module, b: election_module, c: election_module, liderID: number): number | null{
  const concorrentes = [a, b, c]
    .map((x) => x.status !== "crashed" ? x.id : null)
    .filter((x) => x !== liderID)

  if (concorrentes.length > 0){
  const votoAleatorio = Math.floor(Math.random() * concorrentes.length);
  const vencedor = concorrentes[votoAleatorio];
  return vencedor;
  }
  else{
    return null
  }
}

