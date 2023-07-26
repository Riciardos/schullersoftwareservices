import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '15s'
}
export default function () {
  const randomName = uuidv4();
  const res = http.get('https://api.schullersoftwareservices.com/slow/' + randomName);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response includes name': (r) => r.body.includes('Hello ' + randomName),
    'is faster than 1 second': (r) => r.timings.duration <= 1000
  })
}
