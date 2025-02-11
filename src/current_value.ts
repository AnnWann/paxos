class Current_value {
    private static _instance = new Current_value();

    public static __GET__() {
        return this._instance;
    }

    private constructor() {}

    private v: number = 0;

    public set_current_value(f: (n: number) => number) {
        this.v = f(this.v);
    }

    public get_current_value() {
        return this.v;
    }
}

export default Current_value;