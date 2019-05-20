import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const show = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const suspended = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.peers.index", index, 30, request => request.query)
        .method("generic.peers.show", show, 30, request => request.query)
        .method("generic.peers.suspended", suspended, 30, request => request.query);
};
