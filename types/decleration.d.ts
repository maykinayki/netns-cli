export enum BridgeType {
    bridge = "bridge",
}

export type Decleration = {
    network: {
        ip: string;
        subnet: number;
        mask: boolean
        namespaces: {
            name: string;
            internet_access: boolean;
            loopback: boolean;
        }[];
        bridge: {
            name: string;
            type: BridgeType;
        };
    };
};
