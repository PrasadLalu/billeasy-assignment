# billeasy-assignment

## 1. Clone Repository:
```
git clone https://github.com/PrasadLalu/billeasy-assignment.git

```
## 2. Install modules/packages:
```
cd billeasy-assignment/

npm install
```

## 3. Add .env data
```
1. Refer example.env sample data
2. Make sure your are adding correct database credentials in the .env file along with other data
```

## 4. Migrate database models:
```
npx sequelize-cli db:migrate
```

## 5. Run app:
```
npm run start-dev
```

## 6. API:
```
import API from 'src/APIDoc/billeasy-assignment.postman_collection.json' then execute APIs:
1. Register User
2. Login User
3. Upload file(Please select your file)
4. Find file by id
```
