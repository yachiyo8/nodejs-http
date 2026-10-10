"use strict";
const http = require("node:http");
const pug = require('pug');
const server = http
  .createServer((req, res) => {
    // infoもconsole logと同じ動き
    // ここでは情報を出力したいという意図を明確にするため、info 関数を利用
    const now = new Date();
    console.info(
      `[${now}] Requested by ${req.socket.remoteAddress}`,
    );
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.method) {
      case 'GET':
        //TOPページだったら
        if (req.url === '/') {
          //授業内先生のコード top.pugファイルにした
          res.write(pug.renderFile('./top.pug'));
          /* 教材のコード
          res.write('<!DOCTYPE html><html lang="ja"><body>' +
            '<h1>アンケートフォーム</h1>' +
            '<a href="/enquetes">アンケート一覧</a>' +
            '</body></html>');*/
        } else if (req.url === '/enquetes') {
          //授業内先生のコード enquetes.pugファイルにした
          res.write(pug.renderFile('./enquetes.pug'));
          /* 教材のコード
          res.write('<!DOCTYPE html><html lang="ja"><body>' +
            '<h1>アンケート一覧</h1><ul>' +
            '<li><a href="/enquetes/yaki-tofu">焼き肉・湯豆腐</a></li>' +
            '<li><a href="/enquetes/rice-bread">ごはん・パン</a></li>' +
            '<li><a href="/enquetes/sushi-pizza">寿司・ピザ</a></li>' +
            '</ul></body></html>')*/
        } else if(req.url === '/enquetes/yaki-tofu'){
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: '湯豆腐'
        })
        );
        } else if (req.url === '/enquetes/rice-bread') {
          res.write(pug.renderFile('./form.pug', {
            path: req.url,
            firstItem: 'ごはん',
            secondItem: 'パン'
          })
          );
        } else if (req.url === '/enquetes/sushi-pizza') {
          res.write(pug.renderFile('./form.pug', {
            path: req.url,
            firstItem: '寿司',
            secondItem: 'ピザ'
          })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req
        .on('data', chunk => {
          rawData += chunk;
        })
        .on('end', () => {
          const answer = new URLSearchParams(rawData);
          const body = `${answer.get('name')}さんは${answer.get('favorite')}に投票しました`;
          console.info(`[${now}] ${body}`);
          res.write(
            `<!DOCTYPE html><html lang="ja"><body><h1>${body}</h1></body></html>`
          );
          res.end();
        });
        break;
      default:
        break;
    }


  })//;を削除して命令を繋げた
  .on('error', e =>{//eはアロー関数の変数名で引数が1個だから()の表記が省略できる
console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.info(`[${new Date()}] Listening on ${port}`);
});
