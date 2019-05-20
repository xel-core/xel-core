import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const show = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const transactions = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.blocks.index", index, 30, request => request.query)
        .method("generic.blocks.show", show, 30, request => request.query)
        .method("generic.blocks.transactions", transactions, 30, request => request.query);
};
