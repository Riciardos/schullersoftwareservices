import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200']
  }
}

let testData = [];
export function setup() {
  // get initial test data
  const result  = http.get('https://api.schullersoftwareservices.com/testData')
  testData = result.body
}
export default function () {
  const randomName = randomItem(testData)
  console.log("Using this name: " + randomName)
  const result = http.get('https://api.schullersoftwareservices.com/slow/' + randomName);


}
