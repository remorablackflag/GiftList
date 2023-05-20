const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const defaultIndex = 42;
const nameIndex = process.argv[2] || defaultIndex;
const name = niceList[nameIndex] || "Craig Wright";

console.log("\nUsage: node index.js <index>");
console.log("Tip #1: default index is", defaultIndex, "(exists in the list)");
console.log("Tip #2: set an index greater than", niceList.length - 1, "to choose a nonexisting name\n");

console.log("Proving for name:", name, ", index:", nameIndex);

async function main() {

    const tree = new MerkleTree(niceList);

    // const merkleRoot = tree.getRoot();
    // console.log("merkleRoot: ", merkleRoot);

    const proof = tree.getProof(nameIndex);

    // console.log("proof: ", proof);

    try {
        const { data: gift } = await axios.post(`${serverUrl}/gift`, {
            name,
            proof
        });
        console.log("Response:", { gift });
    } catch(err) {
        console.log(
            "Request error:",
            err?.response?.data?.message || err.message || err
        );
    }

}

main();