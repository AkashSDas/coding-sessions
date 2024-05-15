const rootElement = document.getElementById("app");

// uncomment the dynamic import or the static import and run pnpm run build
// to see how the production build will end up looking like.

// Will bundle index.ts and counter.ts into a single file since its small and is immediately used
// import { initializeCounter } from "./counter";
// initializeCounter(rootElement?.ownerDocument);

// Output for above import statement:
// ✓ 4 modules transformed.
// dist/index.html                0.82 kB │ gzip: 0.39 kB
// dist/assets/index-clmwRAp8.js  1.09 kB │ gzip: 0.56 kB
// ✓ built in 67ms

// Dynamically import counter.ts
// import("./counter").then((module) => {
//     module.initializeCounter(rootElement?.ownerDocument);
// });

// Output for above import statement:
// ✓ 5 modules transformed.
// dist/index.html                  0.82 kB │ gzip: 0.39 kB
// dist/assets/counter-eMei2_UA.js  0.34 kB │ gzip: 0.22 kB
// dist/assets/index-BYphEXjm.js    1.77 kB │ gzip: 0.91 kB
// ✓ built in 59ms

// import cityImg from "./city.avif";
// @ts-ignore
// import cityImg from "./city.avif?h=400&format=webp&quality=80&fit=fill&as=metadata";
import cityImg from "./city.avif?h=400;800";
console.log({ cityImg }); // its the img url or {cityImg: Array(2)} in case of h=400;800
const img = rootElement?.ownerDocument.createElement("img");
if (img) {
    img.src = cityImg[0];
    rootElement?.appendChild(img);
}

// import { initializeCounter } from "./counter";
// console.log(initializeCounter); // function

// @ts-ignore
import styles from "./alert.css?url";
console.log(styles);

import "./environment";

import "./user";

import "./api-response";
