# AC-Todo-List

使用 Node.js + Express + MongoDB 製作的Todo List，使用者可以註冊帳號、登入，並查看、新增、編輯或刪除專屬該用戶的Todo。


## Features - 功能

1. 使用者可以瀏覽所有Todo
2. 使用者可以註冊帳號、登入系統建立專屬的Todo
3. 使用者可以新增一筆Todo資料
4. 使用者可以瀏覽一筆Todo的詳細資訊
5. 使用者可以編輯一筆Todo的詳細資訊
6. 使用者可以刪除一筆Todo資料


## Prerequisites - 環境設置

- Node.js
- nodemon
- Express @4.16.4
- Bootstrap @5.1.3
- MongoDB

## Installation and execution - 安裝與執行步驟

1. 開啟 Terminal, Clone 此專案至本機:

```
git clone https://github.com/kim1037/AC-Todo-List.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd AC-Todo-List
```

3. 安裝所需套件，詳請見package.json

```
npm i [套件名稱]
```

4. 設置.env檔

請修改 `.env.example` 成 .env

5. 匯入種子檔案

```
npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

> MongoDB connect success!
>
> done

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動

> The server is running on http://localhost:3000
>
> MongoDB connect success!
