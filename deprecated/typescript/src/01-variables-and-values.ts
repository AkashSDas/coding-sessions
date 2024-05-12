// Variable declaration and inferences
let username = "James Bond"; // inference
username = 7; // type checking
username = "007"; // re-assigning

// A type as a set of values
let age = 35 as 35; // literal type
age = 36; // re-assigning error -- Type '36' is not assignable to type '35'
const agency = "MI6"; // literal type -- const agency: "MI6" as string is immutable type with const
let missionCode = "007" as const; // literal type -- let missionCode: "007", we want let but a constant value
let isAgent = true as false; // could be done but not recommended

let agentCode;
agentCode = "007"; // type any
agentCode = 7; // type any

let agentName: string; // type annotation
agentName = "James Bond";

// Type casting
let agentAge = 35;
let agentAgeString = agentAge.toString(); // type casting
let agentAgeString2 = agentAge as unknown as string; // type casting, here we type cast first to a top level type unknown and then to string so that we can avoid insufficient overlaps error
let agentAgeString3 = <string>(<unknown>agentAge); // type casting
let agentAgeString4 = agentAge as string; // insufficient overlaps

// Functions and return types
