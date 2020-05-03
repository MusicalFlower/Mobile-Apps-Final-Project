document.addEventListener("DOMContentLoaded", function(){
    //Event handler for button
    display_list();
});

var display_list = function() {

let user = window.localStorage.getItem("active_account");
    
let workspace = document.getElementById("content");
workspace.innerHTML = "";
    
if(localStorage.getItem("list_"+user)){
    if(JSON.parse(localStorage.getItem("list_"+user)).length > 0){
    //Movie list exists, print movies
    let list = JSON.parse(window.localStorage.getItem("list_"+user));
    let api_in = 'https://www.omdbapi.com/?i=';
    let key = '&apikey=4e9f6bff';

    //Loop through listed elements
    let i = 0;
    while (i < list.length){
        
    //Forming API call
    api = api_in+list[i]+key;

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

        //Getting basic movie information and printing it to user

        let title = data.Title;
        let year = data.Year;
        let type = data.Type;
        let id = data.imdbID;

        let htitle = document.createElement('h3');
        text = document.createTextNode('Title: '+title);
        htitle.appendChild(text);
        htitle.onclick = function() {movie_Info(id, i);};
        workspace.append(htitle);

        let hyear = document.createElement('p');
        text = document.createTextNode('Year: '+year);
        hyear.appendChild(text);
        workspace.append(hyear);

        let htype = document.createElement('p');
        text = document.createTextNode('Type: '+type);
        htype.appendChild(text);
        workspace.append(htype);
        
        }

    });  
        
    i = i + 1;
    
    }

}

else{
    //Movie list does not exist, so inform user
    let hempty = document.createElement('h3');
    text = document.createTextNode('You have no movies in your list yet.');
    hempty.appendChild(text);
    workspace.append(hempty);
    
    let hinfo = document.createElement('p');
    text = document.createTextNode('Movies can be added after selecting searched movies on the main page.');
    hinfo.appendChild(text);
    workspace.append(hinfo);
}

}

else{
    //Movie list does not exist, so inform user
    let hempty = document.createElement('h3');
    text = document.createTextNode('You have no movies in your list yet.');
    hempty.appendChild(text);
    workspace.append(hempty);
    
    let hinfo = document.createElement('p');
    text = document.createTextNode('Movies can be added after selecting searched movies on the main page.');
    hinfo.appendChild(text);
    workspace.append(hinfo);
}
}

var movie_Info = function(id, i){
    //Save the id of the movie in local storage to be accessed by next HTML page
    window.localStorage.setItem("current_movie", id);
    window.localStorage.setItem("current_movie_loc", i);
    //Go to the HTML page that will display movie info of the movie with this id
    window.location.href = "movie_list_info.html";
}