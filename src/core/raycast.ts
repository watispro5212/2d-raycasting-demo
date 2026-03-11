import { segments } from "../geometry/LineSegment";
import Point from "../geometry/Point";
import Vector from "../geometry/Vector";

export default function raycast(rayOrigin: Point, rayVector: Vector) {
    let closestT = 1e3;

    for (let i = 0, len = segments.length; i < len; i++) {
        const seg = segments[i];
        const segOrigin = seg.points[0];

        const segRun = seg.points[1].x - seg.points[0].x;
        const segRise = seg.points[1].y - seg.points[0].y;

        const den = (rayVector.x * segRise) - (rayVector.y * segRun);

        if (den !== 0) {
            const relX = segOrigin.x - rayOrigin.x;
            const relY = segOrigin.y - rayOrigin.y;

            const t = ((relX * segRise) - (relY * segRun)) / den;
            const u = ((relX * rayVector.y) - (relY * rayVector.x)) / den;

            if (t >= 0 && u >= 0 && u <= 1) {
                if (t < closestT) {
                    closestT = t;
                }
            }
        }
    }

    return closestT;
}