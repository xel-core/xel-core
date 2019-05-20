import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const store = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const show = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const unconfirmed = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const showUnconfirmed = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const types = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const fees = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.transactions.index", index, 30, request => request.query)
        .method("generic.transactions.store", store, 30, request => request.query)
        .method("generic.transactions.show", show, 30, request => request.query)
        .method("generic.transactions.unconfirmed", unconfirmed, 30, request => request.query)
        .method("generic.transactions.showUnconfirmed", showUnconfirmed, 30, request => request.query)
        .method("generic.transactions.types", types, 30, request => request.query)
        .method("generic.transactions.fees", fees, 30, request => request.query);
};
