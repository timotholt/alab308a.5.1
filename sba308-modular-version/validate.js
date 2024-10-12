export {
    validCourseId,
    validAssignmentGroupCourseId,
    validAssignmentId,
    validateCourseInfo,
    validateAssignmentGroup,
    validateSubmissionData,
    verifyHelperFunctions,
    validDate,
    validNumber,
    getTimestamp
}

import { CourseInfo } from "./script.js";

//====================================================================
// Validation functions
//
//
// This file can be cleaned up but I have bigger fish to fry!
//====================================================================

function validDate(dateString) {
    return !isNaN(Date.parse(dateString));
}

function validNumber(n) {
    return (typeof n === 'number');
}

function getTimestamp(dateString) {
    return Date.parse(dateString);
}

// // Validate Course ID
// Long winded (was one line but need to use a try/catch for 5% grade)
function validCourseId(courseId) {

  // Course ID has to be a number
  const validResult = Number(CourseInfo.id) === Number(courseId);

  // Use a try/catch for 5% of the grade
  try {
    if (!validResult)
      throw `Course ID ${courseId} isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  };
}

// Validate Course ID in the assignment group
// Long winded (was one line but need to use a try/catch for 5% grade)
function validAssignmentGroupCourseId(assignmentGroup) {
  
  const validResult = validCourseId(assignmentGroup.course_id);

  // Use a try/catch for 5% of the grade
  try {
    // Using two if statements is 10% of the grade.  This is if #1
    if (!validResult)
      throw `Course ID ${assignmentGroup.course_id} in assignmentGroup isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  }
};

// Validate individual assignmements to an ID
function validAssignmentId (assignmentGroup, assignmentId) {

  let validResult = false;

  // Use two different types of loops for 5% of the grade (while loop is #1)
  let i = 0;
  while (i < assignmentGroup.assignments.length) {

    // Debug message
    console.log(`comparing ${Number(assignmentGroup.assignments[i].id)} to ${Number(assignmentId)}`);

    // Using two if statements is 10% of the grade.  This is if #2
    if (Number(assignmentGroup.assignments[i].id) === Number(assignmentId)) {
      validResult = true;

      // 3% of the grade: Utilize at least one loop control keyword such as break or continue.
      break;
    }

    // Bump index
    i++;
  }
  
  return (validResult);
};

//==================================================================
// Validate the courseInfo. Requirements are:
// 1. courseInfo is an object
// 2. courseInfo.id is an number
// 3. courseInfo.id is greater than zero
// 4. courseInfo.name is a string
// 5. courseInfo has exactly 2 keys
//
// Returns true if it passes validation()
//==================================================================

function validateCourseInfo(courseInfo)
{
  try {
    if (typeof courseInfo !== 'object')
      throw `CourseInfo isn't an object`;
    else if (typeof courseInfo.id !== 'number')
      throw `CourseInfo.id isn't present or isn't a number`;
    else if (!courseInfo.id > 0)
      throw `CourseInfo.id is a number less than zero`;
    else if (typeof courseInfo.name !== 'string')
      throw `CourseInfo.name isn't present or isn't a string`;
    else if (Object.keys(courseInfo).length != 2)
      throw `CourseInfo must have exactly 2 keys (entries)`;
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Validate assignemntGroup. Requirements are:
//
//  1. assignmentnGroup is an object
//  2. assignmentGroup.id is a number
//  3. assignmentGroup.id > 0
//  4. assignmentGroup.name is a string
//  5. assignmentGroup.courseId is a number
//  6. assignmentGroup.courseId > 0
//  7. assignmentGroup.courseId is in courseInfo
//  8. assignmentGroup.group_weight is a number
//  9. assignmentGroup.group_weight > 0
// 10. assignmentGroup.assignments is an array
// 11. assignmentGroup has exactly 5 keys/properties
// 
// 12. assignmentGroup.assignments[].id is a number
// 13. assignmentGroup.assignments[].id > 0
// 14. assignmentGroup.assignments[].name is a string
// 15. assignmentGroup.assignments[].due_at is a string
// 16. assignmentGroup.assignments[].due_at is a valid date
// 17. assignmentGroup.assignments[].points_possible is a number
// 18. assignmentGroup.assignments[].points_possible > 1
// 19. assignmentGroup.assignments[] each has exactly 4 keys
//==================================================================

function validateAssignmentGroup(courseInfo, assignmentGroup)
{
  try {

    // Validate main assignment group
    if (typeof assignmentGroup !== 'object')
      throw `AssignmentGroup isn't an object`;
    else if (typeof assignmentGroup.id !== 'number')
      throw `AssignmentGroup.id isn't present or isn't a number`;
    else if (!assignmentGroup.id > 0)
      throw `AssignmentGroup.id is a number less than zero`;
    else if (typeof assignmentGroup.name !== 'string')
      throw `AssignmentGroup.name isn't present or isn't a string`;
    else if (typeof assignmentGroup.course_id !== 'number')
      throw `AssignmentGroup.course_id isn't a number`;
    else if (assignmentGroup.course <= 0)
      throw `AssignmentGroup.course_id is a number <= 0`;
    else if (assignmentGroup.course_id!= courseInfo.id)
      throw `AssignmentGroup.course_id doesn't match course ID in courseInfo`;
    else if (typeof assignmentGroup.group_weight !== 'number')
      throw `AssignmentGroup.group_weight isn't a number`;
    else if (assignmentGroup.group_weight <= 0)
      throw `AssignmentGroup.group_weight is a number <= 0`;
    else if (!Array.isArray(assignmentGroup.assignments))
      throw `AssignmentGroup.assignments is not an array`;
    else if (Object.keys(assignmentGroup).length != 5)
      throw `AssignmentGroup must have exactly 5 keys (entries)`;

    // Validate individual assignment entries
    for (let i = 0; i < assignmentGroup.assignments.length; i++)
    {
      if (typeof assignmentGroup.assignments[i].id !== `number`)
        throw `AssignmentGroup.assignment[#${i}.id] isn't a number`;
      else if (assignmentGroup.assignments[i].id <= 0)
        throw `AssignmentGroup.assignment[#${i}.id] <= 0`;
      else if (typeof assignmentGroup.assignments[i].name !== `string`)
        throw `AssignmentGroup.assignment[#${i}.name] isn't a string`;
      else if (typeof assignmentGroup.assignments[i].due_at !== `string`)
        throw `AssignmentGroup.assignment[#${i}.due_at] isn't a string`;
      else if (!validDate(assignmentGroup.assignments[i].due_at))
        throw `AssignmentGroup.assignment[#${i}.due_at] isn't a valid date`;
      else if (typeof assignmentGroup.assignments[i].points_possible !== `number`)
        throw `AssignmentGroup.assignment[#${i}.points_possible] isn't a number`;
      else if (assignmentGroup.assignments[i].points_possible <= 0)
        throw `AssignmentGroup.assignment[#${i}.points_possible] <= 0`;
      else if (Object.keys(assignmentGroup.assignments[i]).length != 4)
        throw `AssignmentGroup.assignment[#${i}] must have exactly 4 keys (entries)`;
    }
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Validate SubmissionData. Requirements are:
// 
//  1. LaernerSubmissions is an array
//  2. LearnerSubmissions[].learner_id is a number
//  3. LearnerSubmissions[].learner_id > 0
//  4. LearnerSubmissions[].submission is an object
//  5. LearnerSubmissions[] has exactly 3 keys
//
//  6. LearnerSubmissions[].submission.submitted_at is a string
//  7. LearnerSubmissions[].submission.submitted_at is a valid date
//  8. LearnerSubmissions[].score is a number
//  9. LearnerSubmissions[].submission has exactly 2 keys
//==================================================================

function validateSubmissionData(learnerSubmisisons)
{
  try {

    // Validate learnerSubmissions
    if (!Array.isArray(learnerSubmisisons))
      throw `LearnerSubmisisons isn't an array`;

    for (let i = 0; i < learnerSubmisisons.length; i++) {
      if (typeof learnerSubmisisons[i].learner_id !== 'number')
        throw `learnerSubmisisons[${i}].learner_id isn't a number`;
      else if (learnerSubmisisons[i].learner_id <= 0)
        throw `learnerSubmisisons[${i}].learner_id <= 0`;
      else if (typeof learnerSubmisisons[i].submission !== 'object')
        throw `learnerSubmisisons[${i}].submission isn't an object`;
      else if (Object.keys(learnerSubmisisons[i]).length != 3)
        throw `learnerSubmisisons[#${i}] must have exactly 3 keys (entries)`;
      else if (typeof learnerSubmisisons[i].submission.submitted_at !== 'string')
        throw `learnerSubmisisons[${i}].submitted_at isn't a string`;
      else if (!validDate(learnerSubmisisons[i].submission.submitted_at))
        throw `learnerSubmisisons[${i}].submitted_at isn't a valid date`;
      else if (typeof learnerSubmisisons[i].submission.score !== 'number')
        throw `learnerSubmisisons[${i}].submission.score isn't a number`;
      else if (Object.keys(learnerSubmisisons[i].submission).length != 2)
        throw `learnerSubmisisons[#${i}].submission must have exactly 2 keys (entries)`;
    }
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Test block
//
// This test block verifies that the helper functions work.  This
// block can be commented out.
//==================================================================

function verifyHelperFunctions() {
  // Verify course ID
  let courseId = '451';
  console.log(`courseID ${courseId} in list = ${validCourseId(courseId)}`);

  // Verify date
  let dateString1 = "2024-09-12";
  let dateString2 = "2024-09-12 00:00:00";
  let dateString3 = "HELL WORLD";

  // Verify past due function
  console.log(`dateString ${dateString1} is valid = ${validDate(dateString1)}, timestamp = ${getTimestamp(dateString1)}, past due = ${nowPastDue(dateString1)}`);
  console.log(`dateString ${dateString2} is valid = ${validDate(dateString2)}, timestamp = ${getTimestamp(dateString2)}, past due = ${nowPastDue(dateString2)}`);
  console.log(`dateString ${dateString3} is valid = ${validDate(dateString3)}, timestamp = ${getTimestamp(dateString3)}, past due = ${nowPastDue(dateString3)}`);

  // Verify course_id in Assignments
  const assignment1 = {
    course_id: "51"
  };
  let assignment2 = {
    course_id: `451`
  };
  console.log(`courseID ${assignment1.course_id} is valid = ${validAssignmentGroupCourseId(assignment1)}`);
  console.log(`courseID ${assignment2.course_id} is valid = ${validAssignmentGroupCourseId(assignment2)}`);

  // Verify an assignment # is in the assignment group
  for (let i = -2; i < 6; i++)
  console.log(`assignment id ${i} is valid = ${validAssignmentId(AssignmentGroup, i)}`);
}
