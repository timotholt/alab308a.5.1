export { drawShip, initDrawShip };
import { blank, ship, rescued } from "./script.js";
import { changeText } from "./script.js";
import { shipRow } from "./script.js";
import { shipCol } from "./script.js";
import { distanceBetweenShipAndSwimmer} from "./script.js";

// draw the ship to specified row/col
// Intentionally global

var lastDrawnShipRow;
var lastDrawnShipCol;

function initDrawShip() {

    // console.log("initDrawShip called()");
    lastDrawnShipRow = -1;
    lastDrawnShipCol = -1;
}

// Draw the ship on the board, erasing the old position as necessary
function drawShip() {

    // console.log("draw ship called()");

    // debugger;

    // If the ship has different coordinates from what we last drew it at...
    if ((lastDrawnShipRow !== shipRow) || (lastDrawnShipCol !== shipCol)){

        // Remove old ship location if the old location is valid (not -1)
        if (lastDrawnShipRow >= 0 && lastDrawnShipCol >= 0) {
            // console.log(`Erasing old ship location because it was last drawn at ${lastDrawnShipRow} ${lastDrawnShipCol}`);
            // console.log(`calling change text with lastDrawnShipRow = ${lastDrawnShipRow} lastDrawnShipCol = ${lastDrawnShipCol} ${blank}`);
            changeText(lastDrawnShipRow, lastDrawnShipCol, blank);
            // changeText(lastDrawnShipRow, lastDrawnShipCol, terrainMap[lastDrawnShipRow][lastDrawnShipCol] + blank);
        };

        // Draw the ship at the new spot
        // console.log(`Drawing ship at ${shipRow} ${shipCol}`);

        // console.log(`Calling change text with shipRow = ${shipRow} shipCol = ${shipCol} ${blank}`);
        
        if (distanceBetweenShipAndSwimmer() === 0) {
            // changeText(shipRow, shipCol, terrainMap[shipRow][shipCol] + rescued);
            changeText(shipRow, shipCol, rescued)
        }
        else{
            // changeText(shipRow, shipCol, terrainMap[shipRow][shipCol] + ship);
            changeText(shipRow, shipCol, ship);
        }

        lastDrawnShipRow = shipRow;
        lastDrawnShipCol = shipCol;
    }
}
