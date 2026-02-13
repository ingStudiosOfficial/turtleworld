import type { KAPLAYCtx } from "kaplay";
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

export function renderVisibleTiles(k: KAPLAYCtx, tileSize: number, map: TileType[][]) {
    const cam = k.camPos();
    const halfW = k.width() / 2;
    const halfH = k.height() / 2;

    const startCol = Math.max(0, Math.floor((cam.x - halfW) / tileSize) - 1);
    const endCol = Math.min(map[0].length, Math.ceil((cam.x + halfW) / tileSize) + 1);
    const startRow = Math.max(0, Math.floor((cam.y - halfH) / tileSize) - 1);
    const endRow = Math.min(map.length, Math.ceil((cam.y + halfH) / tileSize) + 1);

    k.destroyAll('tile');

    for (let y = startRow; y < endRow; y++) {
        const row = map[y];
        for (let x = startCol; x < endCol; x++) {
            const tile = row[x];

            const isTree = tile === TileType.Tree;
            
            if (isTree) k.add([
                k.pos(x * tileSize, y * tileSize),
                k.rect(tileSize, tileSize),
                k.color(determineColor(tile)),
                k.area(),
                k.z(1),
                'tile',
                { type: tile },
                k.body({ isStatic: true }),
            ]);
            else k.add([
                k.pos(x * tileSize, y * tileSize),
                k.rect(tileSize, tileSize),
                k.color(determineColor(tile)),
                k.area(),
                k.z(1),
                'tile',
                { type: tile },
            ]);
        }
    }
}