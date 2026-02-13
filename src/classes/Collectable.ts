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
            k.pos(spawnPosition[0], spawnPosition[1]),
            k.color(color),
            k.z(5),
            k.anchor('botleft'),
            k.area(),
            //k.offscreen({ hide: true, pause: true }),
            key,
            'collectable',
        ]);

        console.log(this.collectable);

        // Manually handle visibility based on camera distance
        this.collectable.onUpdate(() => {
            const camPos = k.camPos();
            const dist = this.collectable.pos.dist(camPos);

            // Only show if within 1000 pixels (adjust as needed)
            this.collectable.hidden = dist > 1000;
            
            // Optional: Pause logic to save even more CPU
            this.collectable.paused = dist > 1000;
        });
    }

    private generateRandomPosition(): TilePos {
        const randomIndex = Math.floor(Math.random() * this.grassTiles.length);
        return this.grassTiles[randomIndex];
    }
}