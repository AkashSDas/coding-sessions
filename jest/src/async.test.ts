import { getGroceryList, makeSoup, rain } from "./async";
import { describe, it, expect, jest, afterEach } from "@jest/globals";

jest.useFakeTimers({});
jest.spyOn(global, "setTimeout");

describe("async", () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    describe("getGroceryList", () => {
        it("should get a list of groceries", (done) => {
            function callback(data: string[]) {
                try {
                    expect(data).toEqual(["milk", "bread", "eggs"]);
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(
                        expect.any(Function),
                        100_000
                    );

                    done();
                } catch (e) {
                    if (e instanceof Error) {
                        done(e);
                    } else {
                        done("unknown error");
                    }
                }
            }

            getGroceryList(callback);
            jest.runAllTimers();
        });
    });

    describe("makeSoup", () => {
        it("should make soup", async () => {
            const soup = makeSoup(["vegetables", "milk"]);
            jest.runAllTimers();
            expect(await soup).toEqual(["vegetables", "milk"]);
        });

        it("should throw an error", async () => {
            makeSoup([]).catch((e) => {
                expect(e).toEqual("ingredients are required");
            });

            expect(makeSoup([])).rejects.toEqual("ingredients are required");
        });
    });

    describe("rain", () => {
        it("should rain", async () => {
            expect(rain(1)).resolves.toBeUndefined();
        });

        it("should not rain", async () => {
            expect(rain(0)).rejects.toEqual("rain is not possible");
        });

        it("should throw an error", async () => {
            try {
                rain(100);

                jest.runOnlyPendingTimers();
            } catch (e) {
                expect.assertions(1);
                expect(e).toEqual("too much rain");
            }
        });
    });
});
