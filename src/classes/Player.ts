import type { KAPLAYCtx } from "kaplay";
import Character from "./Character";
import type { RGB } from "../theme/theme";
import type { TilePos } from "../types/Tile";

export default class Player extends Character {
    private coins: number = 0;

    constructor(k: KAPLAYCtx, color: RGB, tileSize: number, grassTiles: TilePos[], speed: number) {
        super(k, color, tileSize, grassTiles, 'player', 200);

        this.character.onCollide('enemy', () => {
            this.health -= 10;
            console.log('Health:', this.health);

            if (this.health <= 0) {
                k.destroy(this.character);
            }
        });

        this.character.onCollide('npc', () => {
            this.health += 10;
            console.log('Health:', this.health);
        });

        k.onUpdate(() => {
            if (!this.character.exists()) return;

            this.handleMovement(k, speed);
            k.camPos(this.character.pos);
        });
    }

    public getCoins(): number {
        return this.coins;
    }

    public addCoins(amount: number) {
        this.coins += amount;
    }

    private handleMovement(k: KAPLAYCtx, speed: number) {
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