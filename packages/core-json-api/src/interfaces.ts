// tslint:disable: no-empty-interface

import { Request, ResponseToolkit, Server } from "@hapi/hapi";

export interface IRequest extends Request {
    jsonapi: Record<string, any>;
}

export interface IResponse extends ResponseToolkit {}

export interface IServer extends Server {
    app: Record<string, any>;
}
