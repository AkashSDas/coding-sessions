import { EffectCallback, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

type User = {
    username: string;
    age: number;
    isMarried: boolean;
};

function generateRandomUser(count: number): Promise<User[]> {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const users: User[] = Array.from({ length: count }, function () {
                return {
                    username: faker.person.firstName(),
                    age: faker.number.int(),
                    isMarried: faker.datatype.boolean(),
                };
            });

            resolve(users);
        }, Math.random() * 1000);
    });
}

export default function BasicUsage(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [count, setCount] = useState<number>(5);
    const options = { userCount: count };

    useEffect(
        function fetchUsers(): ReturnType<EffectCallback> {
            generateRandomUser(options.userCount).then(function (newUsers) {
                setUsers((prevUsers) => [...prevUsers, ...newUsers]);
            });
        },
        [options.userCount]
    );

    return (
        <div>
            <h1>Users</h1>

            <button onClick={() => setCount((prev) => prev + 5)}>
                Fetch More Users
            </button>

            <ul>
                {users.map(function (user, index) {
                    return (
                        <li key={index}>
                            <p>{user.username}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
