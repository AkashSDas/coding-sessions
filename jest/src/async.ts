export function getGroceryList(callback: (list: string[]) => void): void {
    setTimeout(() => {
        callback(["milk", "bread", "eggs"]);
    }, 100_000);
}

export async function makeSoup(ingredients: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (ingredients.length !== 0) {
                resolve(ingredients);
            } else {
                reject("ingredients are required");
            }
        }, 100_000);
    });
}

export async function rain(amount: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            if (amount === 0) {
                reject("rain is not possible");
            } else {
                if (amount >= 50 && amount < 100) {
                    throw new Error("too much rain");
                }

                resolve();
            }
        }, 100_000 * amount);
    });
}
