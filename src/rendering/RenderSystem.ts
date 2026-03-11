import { myMouse, screenHeight, screenWidth } from "..";
import { segments } from "../geometry/LineSegment";

export const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const mainContext = myCanvas.getContext("2d")!;

export default class RenderSystem {
    private static renderLineSegments() {
        const dpr = window.devicePixelRatio;

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
        const dpr = window.devicePixelRatio;

        mainContext.save();
        mainContext.fillStyle = "red";
        mainContext.beginPath();
        mainContext.arc(myMouse.x * dpr, myMouse.y * dpr, 10, 0, Math.PI * 2);
        mainContext.fill();
        mainContext.restore();
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

        window.requestAnimationFrame(() => this.main());
    }
}