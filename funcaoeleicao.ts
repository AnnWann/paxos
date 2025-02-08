function eleicao (aID, bID, cID, liderID, astatus, bstatus, cstatus, ) {
  const concorrentes = new Set<number>(aID, bID, cID);
  //Passo 1: Eliminar os concorrentes que crasharam
  if astatus === "crashed"
  {
    concorrentes.delete(aID);
  }
  if bstatus === "crashed"
  {
    concorrentes.delete(bID);
  }
  if cstatus === "crashed"
  {
    concorrentes.delete(cID);
  }
  //Passo 2: Eliminar o lider atual da re-eleicao
  if set.has(liderID)===true
  {
    concorrentes.delete(liderID)
  }
  //Passo 3: Selecionar o novo lider
  if concorrentes.empty() === false
  //3a (ha concorrentes): selecionar elemento aleatorio do set
  {
  let votacao = Array.from(concorrentes);
  let votoAleatorio = Math.floor(Math.random() * votacao.length);
  let vencedor = votacao[votoAleatorio];
  return vencedor;
  }
  else
  //3b (nao ha concorrentes): retorna Null
  //Como tratar: caso a chamada seja por lider crashado temos que todos os processos crasharam, temos falha total do sistema; caso a chamada seja por lider nao crashado, temos que apenas o líder atual não crashou e deve ser re-instituido como líder e temos consenso pois ele é o único processo.
  {
    return null
  }
}