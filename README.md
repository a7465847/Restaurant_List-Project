# 餐廳清單
採用 Node.js 和 Express 打造的餐廳清單網站，使用 MongoDB 資料庫存取資料，使用者可以在此站上查看餐廳訊息，並可透過餐廳名稱尋找餐廳資訊，並且具有 CRUD 功能滿足使用者基本需求 !


## 專案畫面
![](https://i.imgur.com/DBwyyBN.png)
![](https://i.imgur.com/voVC3r3.png)
![](https://i.imgur.com/nMxMhJ1.png)
![](https://i.imgur.com/7v7eo3U.png)
![](https://i.imgur.com/EPpbZPf.png)

## 環境建置(prerequisites)
- Node.js v10.15.0
- Express v4.17.1
- Express-handlebars v5.2.0
- mongodb with mongoose as ODM

## 安裝與執行步驟 (installation and execution)

- 使用 Git Bash

1. 將專案clone到本地環境
   ```
   git clone https://github.com/a7465847/Restaurant_List-Project.git
   ```

2. 進入專案資料夾
   ```
   cd restaurant_list
   ```

3. 查看專案內 package.json 檔案需安裝的npm套件
   ```
   npm install 
   ```

4. 安裝 nodemon 套件 (本地未安裝  請執行此步驟)
   ```
   npm install -g nodemon    
   ```

5. 新增種子資料
   ```
   npm run seed
   ```

6. 啟動伺服器，執行 app.js 檔案
   ```
   npm run dev or npm run start
   ```

7. 終端機回應以下內容 代表代表可執行
   ```
   Express is running on http://localhost:3000
   ```

8. 在瀏覽器輸入 http://localhost:3000 開始使用


## 功能描述 (features)
- 透過尋找餐廳，可以快速篩選出你期盼的餐廳
- 今天想吃不同風格 ? 透過搜尋來判別類別
- 點擊餐廳頁面有詳細資訊
- 點擊餐廳頁面圖示會直接導航為你 google 導航至餐廳位置
- 新增收藏已久的餐廳資訊
- 修改清單內容
- 刪除不愛的餐廳清單

