import { useState } from "react";
import { faker } from "@faker-js/faker";

// Updating different types of state

type Info = {
    username: string;
    age: number;
    isMarried: boolean;
};

function createInitialState(): Info {
    return {
        username: faker.person.firstName(),
        age: faker.number.int(),
        isMarried: faker.datatype.boolean(),
    };
}

export default function App(): JSX.Element {
    // This is a bad practice since it will create a new object every time the component re-renders.
    // const [info, setInfo] = useState<Info>(createInitialState());
    //
    // Instead, we should pass the initializer function which will be called only once
    // during the initial render.
    const [info, setInfo] = useState<Info>(() => createInitialState());
    const [friends, setFriends] = useState<string[]>([]);

    // Mutate object
    function updateUsername(): void {
        setInfo((prev) => ({
            ...prev,
            username: faker.person.firstName(),
        }));
    }

    // Mutate array
    function addFriend(): void {
        setFriends((prev) => [...prev, faker.person.firstName()]);
    }

    return (
        <section>
            <p>Username: {info.username}</p>
            <p>Age: {info.age}</p>
            <p>Is Married: {info.isMarried ? "Yes" : "No"}</p>
            <button onClick={updateUsername}>Update Username</button>

            <button onClick={addFriend}>Add Friend</button>
            <ul>
                {friends.map((friend, index) => (
                    <li key={index}>{friend}</li>
                ))}
            </ul>
        </section>
    );
}
