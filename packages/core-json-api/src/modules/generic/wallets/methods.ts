import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const top = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const show = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const transactions = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const transactionsSent = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const transactionsReceived = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const votes = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.wallets.index", index, 30, request => request.query)
        .method("generic.wallets.top", top, 30, request => request.query)
        .method("generic.wallets.show", show, 30, request => request.query)
        .method("generic.wallets.transactions", transactions, 30, request => request.query)
        .method("generic.wallets.transactionsSent", transactionsSent, 30, request => request.query)
        .method("generic.wallets.transactionsReceived", transactionsReceived, 30, request => request.query)
        .method("generic.wallets.votes", votes, 30, request => request.query);
};
