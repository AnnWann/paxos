import View_module from "../models/view_module";


export default class Activity_Queue {
    private static _instance: Activity_Queue
    private constructor() {}
    private list: View_module[] = []

    static __GET__() {
        if (!Activity_Queue._instance) {
            Activity_Queue._instance = new Activity_Queue()
        }
        return Activity_Queue._instance
    }
    
    addActivity(activity: View_module) {
        this.list.push(activity)
    }

    getActivity() {
        return this.list.shift()
    }
}