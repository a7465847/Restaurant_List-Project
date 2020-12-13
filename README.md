# 餐廳清單
採用 Node.js 和 Express 打造的餐廳清單網站，使用者可以在此站上查看餐廳訊息，並可透過餐廳名稱尋找餐廳資訊



## 專案畫面
![](https://i.imgur.com/ctTsTpw.png)
![](https://i.imgur.com/Ti4IzdX.png)
![](https://i.imgur.com/Ju6cGRs.png)


## 環境建置(prerequisites)
- Node.js v10.15.0
- Express v4.17.1
- Express-handlebars v5.2.0

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
   npm i <package>
   ```
4. 安裝 nodemon 套件 (本地未安裝  請執行此步驟)
   ```
   npm install -g nodemon    
   ```

5. 啟動伺服器，執行 app.js 檔案
   ```
   nodemon app.js
   ```
6. 終端機回應以下內容 代表代表可執行
   ```
   Express is running on http://localhost:3000
   ```

6. 在瀏覽器輸入 http://localhost:3000 開始使用


## 功能描述 (features)
- 透過尋找餐廳，可以快速篩選出你期盼的餐廳
- 今天想吃不同風格 ? 透過搜尋來判別類別
- 點擊餐廳頁面有詳細資訊
- 點擊餐廳頁面圖示會直接導航為你 google 導航至餐廳位置

