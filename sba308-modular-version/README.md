ALAB308A.5.1 -
REWRITE TO USE IMPORT/EXPORT/MODULES

============================================================

Homework SBA-308
---

Github address: https://github.com/timotholt/sba-308/

Runtime address: https://timotholt.github.io/sba-308/

---

This SBA project actually has a real user interface in index.html

The app recursively and intelligently parses the structures
CourseInfo, AssignmentGroup, and SubmissionData and presents it in
the html page. The console.log is also fed into the html page so
provide a single user experience for the whole app.

Notes:

In the assignment notes, the assignment requirements is to log the data
to the console. I overrode the console.log() function so that all
console.log() ouputs get sent to BOTH the standard console.log() function
AND written to the console window in index.html.

![Alt text](https://github.com/timotholt/sba-308/blob/main/Screenshot.png)

---

Requirements Tracking

| Requirement | Weight | Completed |
| :--- | :---: | :---: |
| Declare variables properly using let and const where appropriate. |  5%  |  ✅  |
| Use operators to perform calculations on variables and literals.  |  5%  |  ✅  |
| Use strings, numbers, and Boolean values cached within variables.  |  5%  |  ✅  |
| Use at least two if/else statements to control program flow. Optionally, use at least one switch statement.  |  10%   |  ✅  |
| Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.  |  5%  |  ✅  |
| Utilize at least two different types of loops.  |  5%  |  ✅ |
| Utilize at least one loop control keyword such as break or continue.  |  3%  |  ✅ |
| Create and/or manipulate arrays and objects. | 10% | ✅ |
| Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.	| 5% | ✅ |
| Use functions to handle repeated tasks. | 10% | ✅ |
| Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior. | 20% | ✅ |
| Ensure that the program runs without errors (comment out things that do not work, and explain your blockers). | 10% | ✅ |
| Commit frequently to the git repository. | 5% | ✅ |
| Include a README file that contains a description of your application. | 2% | ✅ |
| Total | 100% | |

---

This project includes a bunch of files:

| *Filename* | *Purpose* |
| :--- | :--- |
| index.html | all the DIVs used for dynamically populating the UI |
| script.js | the usual suspect for storing the bulk of the working code | 
| style.css | the usual style sheet suspect |
| validate.js | where we validate the integrity of the data structures  |
| replaceconsole.js | override console.log so we can output as HTML and the debugger window |
| displayhtml.js | where we populate the div's with our actual data and handling the "live" console window |


Thanks!

Tim
