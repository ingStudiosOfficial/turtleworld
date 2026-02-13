import type { KAPLAYCtx } from "kaplay";
import Collectable from "./Collectable";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Coin extends Collectable {
    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], pos?: TilePos) {
        super(k, 'coin', color, tileSize, grassTiles, 'coin', pos);
    }
}