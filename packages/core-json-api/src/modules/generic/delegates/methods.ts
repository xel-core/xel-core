import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const show = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const blocks = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const voters = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const voterBalances = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.delegates.index", index, 30, request => request.query)
        .method("generic.delegates.show", show, 30, request => request.query)
        .method("generic.delegates.blocks", blocks, 30, request => request.query)
        .method("generic.delegates.voters", voters, 30, request => request.query)
        .method("generic.delegates.voterBalances", voterBalances, 30, request => request.query);
};
