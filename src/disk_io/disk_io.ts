import Acceptor from "decision/acceptor/acceptor";
import __GLOBAL__ from "decision/GLOBAL";
import Learner from "decision/learner/learner";
import disk_write from "models/disk_writer_type";

async function writeJsonToFile(path: string, data: disk_write): Promise<void> {
    const fs = require('fs');
    fs.writeFile(path, JSON.stringify(data));
}

function readJsonFromFile(path: string): disk_write {
    const fs = require('fs');
    return JSON.parse(fs.readFromFile(path));
}

function buildCurrentState(): disk_write {
    return {
        GLOBAL: __GLOBAL__.__GET__(),
        ACCEPTOR: Acceptor.__GET__(),
        LEARNER: Learner.__GET__()
    }
}

export { writeJsonToFile, readJsonFromFile, buildCurrentState };
