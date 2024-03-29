function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addNumbers(a: number, b: number) {
    await timeout(1000);
    return a + b;
}

class Testing {
    static #testing = "testing";
    static getValue() {
        return Testing.#testing;
    }
}

(async function () {
    console.log(await addNumbers(1, 2));
    console.log(Testing.getValue());
})();
