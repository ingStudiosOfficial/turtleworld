import type { GameObj, KaboomCtx } from "kaboom";
import Character from "./Character";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Enemy extends Character {
    constructor(k: KaboomCtx, color: RGB, tileSize: number, grassTiles: TilePos[], speed: number, target: GameObj) {
        super(k, color, tileSize, grassTiles);

        k.onUpdate(() => {
            this.chaseTarget(k, target, speed);
        });
    }

    private chaseTarget(k: KaboomCtx, target: GameObj, speed: number) {
        const dir = target.pos.sub(this.character.pos);

        if (dir.len() > 10) {
            this.character.move(dir.unit().scale(speed));
        }
    }
}