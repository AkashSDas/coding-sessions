export type Fetch = typeof fetch;

export class SecretAgent {
    constructor(private readonly secret: string, private fetch: Fetch) {}

    public getSecret(): string {
        return this.secret;
    }

    public async getAgent() {
        try {
            const response = await this.fetch(
                "http://localhost:8000/api/secret-agent"
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching agent data", error);
            return null;
        }
    }
}
