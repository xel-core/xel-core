import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const status = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const syncing = async (request: IRequest, h: IResponse) => {
    // @TODO
};

const configuration = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server)
        .method("generic.node.status", status, 30, request => request.query)
        .method("generic.node.syncing", syncing, 30, request => request.query)
        .method("generic.node.configuration", configuration, 30, request => request.query);
};
