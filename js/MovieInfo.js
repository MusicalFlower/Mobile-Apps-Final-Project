document.addEventListener("DOMContentLoaded", function(){
    //Function is called upon access of HTML page
    display_movie();
    
    //Back button to go back to search page event handler
    document.getElementById('back').onclick = go_back;
});

var display_movie = function() {
    
    id = window.localStorage.getItem("current_movie");
    api = 'https://www.omdbapi.com/?i='+id+'&apikey=4e9f6bff';
    $.getJSON(api, function(data){
        
        let workspace = document.getElementById("movie_info_display");
        workspace.innerHTML = "";
        
        let title = data.Title;
        let year = data.Year;
        let type = data.Type;
        let rdata = data.Released;
        let genre = data.Genre;
        let poster = data.Poster;
        let director = data.Director;
        let plot = data.Plot;
        let rated = data.Rated;
        let lang = data.Language;
        let country = data.Country;
        
        let htitle = document.createElement('h3');
        text = document.createTextNode('Title: '+title);
        htitle.appendChild(text);
        workspace.append(htitle);
        htitle.onclick = function() {movie_Info(id);};
        
        let imgposter = document.createElement('img');
        imgposter.setAttribute("src", poster);
        workspace.append(imgposter);

        let hyear = document.createElement('p');
        text = document.createTextNode('Year: '+year);
        hyear.appendChild(text);
        workspace.append(hyear);

        let htype = document.createElement('p');
        text = document.createTextNode('Type: '+type);
        htype.appendChild(text);
        workspace.append(htype);
        
        let hplot = document.createElement('p');
        text = document.createTextNode('Plot: '+plot);
        hplot.appendChild(text);
        workspace.append(hplot);
        
        let hrdata = document.createElement('p');
        text = document.createTextNode('Released: '+rdata);
        hrdata.appendChild(text);
        workspace.append(hrdata);
        
        let hgenre = document.createElement('p');
        text = document.createTextNode('Genre: '+genre);
        hgenre.appendChild(text);
        workspace.append(hgenre);
        
        let hdir = document.createElement('p');
        text = document.createTextNode('Director: '+director);
        hdir.appendChild(text);
        workspace.append(hdir);
        
        let hrated = document.createElement('p');
        text = document.createTextNode('Rated: '+rated);
        hrated.appendChild(text);
        workspace.append(hrated);
        
        let hlang = document.createElement('p');
        text = document.createTextNode('Language: '+lang);
        hlang.appendChild(text);
        workspace.append(hlang);
        
        let hcount = document.createElement('p');
        text = document.createTextNode('Country: '+country);
        hcount.appendChild(text);
        workspace.append(hcount);
        
    });
    
    //Get movie list
     if (localStorage.getItem("list")){
        console.log("Movie list exist");
        //Get user accounts to search through usernames
        accounts = JSON.parse(window.localStorage.getItem("accounts"));
        i = 0;
        while (i < accounts.length){
            //Check if username exists
            if (accounts[i].username == in_user){
                //Inform user that the username input already exists
                let herror = document.createElement('h3');
                let text = document.createTextNode("Username already exists");
                herror.appendChild(text);
                workspace.append(herror);
            }
            i = i+1;
        }
        
    }
    else{
        console.log("No list made");
    }
    //Check if movie is part of list
    //If part of list, make 'Delete from List' button
        //Check if movie is favorited by user
        //If favorite is true, make 'Unfavorite' button
        //If favorite is false, make 'Favorite' button
    //If not part of list, make 'Add to List' button
}


var go_back = function(){
    //Go to main search page
    window.location.href = "search_page.html";
}