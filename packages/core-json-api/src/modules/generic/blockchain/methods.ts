import { IRequest, IResponse, IServer } from "../../../interfaces";
import { ServerCache } from "../../../services";

const index = async (request: IRequest, h: IResponse) => {
    // @TODO
};

export const registerMethods = (server: IServer) => {
    ServerCache.make(server).method("generic.wallets.index", index, 30, request => request.query);
};
