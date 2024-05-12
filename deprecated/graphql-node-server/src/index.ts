import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type Camp = {
    id: string;
    name: string;
    overview: string;
    latitudeAndLongitude: [number, number];
    ratings?: number;
    isActive: boolean;
};

const typeDefs = `#graphql

    """
    CampType enum
    """
    enum CampType {
        TENT
        HUT
        COTTAGE
    }

    type Camp {
        id: ID!
        name: String!
        overview: String!
        latitudeAndLongitude: [Float!]!
        ratings: Float # may be null
        isActive: Boolean!
        type: CampType
        products: [Product!]
    }

    type Product {
        id: ID!
        name: String!
        price: Float!
        isActive(totalStock: Int!, stockLeft: Int!): Boolean!
    }

    input CampsGetInput {
        ids: [ID!]
    }

    input CampsGetInput2 {
      campsGetInput: CampsGetInput
    }
    
    input CampInput {
        name: String!
        overview: String!
        latitudeAndLongitude: [Float!]!
        ratings: Float
        isActive: Boolean!
    }

    enum OwnerType {
        COMPANY
        INDEPENDENT
    }

    type CompanyOwner {
        id: ID!
        name: String!
        type: OwnerType!
    }

    type IndependentOwner {
        id: ID!
        name: String!
        verified: Boolean!
        type: OwnerType!
    }

    union Owner = CompanyOwner | IndependentOwner

    enum PolicyType {
        CANCEL
        REFUND
    }

    interface Policy {
        id: ID!
        name: String!
        type: PolicyType!
    }

    type CancelPolicy implements Policy {
        id: ID!
        name: String!
        type: PolicyType!
        daysBefore: Int!
    }

    type RefundPolicy implements Policy {
        id: ID!
        name: String!
        type: PolicyType!
        refundPercentage: Float!
    }

    type Query {
        camps: [Camp]
        camp(campId: ID!): Camp
        campsGet(input: CampsGetInput): [Camp]
        campsGet2(input: CampsGetInput2): [Camp]
        products: [Product]
        policies: [Policy]
        owners: [Owner]
    }

    type Mutation {
        addCamp(input: CampInput): Camp
    }
`;

const campsDummyData: Camp[] = [
    {
        id: "1",
        name: "Camp 1",
        overview: "This is camp 1",
        latitudeAndLongitude: [1.1, 2.2],
        ratings: 4.5,
        isActive: true,
    },
    {
        id: "2",
        name: "Camp 2",
        overview: "This is camp 2",
        latitudeAndLongitude: [3.3, 4.4],
        ratings: 3.5,
        isActive: false,
    },
];

const policyDummyData = [
    {
        id: "1",
        name: "Policy 1",
        type: "CANCEL",
        daysBefore: 10,
    },
    {
        id: "2",
        name: "Policy 2",
        type: "REFUND",
        refundPercentage: 50,
    },
];

const productsDummyData = [
    {
        id: "1",
        name: "Product 1",
        price: 100,
        isActive: true,
    },
    {
        id: "2",
        name: "Product 2",
        price: 200,
        isActive: false,
    },
];

const ownersDummyData = [
    {
        id: 1,
        name: "Company 1",
        type: "COMPANY",
    },
    {
        id: 2,
        name: "Independent 1",
        verified: true,
        type: "INDEPENDENT",
    },
];

const resolvers = {
    Query: {
        camps(parent: unknown, args: unknown, context: unknown, info: unknown) {
            console.log("camps resolver called");
            console.log("parent", parent);
            console.log("args", args);
            console.log("context", context);
            console.log("info", info);
            return campsDummyData;
        },
        camp(_: unknown, args: { campId: string }): Camp | undefined {
            return campsDummyData.find((camp) => camp.id === args.campId);
        },
        products() {
            return productsDummyData;
        },
        campsGet(_: unknown, args: { input: { ids: string[] } }) {
            return campsDummyData.filter((camp) =>
                args.input.ids.includes(camp.id)
            );
        },
        campsGet2(
            _: unknown,
            args: { input: { campsGetInput: { ids: string[] } } }
        ) {
            return campsDummyData.filter((camp) =>
                args.input.campsGetInput.ids.includes(camp.id)
            );
        },
        policies() {
            return policyDummyData;
        },
        owners() {
            return ownersDummyData;
        },
    },
    Camp: {
        name(camp: Camp) {
            return camp.name + " - Camp";
        },
        products(camp: Camp) {
            return productsDummyData;
        },
    },
    Product: {
        isActive(product: { totalStock: number; stockLeft: number }) {
            return product.totalStock > 0 && product.stockLeft > 0;
        },
    },
    Mutation: {
        addCamp(_: unknown, args: { input: Camp }) {
            let newCamp = args.input;
            console.log("newCamp", newCamp);
            newCamp = {
                id: campsDummyData.length + 1 + "",
                ...newCamp,
            };
            campsDummyData.push(newCamp);
            return newCamp;
        },
    },
    Policy: {
        __resolveType(obj: Record<string, unknown>) {
            if ("daysBefore" in obj) {
                return "CancelPolicy";
            }
            if ("refundPercentage" in obj) {
                return "RefundPolicy";
            }
            return null;
        },
    },
    Owner: {
        __resolveType(obj: Record<string, unknown>) {
            if ("verified" in obj) {
                return "IndependentOwner";
            }
            if ("type" in obj) {
                return "CompanyOwner";
            }
            return null;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server ready at ${url}`);
