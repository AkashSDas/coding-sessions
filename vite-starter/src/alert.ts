export function addAlert(counter: number) {
    const alert = document.createElement("div");
    alert.textContent = `Counter is at ${counter}`;
    alert.id = "alert";
    document.body.appendChild(alert);
}

// Output for above when imported dynamically:
// ✓ 6 modules transformed.
// dist/index.html                0.82 kB │ gzip: 0.39 kB
// dist/assets/alert-CF3fUnpC.js  0.14 kB │ gzip: 0.14 kB
// dist/assets/index-BiUNYPgg.js  2.08 kB │ gzip: 1.04 kB
// ✓ built in 79ms
