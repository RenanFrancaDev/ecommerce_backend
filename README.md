# Fire Development - Ecommerce Backend

API development project for ecommerce, ready to be integrated

## Database Model
![App Screenshot](https://github.com/RenanFrancaDev/ecommerce_backend/blob/main/public/images/model_db_rev2png.png)


## Install

### MySQL database tables

```mysql
CREATE TABLE `users` (
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `users_un` (`email`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;
```

```mysql
CREATE TABLE `products` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`description` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`price` FLOAT NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=12
;
```

```mysql
CREATE TABLE `stock` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`quantity` INT(10) NULL DEFAULT NULL,
	`id_product` INT(10) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `stock_FK` (`id_product`) USING BTREE,
	CONSTRAINT `stock_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=12
;
```

```mysql
CREATE TABLE `order_product` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`id_product` INT(10) NOT NULL,
	`id_sales` INT(10) NOT NULL,
	`quantity` INT(10) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `order_items_FK` (`id_product`) USING BTREE,
	INDEX `order_product_FK` (`id_sales`) USING BTREE,
	CONSTRAINT `order_items_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `order_product_FK` FOREIGN KEY (`id_sales`) REFERENCES `sales` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=5
;

```

```mysql
CREATE TABLE `sales` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`total_price` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`id_user` INT(10) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `sales_FK` (`id_user`) USING BTREE,
	CONSTRAINT `sales_FK` FOREIGN KEY (`id_user`) REFERENCES `sales` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10
;
```

### Install packages
```$ npm install```

### Start Localhost
```$ npm run dev```

#Techs
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Noje.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/pt-br/)
  
  ```$ npx express-generator```

## API DOCUMENTATION

### Users

#### All
  ```
    GET /users
  ```
#### One by id
  ```
    GET /users/{id}
  ```
#### Create User
  ```
    POST /users/create
  ```
###### Data (Example)
  ```json
  {
  	"name": "Abel",
  	"email":"abel@gmail.com",
  	"password":"12345678"
  }
  ```
### Update User
  ```
    PUT /users/{id}
  ```

###### Data (Example)
  ```json
  {
  	"email":"abel22@gmail.com"
  }
  ```

#### Delete User
  ```
    DELETE /users/{id}
  ```
### Stock

#### All
  ```
    GET /stock
  ```
#### One by id
  ```
    GET /stock/{id}
  ```

### Update Stock
  ```
    PUT /stock/update/{id}
  ```

#### Edit Stock
  ```
    PUT /stock/edit/{id}
  ```
    ###### Data (Example)
  ```json
  {
  	"quantity": "12";
  }
  ```
  
### Products

#### All
  ```
    GET /products/
  ```
#### One by id
  ```
    GET /products/{id}
  ```
#### Create product
  ```
    POST /products/register
  ```
###### Data (Example)
  ```json
  {
	"name": "Iphone 11 PRO MAX",
	"description": "Liquid Retina HD display · 6.1-inch (diagonal) all-screen LCD Multi-Touch display with IPS technology ·",
	"price": "3800.00",
	"quantity": "18"
  }
  ```
### Update product
  ```
    PUT /products/{id}
  ```

###### Data (Example)
  ```json
  {
  	"price":"3500.00"
  }
  ```

#### Delete Product
  ```
    DELETE /products/{id}
  ```
### Sales 

#### All
  ```
    GET /sales
  ```
#### One by id
  ```
    GET /sales/{id}
  ```
#### Register Sale
  ```
    POST /sales/
  ```
###### Data (Example)
  ```json
 {
	"products":[
		{
			"id": "10",
			"price": "2500",
			"quantity": "1"
		}
	],
	"id_user": "1"
}
  ```

## Contact

Send an email to renanfranca.dev@gmail.com or visit the [GitHub](https://github.com/RenanFrancaDev) and [Linkedin](https://www.linkedin.com/in/renan-franca/)
  
  
