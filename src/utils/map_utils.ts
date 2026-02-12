import type { KaboomCtx } from "kaboom";
import { ColorTheme } from "../theme/theme";
import type { RGB } from "../theme/theme";

export enum TileType {
    Grass = '0',
    Tree = '1',
}

interface TileWeight {
    type: TileType,
    weight: number;
}

function generateRandomTile(): TileType {
    const tileWeights: TileWeight[] = [
        { type: TileType.Grass, weight: 0.7 },
        { type: TileType.Tree, weight: 0.3 },
    ];

    const totalWeight = tileWeights.reduce((sum, t) => sum + t.weight, 0);

    let roll = Math.random() * totalWeight;

    for (const tile of tileWeights) {
        if (roll < tile.weight) {
            return tile.type;
        }

        roll -= tile.weight;
    }

    return TileType.Grass;
}

export function generateMap(width: number, height: number): TileType[][] {
    const generatedMap: TileType[][] = [];

    for (let i = 0; i < height; i++) {
        const row: TileType[] = [];
        for (let j = 0; j < width; j++) {
            console.log(i, j);
            if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
                console.log(`Tree at row ${i}, col ${j}`)
                row.push(TileType.Tree);
            } else {
                row.push(generateRandomTile());
            }
        }
        generatedMap.push(row);
    }

    return generatedMap;
}

export function determineColor(type: TileType): RGB {
    switch (type) {
        case TileType.Grass:
            return ColorTheme.grass;
        case TileType.Tree:
            return ColorTheme.tree;
        default:
            return ColorTheme.background;
    }
}

export function renderVisibleTiles(k: KaboomCtx, tileSize: number, map: TileType[][]) {
    k.destroyAll('tile');

    const cam = k.camPos();
    const screenWidth = k.width();
    const screenHeight = k.height();

    const startCol = Math.max(0, Math.floor((cam.x - screenWidth / 2) / tileSize) - 1);
    const endCol = Math.min(map[0].length, Math.ceil((cam.x + screenWidth / 2) / tileSize) + 1);

    const startRow = Math.max(0, Math.floor((cam.y - screenHeight / 2) / tileSize) - 1);
    const endRow = Math.min(map.length, Math.ceil((cam.y + screenHeight / 2) / tileSize) + 1);

    for (let y = startRow; y < endRow; y++) {
        for (let x = startCol; x < endCol; x++) {
            const tile = map[y][x];
            const posX = x * tileSize;
            const posY = y * tileSize;

            k.add([
                k.pos(posX, posY),
                k.rect(tileSize, tileSize),
                k.color(determineColor(tile)),
                k.area(),
                tile === TileType.Tree ? k.body({ isStatic: true }) : null,
                'tile',
                tile,
            ]);
        }
    }
}