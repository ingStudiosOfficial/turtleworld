import type { KAPLAYCtx } from "kaplay";
import Collectable from "./Collectable";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Coin extends Collectable {
    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], onCoin: (amount: number) => void, pos?: TilePos) {
        super(k, 'coin', color, tileSize, grassTiles, 'coin', pos);

        this.collectable.onCollide('player', () => {
            onCoin(10);
        });
    }
}