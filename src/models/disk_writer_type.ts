import Acceptor from "decision/acceptor/acceptor"
import __GLOBAL__ from "decision/GLOBAL"
import Learner from "decision/learner/learner"


type disk_write = {
  GLOBAL: __GLOBAL__,
  ACCEPTOR: Acceptor,
  LEARNER: Learner
}

export default disk_write