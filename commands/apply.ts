import { readFileSync } from "fs";
import { execSync } from "child_process";
import { getIPRange } from 'get-ip-range';
import { parse } from "yaml";
import { Decleration } from "../types/decleration";

export const applyFn = (declartionFilePath: string) => {
    const file = readFileSync(declartionFilePath, "utf8");
    const parsedFile = parse(file) as Decleration;

    const { ip, subnet, namespaces, bridge, mask } = parsedFile.network;

    const [initialIP, bridgeIP, ...availableIPs] = getIPRange(`${ip}/${subnet}`);


    console.log("Setting up bridge initialized");
    execSync(`sudo ip link add name ${bridge.name} type ${bridge.type}`);
    execSync(`sudo ip link set ${bridge.name} up`);
    execSync(`sudo ip addr add ${bridgeIP}/${subnet} dev ${bridge.name}`);
    console.log("Setting up bridge finalized");

    namespaces.forEach((ns, i) => {
        const ip = availableIPs[i]
        execSync(`sudo ip netns add ${ns.name}`);
        execSync(`sudo ip link add veth-${ns.name}-in type veth peer name veth-${ns.name}-out`);
        execSync(`sudo ip link set veth-${ns.name}-in netns ${ns.name}`);
        execSync(`sudo ip link set veth-${ns.name}-out up`);
        execSync(`sudo ip netns exec ${ns.name} ip link set dev veth-${ns.name}-in up`);
        execSync(`sudo ip link set veth-${ns.name}-out master ${bridge.name}`);
        execSync(`sudo ip netns exec ${ns.name} ip addr add ${ip}/${subnet} dev veth-${ns.name}-in`);

        if (ns.loopback) {
            execSync(`sudo ip netns exec ${ns.name} ip link set dev lo up`);
        }

        if (ns.internet_access) {
            execSync(`sudo ip netns exec ${ns.name} ip route add default via ${bridgeIP}`);
        }
    });

    if (mask) {
        console.log("Setting up masking initialized");
        execSync(`sudo iptables -t nat -A POSTROUTING -s ${initialIP}/${subnet} -j MASQUERADE`);
        console.log("Setting up masking finazlied");
    }
}
