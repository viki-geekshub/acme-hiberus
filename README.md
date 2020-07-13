# acme-hiberus
Prueba técnica hiberus - Web de películas

In order to see the application, the first is to clone the project from my github with the following command:

  git clone https://github.com/viki-geekshub/acme-hiberus.git
  
Then the project will be opened with the editor you want and once inside you have to copy the file “config.example.json”, which is located in the backend/config folder, to paste it in that same folder with the name of “config.json ”.

You must modify the "jwt_secret" and change the password for another one of your choice. This will be done in all three environments, both in "development", "test" and "production".

The node will be installed inside the "backend" folder with the following commands:
  cd backend
  npm install

Next, a database called “acmedb” must be created in the “phpmyadmin” (https://www.phpmyadmin.net/):
  
And you need to migrate the necessary tables from the console so that they appear in the newly created database. This will be done with the command:

  sequelize db: migrate

The XAMPP package is installed and once inside the control panel both Apache and MySQL will be raised by pressing "start" on "Apache" and "MySQL". (You can also install the LAMP package or you can use any SQL server).
  
Servers are raised from the console, both from the frontend and the backend. This will be done with the following command:

  npm start
 
It will open a tab in the browser to see the application. From now on it can be used.

It will be necessary to register and connect to be able to interact as a user and that the application allows us to see the ratings of the films.

Only connected users will be able to see the rating of the movies and rate them with the desired rating, from 1 to 5 stars.

The search engine locates movies and provides you with suggestions when writing, because the information is updated all the time.

In "Popular Movies" you can see all the most popular movies and if you click on any of them it will show you the details of that movie. If you are a registered user and you are connected, you can also see the rating you have given to that movie in the details section and you can rate the movies as you see fit.

The application is developed using React + Redux in the frontend and NodeJs + Sequelize in the backend. I have also used elements from various libraries.
