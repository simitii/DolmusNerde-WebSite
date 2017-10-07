import Constants from './Constants';

let API = Constants.API;

export default async function Fetch(path,method,json,callback){
  console.log(API+path);
  let gotResponse = false;
  try {
    let response = await fetch(API+path, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: json?JSON.stringify(json):undefined,
      });
      let responseJSON = undefined;
      if (response !== undefined) {
        responseJSON = await response.json();
        gotResponse = true;
      }
      callback(responseJSON);
    }catch(error) {
      if(!gotResponse){
        // Handle error
        console.log(error);
        //Network Connection Problem
        callback(undefined);
      }
    }
};
