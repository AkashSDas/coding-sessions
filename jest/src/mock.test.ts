import { describe, jest, it, expect } from "@jest/globals";

describe("mock", () => {
    describe("practice mock", () => {
        const mock = jest.fn(() => {
            return 1;
        });

        it("should return 1", () => {
            expect(mock()).toBe(1);
            expect(mock).toHaveBeenCalled();
        });
    });
});
