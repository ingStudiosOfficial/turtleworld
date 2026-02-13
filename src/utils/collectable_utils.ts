import type { KAPLAYCtx } from "kaplay";
import type { TileType } from "./map_utils";
import Coin from "../classes/Coin";
import { ColorTheme } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export function renderVisibleCollectables(k: KAPLAYCtx, tileSize: number, map: TileType[][], grassTiles: TilePos[], addCoins: (amount: number) => void) {
    k.destroyAll('collectable');

    const cam = k.camPos();
    const screenWidth = k.width();
    const screenHeight = k.height();

    const startCol = Math.max(0, Math.floor((cam.x - screenWidth / 2) / tileSize) - 1);
    const endCol = Math.min(map[0].length, Math.ceil((cam.x + screenWidth / 2) / tileSize) + 1);

    const startRow = Math.max(0, Math.floor((cam.y - screenHeight / 2) / tileSize) - 1);
    const endRow = Math.min(map.length, Math.ceil((cam.y + screenHeight / 2) / tileSize) + 1);

    for (let y = startRow; y < endRow; y++) {
        for (let x = startCol; x < endCol; x++) {
            const isGrass = grassTiles.some(p => p[0] === x && p[1] === y);

            if (isGrass) {
                new Coin(
                    k, 
                    ColorTheme.primary, 
                    tileSize, 
                    grassTiles, 
                    (amount) => addCoins(amount),
                    [x, y],
                );
            }
        }
    }
}