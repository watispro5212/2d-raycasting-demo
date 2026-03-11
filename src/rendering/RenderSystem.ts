import { myMouse, screenHeight, screenWidth } from "..";
import raycast from "../core/raycast";
import { segments } from "../geometry/LineSegment";
import Point from "../geometry/Point";
import Vector from "../geometry/Vector";

export const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const mainContext = myCanvas.getContext("2d")!;

const dpr = window.devicePixelRatio;

const raycastAngles: number[] = [];
const PI2 = Math.PI * 2;
const STEPS = 200;

for (let i = 0; i < STEPS; i++) {
    raycastAngles.push(i * PI2 / STEPS);
}

export default class RenderSystem {
    private static renderLineSegments() {
        for (let i = 0, len = segments.length; i < len; i++) {
            const seg = segments[i];

            mainContext.save();
            mainContext.strokeStyle = "black";
            mainContext.lineWidth = 4;

            mainContext.beginPath();
            mainContext.moveTo(seg.points[0].x * dpr, seg.points[0].y * dpr);
            mainContext.lineTo(seg.points[1].x * dpr, seg.points[1].y * dpr);
            mainContext.stroke();

            mainContext.restore();
        }
    }

    private static renderMousePosition() {
        mainContext.save();
        mainContext.fillStyle = "red";
        mainContext.beginPath();
        mainContext.arc(myMouse.x * dpr, myMouse.y * dpr, 10, 0, Math.PI * 2);
        mainContext.fill();
        mainContext.restore();
    }

    private static drawRays() {
        for (let i = 0, len = raycastAngles.length; i < len; i++) {
            const ang = raycastAngles[i];
            const cos = Math.cos(ang);
            const sin = Math.sin(ang);

            const rayDist = raycast(myMouse, new Vector(cos, sin));

            const ray = new Point(
                myMouse.x + rayDist * cos,
                myMouse.y + rayDist * sin
            );

            mainContext.save();
            mainContext.strokeStyle = "red";
            mainContext.lineWidth = 4;

            mainContext.beginPath();
            mainContext.moveTo(myMouse.x * dpr, myMouse.y * dpr);
            mainContext.lineTo(ray.x * dpr, ray.y * dpr);
            mainContext.stroke();

            mainContext.restore();
        }
    }

    static main() {
        mainContext.clearRect(
            0,
            0,
            screenWidth * window.devicePixelRatio,
            screenHeight * window.devicePixelRatio
        );

        this.renderLineSegments();
        this.renderMousePosition();
        this.drawRays();

        window.requestAnimationFrame(() => this.main());
    }
}