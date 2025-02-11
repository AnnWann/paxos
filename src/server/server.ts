import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import logger from "morgan";
import routes from "../routes";
 

export class SERVER {
    private static instance: SERVER | undefined;
    private server: http.Server;
    ID: number | undefined;
    IsRunning: boolean = false;

    static __GET__() {
        if(!this.instance) {
            this.instance = new SERVER();
            return this.instance;
        }else return this.instance;
    }

    setPort(PORT: number): SERVER {
        this.ID = PORT;
        return this;
    }

    run(): SERVER {
        if(!this.ID) throw new Error("Port not set");
        if(!this.server) throw new Error("Server not set");
        if(this.IsRunning) return this;
        this.server.listen(this.ID, () => {
            console.log(`Server is running on port ${this.ID}`);
            console.log(`address: http://localhost:${this.ID}`);
        });
        this.IsRunning = true;
        return this;
    }

    close(): SERVER {
        if (this.server) {
            this.server.close();
        }
        this.IsRunning = false;
        this.ID = undefined;
        console.log("Server closed");
        return this;
    }

    getServer() {
        return this.server;
    }

    private constructor() {
        const app = express();
        app.use(logger("dev"));
        app.use(cors({credentials: true}));
        app.use(compression());
        app.use(bodyParser.json());

        app.use("/", routes());

        this.server = http.createServer(app);

        return this;
    }
}

/* export class SERVER_HANDLER {
    private static servers: SERVER[];
    
    static BUILD(PORT: number): SERVER{
        
        if(!this.servers)
            this.servers = [];
        
        
        const serverExists = this.servers.some(server => server.PORT === PORT);
        
        if(!serverExists){
            const new_server = new SERVER(PORT);
            this.servers.push(new_server)
            new_server.set();
            return new_server;
        }
        else return this.BUILD(PORT + 1);

    }

    static CLOSE(PORT: number){
        const [server] = this.servers.splice(this.servers.findIndex((server) => server.PORT === PORT), 1);
        server?.close();
    }

    static GET_SERVER(PORT: number){
        return this.servers.filter((server) => server.PORT === PORT);
    }
    
    private constructor(){}
} */