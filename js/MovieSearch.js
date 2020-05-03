document.addEventListener("DOMContentLoaded", function(){
    //Event handler for button
    document.getElementById('call_movie_search').onclick = search_movie;
});

var search_movie = function() {

var cont = true;

let workspace = document.getElementById("content");
workspace.innerHTML = "";

//Getting title, type, and year from HTML inputs
let in_title = document.getElementById("in_title").value;
let in_type = document.getElementById("in_type").value;
let in_year = document.getElementById("in_year").value;
    
if (in_title === ""){ //If there is no title, say there has to be one
    //Require title!
    let htitle_error = document.createElement('h3');
    let text = document.createTextNode("A title is required to be entered!");
    htitle_error.appendChild(text);
    workspace.append(htitle_error);
    cont = false;
}
if (in_year != ""){ //If the year was input, check to see if it's a valid 4-digit number
if (isNaN(in_year) || in_year.length != 4){
    //Not valid year!
    let hyear_error = document.createElement('h3');
    let text = document.createTextNode("Not a valid year!");
    hyear_error.appendChild(text);
    workspace.append(hyear_error);
    cont = false;
}}
    
if (cont == true) { //If there are no input errors
    
let api_in = 'https://www.omdbapi.com/?s=';
let key = '&apikey=4e9f6bff';
let stype = '';
let syear = '';

if (in_type != "none"){
    //Type will be part of the API call
    stype = '&type='+in_type;
}

if (in_year != ""){
    //Year will be part of the API call
    syear = '&y='+in_year;
}

//Finalize the API
api = api_in+in_title+stype+syear+key;

$.getJSON(api, function(data){
    
    //If the API failed to get a response, report the error
    if (data.Response == "False"){
        let herror = document.createElement('h3');
        text = document.createTextNode("Sorry, "+data.Error);
        herror.appendChild(text);
        workspace.append(herror);
    }
    
    //If the API got a successful response
    else{
        
    //Get total number of results
    
    let results = Number(data.totalResults);
    let i = 0;
    
    let h1 = document.createElement('h2');
    text = document.createTextNode("Movie Search Results:");
    h1.appendChild(text);
    workspace.append(h1);
        
    while (i < 10 && i < results){
    
    //Getting basic movie information and printing it to user
    
    let title = data.Search[i].Title;
    let year = data.Search[i].Year;
    let type = data.Search[i].Type;
    let id = data.Search[i].imdbID;
    
    let htitle = document.createElement('h3');
    text = document.createTextNode('Title: '+title);
    htitle.appendChild(text);
    htitle.onclick = function() {movie_Info(id);};
    workspace.append(htitle);
    
    let hyear = document.createElement('p');
    text = document.createTextNode('Year: '+year);
    hyear.appendChild(text);
    workspace.append(hyear);
    
    let htype = document.createElement('p');
    text = document.createTextNode('Type: '+type);
    htype.appendChild(text);
    workspace.append(htype);
            
    i = i + 1;
    
    }
    
    //If more results are available, create button to print more results
    if (i < results){
        let hbut = document.createElement('button');
        text = document.createTextNode('Load More Results');
        hbut.appendChild(text);
        workspace.append(hbut);
        hbut.className += 'btn btn-primary btn-xl';
        hbut.setAttribute('id', 'load_btn');
        let api2 = in_title+stype+syear;
        hbut.onclick = function() {print_results(1, i, api_in, api2, key, results);};
    }
    }

});
}    
    
}

//For printing more results on button click
var print_results = function(page, n, api1, api2, key, results){
    //First have to delete button that got here
    let old_btn = document.getElementById('load_btn');
    old_btn.parentNode.removeChild(old_btn);
    
    //Getting more results
    page = page + 1;
    let workspace = document.getElementById("content");
    api = api1+api2+'&page='+page+key;
    let i = 0;
    $.getJSON(api, function(data){
        while(i < 10 && n < results){
            
            let title = data.Search[i].Title;
            let year = data.Search[i].Year;
            let type = data.Search[i].Type;
            let id = data.Search[i].imdbID;

            let htitle = document.createElement('h3');
            text = document.createTextNode('Title: '+title);
            htitle.appendChild(text);
            htitle.onclick = function() {movie_Info(id);};
            workspace.append(htitle);

            let hyear = document.createElement('p');
            text = document.createTextNode('Year: '+year);
            hyear.appendChild(text);
            workspace.append(hyear);

            let htype = document.createElement('p');
            text = document.createTextNode('Type: '+type);
            htype.appendChild(text);
            workspace.append(htype);
            
            i = i+1;
            n = n+1;
        }
        
        //If more results are available, create another button to print more results
        if (n < results){
            let hbut = document.createElement('button');
            text = document.createTextNode('Load More Results');
            hbut.appendChild(text);
            workspace.append(hbut);
            hbut.className += 'btn btn-primary btn-xl';
            hbut.setAttribute('id', 'load_btn');
            hbut.onclick = function() {print_results(page, n, api1, api2, key, results);};
        }
    
    });
}

var movie_Info = function(id){
    //Save the id of the movie in local storage to be accessed by next HTML page
    window.localStorage.setItem("current_movie", id);
    //Go to the HTML page that will display movie info of the movie with this id
    window.location.href = "movie_info.html";
}