// import user from "./user.json";

// console.log({ user });

// import { firstname } from "./user.json";

// console.log({ firstname });

import("./user.json").then((module) => ({
    firstname: module.firstname,
}));
