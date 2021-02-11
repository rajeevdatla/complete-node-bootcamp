const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const renderTemplate = require('./modules/replaceTemplate.js');

//Blocking, synchronous way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(text);

// const textOut = `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File Written!');

//Non-Blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written.')
//             })
//         })
//     })
// })

// console.log('Wait for the file to be read!')

/////////////////////////////
/// SERVER

const tempoverview = fs.readFileSync(
  `${__dirname}/templates/templates-overview.html`,
  'utf-8'
);
const tempcard = fs.readFileSync(
  `${__dirname}/templates/templates-card.html`,
  'utf-8'
);
const tempproduct = fs.readFileSync(
  `${__dirname}/templates/templates-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObject
      .map((el) => renderTemplate(tempcard, el))
      .join('');
    const output = tempoverview.replace('{%PRODUCT_VIEW%}', cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    const product = dataObject[query.id];
    res.writeHead(200, { 'Content-type': 'text/html' });
    const output = renderTemplate(tempproduct, product);

    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
  res.end('Hello from Local Server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Localhost 8000 is listening!!');
});
