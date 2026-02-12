import kaplay from "kaplay";
import { generateMap, renderVisibleTiles, TileType } from "./utils/map_utils";
import { ColorTheme } from "./theme/theme";
import type { TilePos } from "./types/Tile";
import Player from "./classes/Player";
import Enemy from "./classes/Enemy";
import NPC from "./classes/NPC";

const k = kaplay();

const tileSize = 75;

const map = generateMap(Math.floor(k.width() / tileSize) * 20, Math.floor(k.height() / tileSize) * 20);

console.log(map.join('\n'));

const grassTiles: TilePos[] = [];

let y = 0;
for (const row of map) {
	let x = 0;
	for (const tile of row) {
		if (tile === TileType.Grass) {
			grassTiles.push([x, y]);
		}
		x += tileSize;
	}
	y += tileSize;
}

const speed = 300;

const player = new Player(k, ColorTheme.primaryContainer, tileSize, grassTiles, speed);
const playerCharacter = player.getCharacter();

for (let i = 0; i < 20; i++) new Enemy(k, ColorTheme.error, tileSize, grassTiles, 200, playerCharacter);
for (let i = 0; i < 50; i++) new NPC(k, ColorTheme.secondary, tileSize, grassTiles, 100);

const healthLabel = k.add([
	k.pos(100, 200),
	k.text(`Health: ${player.health}`, {
		size: 48,
		font: 'sans-serif',
	}),
	k.z(50),
	k.fixed(),
]);

healthLabel.onUpdate(() => {
	healthLabel.text = `Health: ${player.health}`;
});

k.onUpdate(() => {
	renderVisibleTiles(k, tileSize, map);
});