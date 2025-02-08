type election_module = {
  id: number,
  status: string
}

export default function election (a: election_module, b: election_module, c: election_module, liderID: number): number{
  const concorrentes = [a, b, c]
    .map((x) => x.status !== "crashed" ? x.id : null)
    .filter((x) => x !== liderID)

  return concorrentes[0]
}

