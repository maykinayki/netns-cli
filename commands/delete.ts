import { execSync } from "child_process";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { Decleration } from "../types/decleration";

export const deleteFn = (declartionFilePath: string) => {
    const file = readFileSync(declartionFilePath, "utf8");
    const parsedFile = parse(file) as Decleration;

    const { namespaces, bridge } = parsedFile.network;

    execSync(`sudo ip link del ${bridge.name}`);

    namespaces.forEach((ns, i) => {
        execSync(`sudo ip netns del ${ns.name}`);
        execSync(`sudo ip link del veth-${ns.name}-out`);
    });
}