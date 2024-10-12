export { replaceConsole }

//============================================================================
// Hook the console log function so we can show results on the HTML page
//
// This allows us to write the console out to the HTML!
//
// This code was modified from a semi-useless version found on stackexchange.
//
// -- Tim Otholt
//============================================================================

// part of the useless code from stackexchange
// console.logs = [];

// (Tim) - This is where we store the entire history of the console
let entireConsoleLog = '';

let consoleDiv;
let consoleSubDiv;

function replaceConsole() {

    // Grab the original console.log function and save it.  Note that
    // console.stdlog exists as part of JS  
    console.stdlog = console.log.bind(console);

    // (Tim) - This is the DIV we write to
    consoleDiv = document.getElementById("console");
    consoleSubDiv = document.createElement('pre');

    // Override the console.log() funcction
    console.log = function()
    {
        // Part of the useless code from stackexchange
        // console.logs.push(Array.from(arguments));

        // This is the code that calls the original console.log()
        console.stdlog.apply(console, arguments);

        // (Tim) - Grab all the arguments and convert it to one long string
        let s = '';
        for (let i = 0; i < arguments.length; i++) {
            s += String(arguments[i]);
        }

        // (Tim) Add it to the "fake" console
        entireConsoleLog += s;
        entireConsoleLog += `\n`;

        // (Tim) And output the "fake" console
        consoleSubDiv.innerHTML = entireConsoleLog;
        consoleDiv.appendChild(consoleSubDiv);
    }
}
