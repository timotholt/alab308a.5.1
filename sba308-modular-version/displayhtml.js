import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./script.js";
import { getListOfAssignmentsDue, getListOfLearners } from "./script.js";
import { desiredResult, actualResult } from "./script.js";

//==========================================================================
// displayLearnerObject()
//
// Pass this a learner object and it will display it in the way you'd
// expect: id first, average second, then all the other key/values
//==========================================================================

function displayLearnerData(obj, outputDiv) {

    const keyOrder = ['id', 'avg'];

    function outputKey(key) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        const div = document.createElement('div');
        div.className = 'object-value';

        const displayValue = Array.isArray(value) ? value.join(`, `) : value;
  
        // Set the inner html with key and value
        // div.innerHTML = `<strong>${key}:</strong> ${displayValue}`;
        div.innerHTML = `${key}:\xa0${displayValue}`;
  
        // Append the div to the output div
        outputDiv.appendChild(div);
      }
    }
  
    outputKey(`id`);
    outputKey(`avg`);
    for (const key in obj) {
      if (key === `id` || key === `avg`)
        continue;
      outputKey(key);
    }
  }
  
  /* Display learner data object to the console */
  function consoleLogLearnerData(obj, indent) {
  
    const keyOrder = ['id', 'avg'];
  
    function outputKey(key, indent) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        console.log(`${indent}${key} : ${value}`);
      }
    }
  
    outputKey(`id`, indent);
    outputKey(`avg`, indent);
    for (const key in obj) {
      if (key === `id` || key === `avg`)
        continue;
      outputKey(key, indent);
    }
  }
  
  //============================================================================
  // displayObject()
  //
  // Pass this a learner object and it will display it in some random order
  //============================================================================
  
  function displayObject(obj, outputDiv) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        const div = document.createElement('div');
        div.className = 'object-value';
  
        const displayValue = Array.isArray(value) ? value.join(`, `) : value;
  
        // Set the inner html with key and value
        // div.innerHTML = `<strong>${key}:</strong> ${displayValue}`;
        div.innerHTML = `${key}:\xa0${displayValue}`;
  
        // Append the div to the output div
        outputDiv.appendChild(div);
      }
    }
  }
  
  //============================================================================
  // createChildDivFromString()
  //
  // Easy way to find a div by name, and add a child div with text in it
  //============================================================================
  
  function createChildDivFromString(divID, s, optionalChildClass)
  {
    // Find parent Div
    const parentDiv = document.getElementById(divID);
  
    // Create child Div
    const childDiv = document.createElement(`div`);
  
    // Add an optional class name
    if (optionalChildClass)
      childDiv.className = optionalChildClass;
  
    // Set text of child
    childDiv.innerHTML = s;
  
    // Append child to parent
    parentDiv.appendChild(childDiv);
  }
  
  //============================================================================
  // displayDataType()
  //
  // This function takes an unknown object/array/primitive data type, walks
  // through it and adds it to the specified div.
  //
  // It is recursive and it's pretty neat.
  //
  // I wrote this one myself =)
  //============================================================================
  
  function displayDataType(outputDiv, item, keyName = '', indentString = ``, trailingComma = ``) {
  
    const isArray = (value) => Array.isArray(value);
    const isObject = (value) => !!(value && typeof value === "object" && !Array.isArray(value));  
    
    // Write (s) as a single div
    function outputSingleDiv(outputDiv, s, trailingComma) {
  
      const childDiv = document.createElement('div');
      childDiv.className = 'object-value';
  
      // Set the inner html with key and value
      childDiv.innerHTML = s + trailingComma;
  
      // Append the div to the output div
      outputDiv.appendChild(childDiv);
    }
  
    //=================================================================================
    // Actual work starts here
    //=================================================================================
  
    // We don't know what kind of object we are passed, so let's see if it's an array
    if (isArray(item)) {
  
      // Get array name
      // let name = item.constructor.name;
      let name = keyName;
      if (name)
        name += ` `;
  
      // Write out a [
      outputSingleDiv(outputDiv, `${indentString}${name}[`, ``);
  
      // Traverse every item in the array
      for (let i = 0; i < item.length; i++) {
        let trailingComma = (i < item.length - 1) ? `, ` : ``;
        displayDataType(outputDiv, item[i], i.toString() + `:`, indentString + `\xa0\xa0`, trailingComma);
      }
  
      // Write out a ]
      outputSingleDiv(outputDiv, `${indentString}]`, trailingComma);
    }
  
    // Handle objects
    else if (isObject(item)) {
  
      // Get object name
      // let name = item.constructor.name;
      let name = keyName;
      if (name)
        name += ` `;
  
      // Write out a {
      outputSingleDiv(outputDiv, `${indentString}${name}{`, ``);
  
      // Get all keys of this object
      let keys = Object.keys(item);
  
      // Walk all keys
      for (let i = 0; i < keys.length; i++) {
  
        // Do explicit properties (not any inherited ones)
        if (item.hasOwnProperty(keys[i])) {
          const value = item[keys[i]];
  
          let trailingComma = (i < keys.length - 1) ? `, ` : ``;
          displayDataType(outputDiv, item[keys[i]], keys[i], indentString + `\xa0\xa0`, trailingComma);
        }
      }
      
      // Write out a }
      outputSingleDiv(outputDiv, `${indentString}}`, trailingComma);
    }
  
    // Handle primative data types
    else {
  
      // Identify what type of datatype is passed
      switch (typeof item) {
  
        // We can't process undefined data
        case "undefined": return;
  
        // Basic types are easy to handle
        case "string": 
          if (keyName)
            outputSingleDiv(outputDiv, `${indentString}${keyName} : "${item}"`, trailingComma);
          else
            outputSingleDiv(outputDiv, `${indentString}"${item}"`, trailingComma);
          break;
  
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
        case "function":
          if (keyName)
            outputSingleDiv(outputDiv, `${indentString}${keyName} : ${item}`, trailingComma);
          else
            outputSingleDiv(outputDiv, `${indentString}${item}`, trailingComma);
          break;
        }
    }
  }
  
  //==========================================================================
  // Draw Screen
  //==========================================================================
  
  // Display title in HTML
  createChildDivFromString(`title`, `Course ${CourseInfo.id}: ${CourseInfo.name}`);
  
  // Display calculated data
  createChildDivFromString(`calculated`, `Assignments due: ${getListOfAssignmentsDue(AssignmentGroup, true)}`, `object-value`);
  createChildDivFromString(`calculated`, `Learners: ${getListOfLearners(LearnerSubmissions, true)}`, `object-value`);
  
  // Display course group
  const courseDiv = document.getElementById("course");
  displayDataType(courseDiv, CourseInfo, `CourseInfo`);
  
  // Display assignment group
  const assignmentsDiv = document.getElementById("assignments");
  displayDataType(assignmentsDiv, AssignmentGroup, `AssignmentGroup`);
  
  // Display submissions
  const submissionsDiv = document.getElementById("submissions");
  displayDataType(submissionsDiv, LearnerSubmissions, `LearnerSubmissions`);
  
// Write the learner data to the HTML and to the console
{
  // DIV IDs to write the actual and expected results to
  const actualDiv = document.getElementById("actualResult");
  const expectDiv = document.getElementById("expectedResult");  

  // Output the actual learner results
  console.log(`getLearnerData() produced ${actualResult.length} objects:`);
  console.log(`[`);
  for (let i = 0; i < actualResult.length; i++) {
    console.log(`\xa0\xa0{`);
    displayLearnerData(actualResult[i], actualDiv);
    consoleLogLearnerData(actualResult[i], `\xa0\xa0\xa0\xa0`);

    if (i < actualResult.length - 1)
      console.log(`\xa0\xa0},`);
    else
      console.log(`\xa0\xa0}`);
  }
  console.log(`]`);  

  // Output the desired learner results
  console.log(`\n And the desired result of the appliation is ${actualResult.length} objects:`);
  console.log(`[`);  
  for (let i = 0; i < desiredResult.length; i++) {
    console.log(`\xa0\xa0{`);
    displayLearnerData(desiredResult[i], expectDiv);
    consoleLogLearnerData(desiredResult[i], `\xa0\xa0\xa0\xa0`);

    if (i < desiredResult.length - 1)
      console.log(`\xa0\xa0},`);
    else
      console.log(`\xa0\xa0}`);

  }
  console.log(`]`);  
}

// Display raw actual data
const rawActualDiv = document.getElementById("rawActual");
displayDataType(rawActualDiv, actualResult);

// Display raw expected data
const rawExpectedDiv = document.getElementById("rawExpected");
displayDataType(rawExpectedDiv, desiredResult);
  
  // We are done!
console.log(`\nEverything below this line isn't from this app (gibhub/web browser/debugger/etc).`);
