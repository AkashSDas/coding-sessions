import { div, mul, sub, sum } from "./math";
import { expect, describe, it } from "@jest/globals";

describe("math", () => {
    describe("add", () => {
        it("should add two numbers", () => {
            expect(sum(1, 2)).toBe(3);
        });
    });

    describe("sub", () => {
        it("should subtract two numbers", () => {
            expect(sub(1, 2)).toBe(-1);
        });
    });

    describe("mul", () => {
        it("should multiply two numbers", () => {
            expect(mul(2, 3)).toBe(6);
        });
    });

    describe("div", () => {
        it("should divide two numbers", () => {
            expect(div(6, 3)).toBe(2);
        });

        it("should throw an error when dividing by zero", () => {
            expect(() => div(6, 0)).toThrow(new Error("Division by zero"));
        });
    });
});
