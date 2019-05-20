import { IServer } from "../../interfaces";
import * as Blockchain from "./blockchain";
import * as Blocks from "./blocks";
import * as Delegates from "./delegates";
import * as Node from "./node";
import * as Peers from "./peers";
import * as Transactions from "./transactions";
import * as Votes from "./votes";
import * as Wallets from "./wallets";

import "./types";

export const plugin = {
    async register(server: IServer): Promise<void> {
        for (const module of [Blockchain, Blocks, Delegates, Node, Peers, Transactions, Votes, Wallets]) {
            module.register(server);
        }
    },
    name: "Generic API",
    version: "1.0.0",
};
