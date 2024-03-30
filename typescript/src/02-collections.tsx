// Objects (rigid type)

const user = {
    name: "james bond",
    age: 32,
    isMarried: false,
};

function logUser(user: { name: string; age: number; isMarried?: boolean }) {
    // type guard
    if (typeof user.isMarried !== "undefined") {
        console.log(user.name, user.age, user.isMarried);
    } else {
        console.log(user.name, user.age);
    }
}

logUser(user);

// excess property
const user2 = {
    name: "james bond",
    age: 32,
    isMarried: false,
    isAgent: true,
};

logUser(user2);
logUser({
    name: "james bond",
    age: 32,
    isMarried: false,
    isAgent: true, // excess property checking, the error is because its pointless
    // since this is object literal, whereas in case of user2 it was a variable and can be used
    // somewhere else
});
logUser({
    ...{
        name: "james bond",
        age: 32,
        isMarried: false,
        isAgent: true,
    }, // This works since Typescript doesn't know about the excess property due to spread operator
    // but still this is pointless
});

// Objects (dictionary type -- index signatures)

const phoneCallRecords: {
    [key: string]: {
        name: string;
        duration: number;
        incoming: boolean;
    };
} = {
    "2021-01-01": {
        name: "M",
        duration: 60,
        incoming: true,
    },
    "2021-01-02": {
        name: "M",
        duration: 120,
        incoming: false,
    },
};

const savedContacts: {
    [k: string]: string;
} = {
    james: "007",
    bond: "007",
    ethan: "IMF",
};

console.log(savedContacts.james); // 007
console.log(savedContacts.ron); // undefined, our types don't tell us that this is undefined

const agents: {
    [k: string]:
        | {
              code: string;
              name: string;
          }
        | undefined; // adding this `undefined` type to make it more explicit
} = {
    bond: {
        code: "007",
        name: "James Bond",
    },
    hunt: {
        code: "IMF",
        name: "Ethan Hunt",
    },
};

console.log(agents.ron.code); // error, our types don't tell us that this is undefined
console.log(agents.ron?.code); // error, our types don't tell us that this is undefined

// Here we're having explicit fields on top of index signatures
const missionType: {
    home: {
        code: string;
        name: string;
    };
    [k: string]: {
        code: string;
        name: string;
    };
} = {
    home: {
        code: "007",
        name: "Home",
    },
    away: {
        code: "IMF",
        name: "Away",
    },
    office: {
        code: "MI6",
        name: "Office",
    },
};

console.log(missionType.home.code); // 007
console.log(missionType.away.code); // IMF
console.log(missionType.none.code); // error, our types don't tell us that this is undefined
// for this we can have some typescript compiler settings so that it explicitly tells us that this is undefined
// no-unchecked-index-access

// when we're reacing for a known property we should use dot notation
// but when we don't know the property we should use bracket notation
// it still suffers from the above problem
console.log(missionType["none"].code);

const missionType2: {
    // this is any string or "home" but it becomes any string since "home" is a string
    [k: string | "home"]: {
        code: string;
        name: string;
    };
} = {
    home: {
        code: "007",
        name: "Home",
    },
    away: {
        code: "IMF",
        name: "Away",
    },
    office: {
        code: "MI6",
        name: "Office",
    },
};

console.log(missionType2.home.code);
console.log(missionType2.away.code);
console.log(missionType2.none.code);
console.log(missionType["home"].code);

// Arrays

const friends: string[] = ["James", "Ethan", "Jason"];
const friends2: Array<string> = ["James", "Ethan", "Jason"];

const friends3: (string | number)[] = ["James", "Ethan", "Jason", 7];
const friends4: Array<string | number> = ["James", "Ethan", "Jason", 7];

// Tuple

const agent: [string, number, boolean] = ["James Bond", 35, true];
const agent2: [string, number, boolean] = ["James Bond", 35, true, "MI6"]; // error
const agent3: [string, number, boolean] = ["James Bond", 35]; // error
const agent4: [string, number, boolean] = ["James Bond", 35, "MI6"]; // error

const [agentName, agentAge, agentIsAgent] = agent;
console.log(agentName, agentAge, agentIsAgent);

// Tuples don't have much safety
agent.push("MI6"); // no error

const agent5: readonly [string, number, boolean] = ["James Bond", 35, true];
agent5.push("MI6"); // error
// readonly tuple gives some level of safety
// but the issue is that we won't be able to update the tuple
agent5[0] = "James Bond"; // error

// Nominal vs structural types

// What is type checking?
// "is type y equivalent to type x?" --> does the type y fits in type x?

// Static vs dynamic (duck typing) typing
// Strong vs weak typing

// Java has nominal type system
// Typescript has structural type system because it has to fit in with Javascript
