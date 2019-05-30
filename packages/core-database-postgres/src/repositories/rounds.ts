import { Database, State } from "@arkecosystem/core-interfaces";
import { Round } from "../models";
import { queries } from "../queries";
import { Repository } from "./repository";

export class RoundsRepository extends Repository implements Database.IRoundsRepository {
    public async findById(round: number): Promise<Database.IRound[]> {
        return this.db.manyOrNone(queries.rounds.find, { round });
    }

    public async delete(round: number): Promise<void> {
        return this.db.none(queries.rounds.delete, { round });
    }

    public async insert(delegates: State.IWallet[]): Promise<void> {
        const rounds: Array<Partial<Database.IRound>> = delegates.map(delegate => {
            return {
                publicKey: delegate.publicKey,
                balance: delegate.getExtraAttribute("delegate.voteBalance"),
                round: delegate.getExtraAttribute("delegate.round"),
            };
        });

        await super.insert(rounds);
    }

    public async update(items: object | object[]): Promise<void> {
        return;
    }

    public getModel(): Round {
        return new Round(this.pgp);
    }
}
