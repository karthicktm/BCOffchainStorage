/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const util = require('util');
//const ccpPath= "local_fabric_connection.json";
const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);






async function createPorder( pOrderNumber, status, rate, owner, quantity, name, hash) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.submitTransaction('createPorder', pOrderNumber, status, rate, owner, quantity, name, hash);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //var result1 = JSON.parse(result.toString());
        //return result1;
        return "success";
    } catch (error) { 
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}



async function readPorder(pOrderNumber)  {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.evaluateTransaction('readPorder',pOrderNumber);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        var result1 = JSON.parse(result.toString());
        return result1;
       // return "success";
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}



async function deletePorder(pOrderNumber)  {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.submitTransaction('deletePorder',pOrderNumber);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //var result1 = JSON.parse(result.toString());
        return "success";
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function readall() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.evaluateTransaction('readall');
        
       // var test = result.toString();
       // var arrTest = test.split('{"Record":');
       // console.log(arrTest);
        //console.log(util.inspect(JSON.parse(result.toString())));
        var arr1 = [];
       console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        var result1 = JSON.parse(result.toString());
        var test=result1;
        for(let [key,value] of Object.entries(test)){ 
            console.log("***",key)
            console.log(value)
            arr1.push(value)
            }
        return arr1;
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}




async function updatePorder(pOrderNumber,status) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.submitTransaction('updatePorder',pOrderNumber,status);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        var result1 = JSON.parse(result.toString());
        return result1;
       // return "success";
    } catch (error) { 
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
async function retrieveHistory(pOrderNumber) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('hai');
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('steelscm');

        // Evaluate the specified transaction.
        // queryOrder transaction - requires 1 argument, ex: ('queryOrder', 'ORDER-1')
        // queryAllOrders transaction - requires no arguments, ex: ('queryAllOrders')
        const result = await contract.evaluateTransaction('retrieveHistory',pOrderNumber);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        var result1 = JSON.parse(result.toString());
        return result1;
       // return "success";
    } catch (error) { 
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}



 //main();
module.exports.updatePorder =updatePorder
module.exports.readPorder = readPorder;
module.exports.createPorder = createPorder;
module.exports.deletePorder = deletePorder;
module.exports.readall = readall;
module.exports.retrieveHistory = retrieveHistory;
//module.exports.get=main;