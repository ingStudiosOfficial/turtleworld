import type { GameObj, KAPLAYCtx } from "kaplay";
import Character from "./Character";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Enemy extends Character {
    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], speed: number, target: GameObj) {
        super(k, color, tileSize, grassTiles, 'enemy', 100);

        k.onUpdate(() => {
            this.chaseTarget(k, target, speed);
        });
    }

    private chaseTarget(k: KAPLAYCtx, target: GameObj, speed: number) {
        const dir = target.pos.sub(this.character.pos);

        if (dir.len() > 10) {
            this.character.move(dir.unit().scale(speed));
        }
    }
}