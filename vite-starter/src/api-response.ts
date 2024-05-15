// Fixiture data
let modules = import.meta.glob("./api-responses/*.json");
// console.log({ modules });
// for (const path in modules) {
//     modules[path]().then((mod: any) => {
//         console.log(path, mod, mod.data);
//     });
// }

// without promise
console.log(import.meta.glob("./api-responses/*.json", { eager: true }));

modules = import.meta.glob("./logos/*.svg");
// console.log({ modules });
// for (const path in modules) {
//     modules[path]().then((mod: any) => {
//         console.log(path, mod, mod.default); // mod.default is the svg path
//         const img = document.createElement("img");
//         img.src = mod.default;
//         document.body.appendChild(img);
//     });
// }

console.log(import.meta.glob("./logos/*.svg", { eager: true }));
