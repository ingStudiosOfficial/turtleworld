import type { KAPLAYCtx } from "kaplay";
import type { TilePos } from "../types/Tile";
import type { GameObj } from "kaplay";
import type { RGB } from "../theme/theme";

export default class Character {
    protected character: GameObj;
    protected health = 100;
    protected tileSize: number;
    protected grassTiles: TilePos[];

    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], key: string, health?: number) {
        if (health !== null && health !== undefined) this.health = health;
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
            key,
        ]);
    }

    public getCharacter(): GameObj {
        return this.character;
    }

    public getHealth(): number {
        return this.health;
    }

    public update(k: KAPLAYCtx, speed: number) {}

    private generateRandomPosition(): TilePos {
        const randomIndex = Math.floor(Math.random() * this.grassTiles.length);
        return this.grassTiles[randomIndex];
    }
}