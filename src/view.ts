

class current_view {
    private static _instance = new current_view();

    public static __GET__() {
        return this._instance;
    }

    private constructor() {}

    public current_view: number = 0;

    public set_current_view(f: (n: number) => number) {
        this.current_view = f(this.current_view);
    }
}

export default current_view;