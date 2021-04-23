function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const http = require('http');

function get(reletiveURI, cookie = []) {
   return new Promise((resolve, reject) => {
      const get_options = {
         host: 'localhost',
         port: 3000,
         path: '/' + reletiveURI,
         method: 'GET',
         headers: {
            'Cookie': cookie
         }
      };
      const req = http.request(get_options, (res) => {
         res.setEncoding('utf8');
         let rawData = '';
         res.on('data', (chunk) => { rawData += chunk; });
         res.on('end', () => {
            resolve({ done: true, data: { res, rawData } });
         });
      }).on('error', (e) => {
         resolve({ done: false });
      });
      req.end();
   });
}
async function test() {
   errors = []
    try {
        const resp = await get('');
        if (!resp.done) {
         throw new Error("Routing problem");
        }
        if (resp.data.res.statusCode !== 200) {
         throw new Error("Routing problem");
     }
    } catch(err) {
       redLog(err)
       process.exit (1)
       // errors.push({ id: 'student_web_project_error.12.signUp' });
       // console.error(errors);
    }
}
test().then(()=>process.exit (0));
