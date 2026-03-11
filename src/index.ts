import LineSegment, { segments } from "./geometry/LineSegment";
import Point from "./geometry/Point";
import RenderSystem, { myCanvas } from "./rendering/RenderSystem";

export const screenWidth = 1280 * .6;
export const screenHeight = 720 * .6;

window.onload = () => {
    myCanvas.width = screenWidth * window.devicePixelRatio;
    myCanvas.height = screenHeight * window.devicePixelRatio;
    myCanvas.style.width = `${screenWidth}px`;
    myCanvas.style.height = `${screenHeight}px`; console.log(screenHeight);

    const segmentCount = Math.floor(Math.random() * 11) + 6;
    const minLen = 50;
    const maxLen = 250;

    for (let i = 0; i < segmentCount; i++) {
        const p1 = new Point(Math.random() * screenWidth, Math.random() * screenHeight);

        const length = Math.random() * (maxLen - minLen) + minLen;
        const angle = Math.random() * Math.PI * 2;

        const p2 = new Point(
            p1.x + Math.cos(angle) * length,
            p1.y + Math.sin(angle) * length
        );

        segments.push(new LineSegment(p1, p2));
    }

    RenderSystem.main();
};