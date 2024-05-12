import { Fetch, SecretAgent } from "./secret-agent";
import { describe, it, expect, vi } from "vitest";

describe("SecretAgent", () => {
    describe("getSecret", () => {
        it("should return the secret", () => {
            const secretAgent = new SecretAgent("shh", fetch);
            expect(secretAgent.getSecret()).toEqual("shh");
        });
    });

    describe("getAgent", () => {
        // this test case is bad since its making actual network request
        // it("[bad] should return agent data", async ({ expect }) => {
        //     const secretAgent = new SecretAgent("007", fetch);
        //     const data = await secretAgent.getAgent();
        //     expect(data).toMatchSnapshot();
        // });

        it("[mock] should return agent data", async ({ expect }) => {
            const fetchMock = vi.fn<Parameters<Fetch>, ReturnType<Fetch>>(
                mockPromise
            );
            const secretAgent = new SecretAgent("007", fetchMock);
            const responsePromise = secretAgent.getAgent();

            expect(fetchMock).toHaveBeenCalledWith(
                "http://localhost:8000/api/secret-agent"
            );
            // fetchMock.mock.results[0].value.resolve({
            //     async json() {
            //         return {
            //             msg: "The secret agent is James Bond",
            //             agentInfo: {
            //                 name: "James Bond",
            //                 age: 40,
            //                 isSecret: true,
            //             },
            //         };
            //     },
            // });

            // This simplifies our test since response doesn't matter here
            fetchMock.mock.results[0].value.resolve(new Response('"RESPONSE"'));
            expect(await responsePromise).toEqual("RESPONSE");
            // expect(await responsePromise).toMatchSnapshot();
        });
    });
});

function mockPromise<T>() {
    let resolve!: (value: T) => void;
    let reject!: (error: unknown) => void;

    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    }) as Promise<T> & { resolve: typeof resolve; reject: typeof reject };

    promise.resolve = resolve;
    promise.reject = reject;

    return promise;
}
