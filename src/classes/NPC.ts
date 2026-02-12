import type { KAPLAYCtx } from "kaplay";
import Character from "./Character";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class NPC extends Character {
    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], speed: number) {
        super(k, color, tileSize, grassTiles, 'npc', 50);

        k.onUpdate(() => {
            this.moveAround(k, speed);
        });
    }

    private moveAround(k: KAPLAYCtx, speed: number) {
        const dirs = [
            k.UP,
            k.DOWN,
            k.LEFT,
            k.RIGHT,
        ];

        const randDir = k.choose(dirs);

        this.character.move(randDir.scale(speed))
    }
}