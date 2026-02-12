import type { TilePos } from "../types/Tile";

export function generateRandomPosition(grassTiles: TilePos[]): TilePos {
    const randomIndex = Math.floor(Math.random() * grassTiles.length);
    const [x, y] = grassTiles[randomIndex];

    return [x, y];
}