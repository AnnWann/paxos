import Queue_module from "../models/queue_module/queue_module";


export default class Activity_Queue {
    private static _instance: Activity_Queue
    private constructor() {}
    private list: Queue_module[] = []

    static __GET__() {
        if (!Activity_Queue._instance) {
            Activity_Queue._instance = new Activity_Queue()
        }
        return Activity_Queue._instance
    }
    
    addActivity(activity: Queue_module) {
        this.list.push(activity)
    }

    getActivity() {
        return this.list.shift()
    }
}