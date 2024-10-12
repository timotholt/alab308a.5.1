export { CourseInfo, AssignmentGroup, LearnerSubmissions, desiredResult, actualResult,getListOfAssignmentsDue, getListOfLearners };

import {
    validDate,
    validNumber,
    getTimestamp,
    validCourseId,
    validAssignmentGroupCourseId,
    validAssignmentId,
    validateCourseInfo,
    validateAssignmentGroup,
    validateSubmissionData,
    verifyHelperFunctions
} from "./validate.js";

// Replace the console ASAPs
import { replaceConsole } from "./replaceconsole.js";
replaceConsole();

//============================================================================
// SBA-308
//
// The following objects are from the assignment and must not be changed.
//============================================================================

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner (student) submission data, which is an array of objects.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];


// here, we would process this data to achieve the desired result.
const desiredResultInternal = [
{
    id: 125,
    avg: 0.985, // (47 + 150) / (50 + 150)
    1: 0.94, // 47 / 50
    2: 1.0 // 150 / 150
},

{
    id: 132,
    avg: 0.82, // (39 + 125) / (50 + 150)
    1: 0.78, // 39 / 50
    2: 0.833 // late: (140 - 15) / 150
}
];

// The desired output this program should generate. I have renamed the function appropriately.
function getDesiredLearnerData(course, ag, submissions) {

  return desiredResultInternal;
}

//============================================================================
//
// SOLUTION FOR SBA-308 STARTS HERE
//
//============================================================================

//============================================================================
// Save and display the application start time (used to determine if an
// assignment is due or not) 
//============================================================================

const applicationStartTimestamp = Date.now();                             // Unix time
const applicationStartDatestamp = new Date(applicationStartTimestamp);    // ASCII string

console.log(`Application started at ${applicationStartDatestamp} (${applicationStartTimestamp} Unix time).`);
console.log(`This time is used to determine if an assignment is due.`);
console.log('Note: Assuming all assignent times in the sample data are in GST and converting them to local time.\n');

//============================================================================
// Application specific helper functions
//
// 10% of grade: Use functions to handle repeated tasks.
//============================================================================

// Build a list of unique individual learners from the learner submissions
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfLearners(LearnerSubmissions, quiet = false) {
  
  let listOfLearners = [];
  let listOfLearners2 = [];

  // go through the submisison list, add it if not on the list
  // Use two different types of loops for 5% of the grade (this for loop is #2)

  for (const LearnerSubmission of LearnerSubmissions) {
    if (listOfLearners.indexOf(LearnerSubmission.learner_id) < 0)

      // Create and/or manipulate arrays and objects = 10% of grade.
      listOfLearners.push(LearnerSubmission.learner_id);
  }

  // For testing the if statement below
  // listOfLearners = [ 120, 240, 11, 9, 2 ];
  // listOfLearners = [];

  // Sort the list
  listOfLearners.sort((a, b) => a - b);

    // List can't be empty.  We don't use throw/catch here cause it's messy looking
  if (!quiet) {
    console.log(listOfLearners.length === 0 ?
      `No learners found in learner submissionslist!` :
      `${listOfLearners.length} learners submitted assignments. Their IDs are ${listOfLearners}\n`);
  }

  // Prove we can create/modify/delete lists by copying the list of learners from one array to another
  // We also get to use a do / while loop
  do {
    let l = listOfLearners.shift();
    listOfLearners2.push(l);
  } while (listOfLearners.length > 0)

  // Return list
  return (listOfLearners2);
}

// Build a list of unique assignments
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfAssignmentsDue(ag, quiet = false) {

  if (!quiet)
    console.log(`Below is a list of assignments and their due dates:`);
  
  let listOfAssignmentsDue = [];

  // go through the assignment group, add it if not on the list
  // for of loop = the 2nd type of loop required that is 
  for (const a of ag.assignments) {

    let dueDate = new Date(a.due_at);

    // For testing the line below
    // dueDate = 'laksjdf;lakjsdfl;akjsdflkjadfs'
    
    // Check if due date is bogus
    if (!validDate(dueDate)) {
      if (!quiet)
        console.log(`Due date ${dueDate} is not valid.`);
    }
    // If due date is legit, and it's due, add it to the assignment due list
    else {
      if (!quiet)
        console.log(`Assignment ${a.id} is due at ${dueDate}`);

      if (applicationStartTimestamp >= getTimestamp(dueDate))
        if (listOfAssignmentsDue.indexOf(a.id) < 0)

          // Create and/or manipulate arrays and objects = 10% of grade.
          listOfAssignmentsDue.push(a.id);
    }
  }

  // For testing the sorting and console log statements below
  // listOfAssignments = [ 120, 240, 11, 9, 2 ];
  // listOfAssignments = [];

  // Sort the list
  listOfAssignmentsDue.sort((a, b) => a - b);

  // List can't be empty.  We don't use throw/catch here cause it's messy looking
  if (!quiet) {
    console.log(``);
    console.log(listOfAssignmentsDue.length === 0 ?
      `No assignments found in assignment group!` :
      `Based upon the application start time of ${applicationStartDatestamp},\n`+
      `the following assigments are currently due: ${listOfAssignmentsDue}\n`);
  }
  
  // Return list
  return (listOfAssignmentsDue);
}

//============================================================================
// getLearnerData()
//
// The bulk of the work is done here!
//============================================================================

function getLearnerData(CourseInfo, assignmentGroup, learnerSubmissions)
{ 
  // First of all, validate course ID
  if (!validAssignmentGroupCourseId(assignmentGroup)) {
    console.log(`ERROR: Invalid course ID in the assignment group`);
  }

  // The output of this function is stored in this array of objects
  let resultList = [];

  // Get list of students (learners)
  let learnerList = getListOfLearners(LearnerSubmissions);

  // Get list of assignments that are due now
  let dueAssignments = getListOfAssignmentsDue(AssignmentGroup);

  // For each student (learner)
  for (let l of learnerList) {

    // Log the learner #
    console.log(`Processing submissions for learner ID ${l}`);

    // Reset the score board
    let totalPossiblePoints = 0;
    let totalEarnedPoints = 0;

    // Start to build learnerData
    let learnerData = {};

    // Add the assignment ID and plug in an average score of 0 to begin with
    learnerData['id'] = l;
    learnerData['avg'] = 0;
    // console.log(learnerData);

    // For each due assignment
    for (let d of dueAssignments) {

      // console.log(`+-Processing Learner ${l} assigment ${d}`);

      // Find assignment
      const a = assignmentGroup.assignments.find(obj => obj.id === d);
      // console.log(`Assignment = ${a}`);

      // If we found it
      if (a != undefined) {

        // Assignment exists, bump up the total possible score
        totalPossiblePoints += a.points_possible;

        // Now check if the student did the assignment
        const s = learnerSubmissions.find(obj => obj.learner_id === l && obj.assignment_id === d)
        // console.log(`Submission = ${s}`);

        // By default the assignment is worth 100% (no penalty)
        let assignmentPenalty = 0;

        // If the student submitted the assignment
        if (s != undefined) {
          // console.log(s);

          // If the assignment is late, assign a penalty . . .
          if (getTimestamp(s.submission.submitted_at) > getTimestamp(a.due_at)) {
            console.log(`\xa0\xa0Learner ${l}'s assignment ${d} is late!`);

            // Penalty = 10% of maximum points
            assignmentPenalty = a.points_possible * 0.10;
          }

          // Calculate score (with any penalties), rounded down to 3 decimal places
          let netAssignmentScore = Number((s.submission.score - assignmentPenalty).toFixed(3));

          // Bump up the # of points earned
          totalEarnedPoints += netAssignmentScore;

          // Make sure points possible > 0
          if (a.points_possible > 0) {
            let submissionAve = Number((netAssignmentScore / a.points_possible).toFixed(3));

            // Add it to learner data, round down to 3 decimal places
            learnerData[d] = submissionAve;

            // Write it to the console
            console.log(`\xa0\xa0Learner ${l} earned ${netAssignmentScore} points out of a maximum of ${a.points_possible} on assignment ${d}`);
            console.log(`\xa0\xa0Learner ${l}'s average for assignment ${d} is ${submissionAve} (${netAssignmentScore} / ${a.points_possible} = ${submissionAve})`);
          }
          else
            console.log(`Points possible on an assignment must be > 0`);
        }
      }
    }

    // Output summary for this learner
    console.log(`\xa0\xa0Learner ${l} earned a total of ${totalEarnedPoints} points out of a maximum of ${totalPossiblePoints} for assignenments ${dueAssignments}`);

    // Calculate average and save it
    let average = Number((totalEarnedPoints / totalPossiblePoints).toFixed(3));
    learnerData['avg'] = average;
    console.log(`\xa0\xa0Learner ${l} average is ${average} (${totalEarnedPoints} / ${totalPossiblePoints} = ${average})\n`);

    // Display data
    // console.log(`--Learner ${l}'s data:`);
    // console.log(learnerData);

    // Add learner data to result list
    resultList.push(learnerData);
    
    // Current result list
    // console.log(`--Current result list after this pass: (NOTE: only valid if you single step through the debugger)`);
    // console.log(`If you run instead of single step, you will see the full results here for both passes.`);
    // console.log('https://stackoverflow.com/questions/11118758/bug-in-console-log');
    // console.log(`Result List # rows = ${resultList.length}`);
    // console.log(resultList);
  }

  // Return result list
  return(resultList);
}

//==========================================================================
// Here is the main() of the app... if there was such a thing in js.
//==========================================================================

// You can verify that the helper functions work by uncommenting this below.
// verifyHelperFunctions();

// Validate all the data structures
validateCourseInfo(CourseInfo);
validateAssignmentGroup(CourseInfo, AssignmentGroup);
validateSubmissionData(LearnerSubmissions);

const actualResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
const desiredResult = getDesiredLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//==========================================================================
// NOTE that we update the HTML page dynamically in displayhtml.js, so it's
// expected that displayhtml.js is included AFTER scripts.js in index.html
//==========================================================================

// We are done!
console.log(`\nApplication complete.`);
