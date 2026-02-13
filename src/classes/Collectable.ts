import type { GameObj, KAPLAYCtx } from "kaplay";
import type { CollectableType } from "../types/Collectable";
import type { TilePos } from "../types/Tile";
import type { RGB } from "../theme/theme";

export default class Collectable {
    protected collectable: GameObj;
    protected type: CollectableType;
    protected tileSize: number;
    protected grassTiles: TilePos[];

    constructor(k: KAPLAYCtx, type: CollectableType, color: RGB, tileSize: number, grassTiles: TilePos[], key: string, pos?: TilePos) {
        this.type = type;
        this.tileSize = tileSize;
        this.grassTiles = grassTiles;

        const spawnPosition = pos || this.generateRandomPosition();

        this.collectable = k.add([
            k.circle(this.tileSize / 4),
            k.pos(spawnPosition[0] * this.tileSize, spawnPosition[1] * this.tileSize),
            k.color(color),
            k.z(5),
            k.anchor('botleft'),
            k.area(),
            k.body(),
            key,
            'collectable',
        ]);

        this.collectable.onCollide('player', () => {
            k.destroy(this.collectable);
        });
    }

    private generateRandomPosition(): TilePos {
        const randomIndex = Math.floor(Math.random() * this.grassTiles.length);
        return this.grassTiles[randomIndex];
    }
}