import { plugin as delegate } from "./delegate";
import { plugin as exchange } from "./exchange";
import { plugin as explorer } from "./explorer";
import { plugin as generic } from "./generic";
import { plugin as wallet } from "./wallet";

export const modules = { generic, delegate, explorer, exchange, wallet };
