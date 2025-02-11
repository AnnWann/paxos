import client_update from "../models/view_module";


export default class Activity_Queue {
    private static _instance: Activity_Queue
    private constructor() {}
    private list: client_update[] = []

    static __GET__() {
        if (!Activity_Queue._instance) {
            Activity_Queue._instance = new Activity_Queue()
        }
        return Activity_Queue._instance
    }
    
    addActivity(activity: client_update) {
        this.list.push(activity)
    }

    getActivity() {
        return this.list.shift()
    }

    isEmpty() {
        return this.list.length === 0
    }

    getList() {
        return this.list
    }
}