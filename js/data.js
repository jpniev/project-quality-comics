var comicsJson = '[{"id" : 1, "title": "Batman Anniversae", "imgSrc": "images/comics/batman.jpg", "recommended": true, "borrowed": false, "genre": ["Action", "Superheroes"], "characters": ["Batman", "Robin", "Joker"] }, {"id" : 2, "title": "Captain America: My shield, my enemy!", "imgSrc": "images/comics/captain-america.jpg", "recommended": false, "borrowed": true, "genre": ["Action", "Superheroes"], "characters": ["Captain America"] }, {"id" : 3, "title": "Daredevil, the man without fear!", "imgSrc": "images/comics/daredevil.jpg", "recommended": false, "borrowed": false, "genre": ["Action", "Superheroes"], "characters": ["Daredevil", "Captain America"] }, {"id" : 4, "title": "Deadpool", "imgSrc": "images/comics/deadpool.jpg", "recommended": true, "borrowed": true, "genre": ["Action", "Superheroes", "Gore"], "characters": ["Deadpool"] }, {"id" : 5, "title": "Groot: I\'am Groot!", "imgSrc": "images/comics/groot.jpg", "recommended": false, "borrowed": false, "genre": ["Action", "Fantasy", "Monosyllabic"], "characters": ["Groot"] }, {"id" : 6, "title": "The invincible Iron Man", "imgSrc": "images/comics/iron-man.jpg", "recommended": false, "borrowed": true, "genre": ["Action", "Science Fiction", "Superheroes"], "characters": ["Iron Man"] }, {"id" : 7, "title": "Star Wars Insider", "imgSrc": "images/comics/star-wars.jpg", "recommended": true, "borrowed": false, "genre": ["Action", "Fantasy", "Science Fiction"], "characters": ["Luke Skywalker", "Han Solo", "Princess Leia", "Darth Vader"] }, {"id" : 8, "title": "Wolverine", "imgSrc": "images/comics/wolverine.jpg", "recommended": false, "borrowed": true, "genre": ["Action", "Superheroes"], "characters": ["Wolverine"] },{"id" : 9, "title": "The Amazing new adventures of Superman", "imgSrc": "images/comics/superman.jpg", "recommended": true, "borrowed": false, "genre": ["Action", "Superheroes"], "characters": ["Superman"] } ]';
var bannersJson = '[{"title": "Batman Banner","imgSrc": "images/banners/banner1.jpg"},{"title": "Comic-Con Banner","imgSrc": "images/banners/banner2.jpg"},{"title": "Comic Book Junkie Banner","imgSrc": "images/banners/banner3.jpg"},{"title": "Free Comic Book Day Banner","imgSrc": "images/banners/banner4.jpg"}]';
var usersJson = '[{"username": "admin","password": "admin1234","profile": "admin"},{"username": "user","password": "user1234","profile":"user"}]'

if(localStorage.getItem('comicsJson') == undefined){
      localStorage.setItem('comicsJson', comicsJson);
}

if(localStorage.getItem('bannersJson') == undefined){
      localStorage.setItem('bannersJson', bannersJson);
}

if(localStorage.getItem('usersJson') == undefined){
      localStorage.setItem('usersJson', usersJson);
}

