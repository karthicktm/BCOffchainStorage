/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class SteelSCM extends Contract {

    async initLedger(ctx) {
            console.info('============= START : Initialize Ledger ===========');
            const pOrders = [
                 {
                        pOrderNumber:'ORDER-1',
                        status: 'Dispatched',
                        rate: '1000',
                        owner:'abc', 
                        quantity:'20',                
                        name:'file.txt',
                        hash:'qwerttyuii1234567'
                },
               	{
                         pOrderNumber:'ORDER-2',
                         status: 'In-transit',
                         rate:'2000',
                         owner:'xyz',
                         quantity:'20',                                                                   
                         name:'file.txt',
                         hash:'qwerttyuii1234567'
                },
                {
                         pOrderNumber:'ORDER-3',      
                         status: 'Delivered',
                         rate:'500',
                         owner:'kfc',
                         quantity:'20', 
                         name:'file.txt',
                         hash:'qwerttyuii1234567'
                 },
            ];

            for (let i = 0; i < pOrders.length; i++) {
                 pOrders[i].docType = 'pOrder';
                 await ctx.stub.putState('ORDER-' + i , Buffer.from(JSON.stringify(pOrders[i])));
                     console.info('Added <--> ', pOrders[i]);
             }
        console.info('============= END : Initialize Ledger ===========');
     }

     
    

    async createPorder(ctx, pOrderNumber, status, rate, owner, quantity, name, hash) {
      console.info('============= START : Create Purchase Order ===========');
        const pOrder = {
            pOrderNumber,
            status,
            rate,          
            owner,
            quantity,        	
            name,
            hash
        };
        await ctx.stub.putState(pOrderNumber, Buffer.from(JSON.stringify(pOrder)));
        console.info('============= END : Create Order ===========');
    }


    

    async readPorder(ctx, pOrderNumber) {
          const exists = await this.pOrderExists(ctx,pOrderNumber);
          if (!exists){
              throw new Error('the purchase order does not exist');
          }
          const buffer = await ctx.stub.getState(pOrderNumber);
          const asset = JSON.parse(buffer.toString());
          return asset;
          
    } 


    async readLineItem(ctx, pOrderNumber) {
      const exists = await this.pOrderExists(ctx,pOrderNumber);
      if (!exists){
          throw new Error('the purchase order does not exist');
      }
      const buffer = await ctx.stub.getState(pOrderNumber);
      const asset = JSON.stringify(buffer.toString());
      var asset1 = JSON.parse(asset.toString());
      var asset2 = asset1.replace("\\","");
      return asset2;

} 
    
    
    async pOrderExists(ctx,pOrderNumber){
         const buffer = await ctx.stub.getState(pOrderNumber);
         return (!!buffer && buffer.length>0);
    }  
    



    async deletePorder(ctx,pOrderNumber){
    const exists = await this.pOrderExists(ctx,pOrderNumber);
    if(!exists){
        throw new Error('The POrder $(pOrderNumber) does not exist');
    }
        await ctx.stub.deleteState(pOrderNumber);
    }

   async updatePorder(ctx,pOrderNumber,status){
   const exists = await this.pOrderExists(ctx,pOrderNumber);
    if(!exists){
        throw new Error('The POrder $(pOrderNumber) does not exist');
    }
   const buffer = await ctx.stub.getState(pOrderNumber);
   const asset = JSON.parse(buffer.toString());
   asset.status = status;
   await ctx.stub.putState(pOrderNumber, Buffer.from(JSON.stringify(asset)));
   return asset;
   }

   
       async readall(ctx) {
        const startKey = '';
        const endKey = '';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
//return iterator;
        //var result = JSON.stringify(iterator);
//var result1 = JSON.parse(result);
//return result1;
        //return iterator.toString();
//return JSON.stringify(iterator);

       const allResults = [];
       var test;
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push(Record);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
 

   /*   async getAllResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.tx_id;
          jsonRes.Timestamp = res.value.timestamp;
          jsonRes.IsDelete = res.value.is_delete.toString();
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString('utf8');
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString('utf8');
          }
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }

   */ 
  
  async retrieveHistory(ctx, key) {
    console.info('getting history for key: ' + key);
    let iterator = await ctx.stub.getHistoryForKey(key);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    return result;
  }	
}
module.exports = SteelSCM;
