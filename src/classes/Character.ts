import type { KaboomCtx } from "kaboom";
import type { TilePos } from "../types/Tile";
import type { GameObj } from "kaboom";
import type { RGB } from "../theme/theme";

export default class Character {
    protected character: GameObj;
    protected tileSize: number;
    protected grassTiles: TilePos[];

    constructor(k: KaboomCtx, color: RGB, tileSize: number, grassTiles: TilePos[]) {
        this.tileSize = tileSize;
        this.grassTiles = grassTiles;

        const characterPos = this.generateRandomPosition();

        this.character = k.add([
            k.rect(this.tileSize / 2, this.tileSize / 2),
            k.pos(characterPos[0], characterPos[1]),
            k.area(),
            k.body(),
            k.color(color),
            k.z(10),
        ]);
    }

    public getCharacter(): GameObj {
        return this.character;
    }

    public update(k: KaboomCtx, speed: number) {}

    private generateRandomPosition(): TilePos {
        const randomIndex = Math.floor(Math.random() * this.grassTiles.length);
        return this.grassTiles[randomIndex];
    }
}