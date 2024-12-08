# P6-Full-Stack-reseau-dev

This project was generated with Spring Boot 3.3.4, 
Java 17, Maven as dependency manager & Jar for packaging
with [Spring Initializr](https://github.com/spring-io/initializr/)

<img src="https://img.shields.io/badge/Language%20-%20Java%20-%20%23DB3431?logo=java&logoColor=%23fff"> <img src="https://img.shields.io/badge/Language%20-%20TypeScript%20-%20%233178C6?logoColor=%23fff"> <img src="https://img.shields.io/badge/Spring%20-%20%236CB52D?logo=spring&logoColor=%23fff"> <img src="https://img.shields.io/badge/Angular%20-%20%23800BF2?logo=angular&logoColor=%23fff"> <img src="https://img.shields.io/badge/MySQL%20-%20%233E6E93?logo=angular&logoColor=%23fff">

## Dependencies

### Back

**Spring Web**

Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.

**Lombok**

Java annotation library which helps to reduce boilerplate code.

**Spring Data JPA**

Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.

**MySQL Driver**

MySQL JDBC driver

**Spring Security 6**

Highly customizable authentication and access-control framework for Spring applications.

**JJWT**

Java library for creating and verifying JSON Web Tokens.

**ModelMapper** 

Java library for automating the mapping of objects to each other.

**springdoc-openapi** 

Library for automatically generating OpenAPI documentation and integrating Swagger UI for Spring Boot projects

### Front

**Angular 18**

Development platform, built on TypeScript. As a platform, Angular includes: A component-based framework for building scalable web applications. A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more.

**Angular Material 18**

UI component infrastructure and Material Design components for mobile and desktop Angular web applications.

## Installation

Clone project from GitHub repository
> `git clone` https://github.com/Nogaemi76/OC-P6-fullstack-app.git

### Back

Go inside folder
> `cd back`

 To install the dependencies
> Run `mvn install`

To launch the project

Inside the project folder **src/main/java**, 
in the package **com.openclassrooms.mddapi**,
> Right-click on **MddApiApplication.java**
 
> Select **Run As** > **Java Application**

### Front

Go inside folder
> `cd front_a18`

To install the node_modules
> Run `npm install`

To launch the project

**Development server**
> Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The application will automatically reload if you change any of the source files.

**Build**

> Run `ng build` to build the project.
The build artifacts will be stored in the `dist/` directory.

---
### MySQL
Server version: 8.0.X
>**Open the terminal** and **log into MySQL**

> ```CREATE DATABASE database_name;```

> ```USE database_name;```

> Open **script.sql** file in **folder src/main/resources/static**
> and copy content in terminal

At the project's root,
create file **env.properties** with following properties
>DB_DATABASE=

>DB_USER=

>DB_PASSWORD=

>SECURITY_JWT_SECRET_KEY=

>SECURITY_JWT_EXPIRATION_TIME=3600000 (for example)

---
## Swagger
Link to Swagger documentation
>  http://localhost:3001/swagger-ui/index.html
