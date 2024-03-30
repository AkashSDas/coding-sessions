import { useEffect } from "react";
import { SecretAgent } from "./lib/secret-agent";

export default function App(): JSX.Element {
    useEffect(function () {
        new SecretAgent("007", fetch).getAgent().then(function (data) {
            console.log(data);
        });
    }, []);

    return <div></div>;
}
