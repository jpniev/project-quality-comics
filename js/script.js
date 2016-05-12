var loginWindow = document.getElementById('login'),
	formType = document.getElementById('formType'),
	titleForm = 'Login', 
    titleTag = document.getElementById('titleForm'),
	userInput = document.getElementById('user'),
	passwordInput = document.getElementById('password'),
	formSubmit = document.getElementById('formSubmit'),
	userError = document.getElementById('userError'),
	passError = document.getElementById('passError'),
	rememberMe = document.getElementById('remember'),
	isAdmin = document.getElementById('admin'),
	infoForm = document.getElementById('infoForm'),
	wrapper = document.getElementById('wrapper'),
	loggedHeader = document.getElementById('loggedHeader'),
	userInfo = document.getElementById('userInfo'),
	loggedUserBar = document.getElementById('loggedUserBar'),
	bannersDiv = document.getElementById('banners'),
	content = document.getElementById('content'),
	recommendedCheck = document.getElementById('recommendedCheck'),
	searchInput = document.getElementById('searchInput'),
	searchBySelect = document.getElementById('searchBy'),
	filterByCharacter = document.getElementById('filterByCharacter'),
	filterByGenre = document.getElementById('filterByGenre');

var userOk = false, passwordOk = false, firstLogin = true, profile = "user", loggedUser, loggedUserProfile, searchBy = "title";

var users = JSON.parse(localStorage.getItem('usersJson'));
var banners = JSON.parse(localStorage.getItem('bannersJson'));
var comics = JSON.parse(localStorage.getItem('comicsJson'));
var comicsFiltered = comics;

getUserData();

function getUserData(){
	if(sessionStorage.getItem('loggedUser') == undefined){
		if(localStorage.getItem('loggedUser') == undefined){
			notLogged();
		} else {
			loggedUser = localStorage.getItem('loggedUser');
			loggedUserProfile = localStorage.getItem('loggedUserProfile');
			logged();
			}			
	} else {
		loggedUser = sessionStorage.getItem('loggedUser');
		loggedUserProfile = sessionStorage.getItem('loggedUserProfile');
		logged();
	}	
}


function notLogged(){
	wrapper.classList.add("hidden");
	loginWindow.classList.remove("hidden");
	btnLogin();
}

function btnLogin() {
	titleForm = 'Login';
	titleTag.innerHTML = titleForm;
	formSubmit.value = 'Sign In';
	infoForm.innerHTML = '';
	formType.classList.remove("registerForm");
	formType.classList.add("loginForm");
	resetFields();
	resetErrors();
}

function btnRegister() {
	titleForm = 'Register';
	titleTag.innerHTML = titleForm;
	formSubmit.value = 'Sign Up';
	infoForm.innerHTML = '';
	formType.classList.add("registerForm");
	formType.classList.remove("loginForm");
	resetErrors();
}

function resetErrors() {
	userError.innerHTML = '';
	passError.innerHTML = '';
	infoForm.classList.remove("error");
}

function resetFields(){
	userInput.value = '';
	passwordInput.value = '';
}

function formSent(event) {
	event.preventDefault();
	
	
	if(titleForm === "Register"){
		validateData();
	} else if(titleForm === "Login"){
		login();	
	}

}

function validateData(){

	var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=",
		check = function(string){
		 	for(i = 0; i < specialChars.length;i++){
			    if(string.indexOf(specialChars[i]) > -1){
			       	return true;
		    	}
			}
			return false;
		};
	
	var pattern = new RegExp("/^[a-z0-9]+$/i");
	var isNameAlphanumeric = pattern.test(userInput.value);
	var isPassAlphanumeric = pattern.test(passwordInput.value);
	if(isAdmin.checked){
		profile = "admin";
	}

	//Username validation
	if (userInput.value.length == 0) {
		userError.innerHTML = "You didn't enter a username";
	} else if(check(userInput.value) == true) {
		userError.innerHTML = 'Username has special characters';
	} else if(isNameAlphanumeric) {
		userError.innerHTML = 'Username must be alphanumeric';
	} else {
		userError.innerHTML = '';
		userOk = true;
	}

	//Password validation
	if (passwordInput.value.length == 0) {
		passError.innerHTML = "You didn't enter a password";
	} else if(passwordInput.value.length < 7) {
		passError.innerHTML = "At least 7 characters";
	} else if(check(passwordInput.value) == true) {
		passError.innerHTML = 'Password has special characters';
	}else if(isPassAlphanumeric) {
		passError.innerHTML = 'Password must be alphanumeric';
	} else {
		passError.innerHTML = '';
		passwordOk = true;
	}

	if(userOk && passwordOk){
		register();
	}
	
}

function register(){
	var newUser = {"username":userInput.value,"password":passwordInput.value, "profile":profile};
	users.push(newUser);
	localStorage.setItem('usersJson', JSON.stringify(users));
	infoForm.innerHTML = "User successfully created!";
}

function login(){
	var userPassOk = false;
	users.forEach(function(user){
		if(userInput.value === user.username && passwordInput.value === user.password){
			userPassOk = true;
		} else {
			userPassOk = false;
		}

		if(userPassOk){
			resetErrors();
			loggedUser = user.username;
			loggedUserProfile = user.profile;
				if(rememberMe.checked){
					localStorage.setItem('loggedUser', loggedUser);
					localStorage.setItem('loggedUserProfile', loggedUserProfile);
				} else {
					sessionStorage.setItem('loggedUser', loggedUser);
					sessionStorage.setItem('loggedUserProfile', loggedUserProfile);
				}
			logged();
		} else {
				infoForm.classList.add("error");
				infoForm.innerHTML = "Incorrect username or password";
		}
	});
}

function logout(){
	if(document.getElementById("adminLogo")!=null){
		adminLogo = document.getElementById("adminLogo");
		adminLogo.parentNode.removeChild(adminLogo);
	}
	
	if(sessionStorage.getItem('loggedUser') != undefined){
		sessionStorage.removeItem('loggedUser');
		sessionStorage.removeItem('loggedUserProfile');
	} else if (localStorage.getItem('loggedUser') != undefined){
		localStorage.removeItem('loggedUser');
		localStorage.removeItem('loggedUserProfile');
	}
	
	notLogged();
}


function logged(){
	
	wrapper.classList.remove("hidden");
	loginWindow.classList.add("hidden");

	userInfo.innerHTML = "Welcome, " + loggedUser;

	if(loggedUserProfile === "admin"){
		adminLogo = document.createElement("div");
		adminLogo.id = "adminLogo";
		loggedUserBar.insertBefore(adminLogo, loggedUserBar.firstChild);
	} else {
		if(document.getElementById("adminLogo")!=null){
			adminLogo = document.getElementById("adminLogo");
			adminLogo.parentNode.removeChild(adminLogo);
		}
	}

	buildGenreSelect();
	buildCharacterSelect();
	
	if (firstLogin) {
		showBanners();
		showComics();
		firstLogin = false;
	} else {
		refreshComics();
		showComics();
	}



}

function buildGenreSelect(){
	var genresArray = [];
	comics.forEach(function(item){
		item.genre.forEach(function(i){
			genresArray.push(i);
		});
	});

	var genresSelect = arrayUnique(genresArray);
	genresSelect = genresSelect.sort();
	
	for(var i = 0; i<genresSelect.length; i++){
		var option = document.createElement("option");
		option.text = genresSelect[i];
		option.value = genresSelect[i];
		filterByGenre.add(option);
	}

}

function buildCharacterSelect(){
	var charactersArray = [];
	comics.forEach(function(item){
		item.characters.forEach(function(c){
			charactersArray.push(c);
		});
	});

	var charactersSelect = arrayUnique(charactersArray);
	charactersSelect = charactersSelect.sort();
	
	for(var i = 0; i<charactersSelect.length; i++){
		var option = document.createElement("option");
		option.text = charactersSelect[i];
		option.value = charactersSelect[i];
		filterByCharacter.add(option);
	}
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function showBanners(){
	banners.forEach(function(item, id){
		var banner = document.createElement("div");
		banner.className = "item";
		banner.id = "item-"+id;
		bannersDiv.appendChild(banner);
		document.getElementById("item-"+id).innerHTML = '<img src="'+item.imgSrc+'" alt="'+item.title+'" title="'+item.title+'"/>';
	});

	animateBanners();
}

function searchByChange(){
		searchBy = searchBySelect.value;
}

function refreshComics(){
	while (content.firstChild) {
   			content.removeChild(content.firstChild);
		}
}

function filterComics(){
	
	refreshComics();
	var searchword = searchInput.value;	
	if(searchword!=undefined && searchword!=''){    
        comicsFiltered=comics.filter(function (item) {
	          switch(searchBy){
	          	case "title": var str_title = item.title.toUpperCase(); 
	          				  var result= str_title.search(searchword.toUpperCase());
	          					if(result!=-1){
	              					return true;
	          					}else{
	              					return false;
								}
	          	break;
	          	case "genre": var str_genre = item.genre.toString();
	          				  var str_upgenre = str_genre.toUpperCase();
	          				  var result= str_upgenre.search(searchword.toUpperCase());
	          				  	if(result!=-1){
	              					return true;
	          					}else{
	              					return false;
	          					}          				  			
	          	break;
	          	case "characters": var str_character = item.characters.toString();
	          				var str_upcharacter = str_character.toUpperCase();
	          				var result= str_upcharacter.search(searchword.toUpperCase());
	          				if(result!=-1){
	              				return true;
	          				}else{
	              				return false;
	          				}
	          	break;
	          }
                   
        });
    } else {
    	comicsFiltered = comics;
    }

    if(recommendedCheck.checked){
    	comicsFiltered = comicsFiltered.filter(function (item){
    		return item.recommended === true;
    	});
    }

    if (filterByCharacter.value != 'all') {
    	comicsFiltered = comicsFiltered.filter(function (item){
    		var str_character = item.characters.toString(); 
    		var result = str_character.search(filterByCharacter.value);
    		if(result!=-1){
    			return true;
    		} else {
    			return false;
    		}
    	});
    }

    if (filterByGenre.value != 'all') {
    	comicsFiltered = comicsFiltered.filter(function (item){
    		var str_genre = item.genre.toString(); 
    		var result = str_genre.search(filterByGenre.value);
    		if(result!=-1){
    			return true;
    		} else {
    			return false;
    		}
    	});
    }

    showComics();
}

function showComics(){
	
	if(comicsFiltered == ''){
		var nothingFound = document.createElement("div");
		nothingFound.id = "nothingFound";
		nothingFound.innerHTML = "No matching results for your search";
		content.appendChild(nothingFound);
	}
	comicsFiltered.forEach(function(item, id){
		var comicWrapper = document.createElement("div");
		var comic = document.createElement("div");
		var comicCover = document.createElement("img");
		var comicDesc = document.createElement("div");
		var comicDescInner = document.createElement("div");
		var comicGenres = item.genre.join(", ");
		var comicCharacters = item.characters.join(", ");
		comicWrapper.className = "comicWrapper";
		comic.className = "comic";
		comicCover.className = "comicCover";
		comicCover.src = item.imgSrc;
		comicDesc.className = "comicDesc";
		comicDescInner.className = "comicDescInner";
		comicDescInner.innerHTML = "<div><b>Title:</b> "+item.title+"</div><div><b>Genre:</b> "+comicGenres+"</div><div><b>Characters:</b> "+comicCharacters+"</div>";

		content.appendChild(comicWrapper);
		comicWrapper.appendChild(comic);
		comic.appendChild(comicCover);

		if(item.recommended == true){
			var recommendedImg = document.createElement("img");
			recommendedImg.className = "recommended";
			recommendedImg.src = "images/recommended.png";
			comic.appendChild(recommendedImg);
		}

		if(item.borrowed == true){
			var notAvailable = document.createElement("img");
			notAvailable.className = "not-available";
			notAvailable.src = "images/not-available.png";
			comic.appendChild(notAvailable);
		}

		comic.appendChild(comicDesc);
		comicDesc.appendChild(comicDescInner);

		if(loggedUserProfile === "admin"){
			comicDescInner.innerHTML += "<hr/><div>Administrator options:</div><div><b>Recommended?</b> <input type=\"checkbox\" id=\"comic-recommended-"+id+"\" onchange=\"changeRecommended("+id+")\"/></div><div><b>Borrowed?</b> <input type=\"checkbox\" id=\"comic-borrowed-"+id+"\" onchange=\"changeBorrowed("+id+")\"/></div>";
			var comicRecommended = document.getElementById('comic-recommended-'+id);
			var comicBorrowed = document.getElementById('comic-borrowed-'+id);
			comicRecommended.checked = item.recommended;
			comicBorrowed.checked = item.borrowed;
		}

	});

}

function changeRecommended(id){
	var changedRec = document.getElementById('comic-recommended-'+id);
	if(changedRec.checked){
		comics[id].recommended = true;
		localStorage.setItem('comicsJson', JSON.stringify(comics));
	} else {
		comics[id].recommended = false;
		localStorage.setItem('comicsJson', JSON.stringify(comics));
	}
	refreshComics();
	showComics();
}

function changeBorrowed(id){
	var changedBor = document.getElementById('comic-borrowed-'+id);
	if(changedBor.checked){
		comics[id].borrowed = true;
		localStorage.setItem('comicsJson', JSON.stringify(comics));
	} else {
		comics[id].borrowed = false;
		localStorage.setItem('comicsJson', JSON.stringify(comics));
	}
	refreshComics();
	showComics();
}