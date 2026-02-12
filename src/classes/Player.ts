import type { KaboomCtx } from "kaboom";
import Character from "./Character";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Player extends Character {
    constructor(k: KaboomCtx, color: RGB, tileSize: number, grassTiles: TilePos[], speed: number) {
        super(k, color, tileSize, grassTiles);

        k.onUpdate(() => {
            this.handleMovement(k, speed);
            k.camPos(this.character.pos);
        });
    }

    private handleMovement(k: KaboomCtx, speed: number) {
        const dir = k.vec2(0, 0);
    
        if (k.isKeyDown("left") || k.isKeyDown("a")) dir.x -= 1;
        if (k.isKeyDown("right") || k.isKeyDown("d")) dir.x += 1;
        if (k.isKeyDown("up") || k.isKeyDown("w")) dir.y -= 1;
        if (k.isKeyDown("down") || k.isKeyDown("s")) dir.y += 1;
    
        if (dir.len() > 0) {
            this.character.move(dir.unit().scale(speed));
        }
    }
}