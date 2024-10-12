export { drawSwimmer, initDrawSwimmer };
import { blank, swimmer } from "./script.js";
import { changeText } from "./script.js";
import { swimmerRow } from "./script.js";
import { swimmerCol } from "./script.js";
import { distanceBetweenShipAndSwimmer } from "./script.js";
import { distanceOnTop } from "./script.js";
import { distanceIsClose } from "./script.js";
import { distanceIsMedium } from "./script.js";
import { terrainMap } from "./script.js";
import { cueManLost } from "./script.js";
import { cueManSpotted } from "./script.js";

let swimmerVisible = false;
let lastDrawnSwimmerRow;
let lastDrawnSwimmerCol;

function initDrawSwimmer() {
    swimmerVisible = false;
    lastDrawnSwimmerRow = -1;
    lastDrawnSwimmerCol = -1;
}

// Draw the swimmer on the board, taking distance from the ship into account
function drawSwimmer() {

    // Draw swimmer at new spot if the ship is within a certain distance
    if (distanceBetweenShipAndSwimmer() <= distanceIsClose) {

        // if the swimmer was visible the last time we drew him, erase the old spot
        if (swimmerVisible) {

            return;

            // console.log(`1. Erasing old swimmer location because it was last drawn at ${lastDrawnSwimmerRow} ${lastDrawnSwimmerCol}`);
            // changeText(lastDrawnSwimmerRow, lastDrawnSwimmerCol, terrainMap[lastDrawnSwimmerRow][lastDrawnSwimmerCol] + blank);
            // lastDrawnSwimmerRow = swimmerRow;
            // lastDrawnSwimmerCol = swimmerCol;
            // swimmerVisible = false;
        }

        changeText(swimmerRow, swimmerCol, terrainMap[swimmerRow][swimmerCol] + swimmer);
        // console.log(`2. Drawing swimmer at ${lastDrawnSwimmerRow} ${lastDrawnSwimmerCol}`);
        lastDrawnSwimmerRow = swimmerRow;
        lastDrawnSwimmerCol = swimmerCol;
        swimmerVisible = true;

        // Play man spotted
        cueManSpotted.currentTime = 0;
        cueManSpotted.play();                    
    }

    // Otherwise boat is too far away to see the swimmer
    else {

        // If the swimmer is visible, hide him
        if (swimmerVisible) {
            console.log(`3. Erasing old swimmer location because it was last drawn at ${lastDrawnSwimmerRow} ${lastDrawnSwimmerCol}`);
            // changeText(lastDrawnSwimmerRow, lastDrawnSwimmerCol, terrainMap[lastDrawnSwimmerRow][lastDrawnSwimmerCol] + blank);
            changeText(lastDrawnSwimmerRow, lastDrawnSwimmerCol, blank);
            lastDrawnSwimmerRow = swimmerRow;
            lastDrawnSwimmerCol = swimmerCol;
            swimmerVisible = false;

            // Play man spotted
            cueManLost.currentTime = 0;
            cueManLost.play();
        }
    }
}