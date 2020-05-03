document.addEventListener("DOMContentLoaded", function(){
    //Function is called upon access of HTML page
    display_movie();
    
    //Back button to go back to search page event handler
    document.getElementById('back').onclick = go_back;
    document.getElementById('del').onclick = del_from_list;
});

var display_movie = function() {
    
    let id = window.localStorage.getItem("current_movie");
    let loc = window.localStorage.getItem("current_movie_loc");
    let user = window.localStorage.getItem("active_account")
    let api = 'https://www.omdbapi.com/?i='+id+'&apikey=4e9f6bff';
    let fav_in = JSON.parse(window.localStorage.getItem("fav_"+user));
    
    let fav = fav_in[Number(loc)];

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
        
        if (fav == 'true'){
            //Saying the movie is a favorite if it is a favorite
            let hfav = document.createElement('h4');
            text = document.createTextNode('This is a favorite!');
            hfav.appendChild(text);
            workspace.append(hfav);
        }
        
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
        
        //Favorite or unfavorite button
        let workspace2 = document.getElementById("fav");
        workspace2.innerHTML = "";
        let hbut = document.createElement('button');
        if(fav=='true'){
            text = document.createTextNode('Unfavorite');
            hbut.appendChild(text);
            workspace2.append(hbut);
            hbut.className += 'btn btn-primary btn-xl';
            hbut.type = 'submit';
            hbut.onclick = function() {del_from_favorite();};
        }
        else{
            text = document.createTextNode('Favorite');
            hbut.appendChild(text);
            workspace2.append(hbut);
            hbut.className += 'btn btn-primary btn-xl';
            hbut.type = 'submit';
            hbut.onclick = function() {add_to_favorite();};
        }
        
    });
    
}

var add_to_favorite = function() {
    //Turning favorite setting from false to true
    let loc = localStorage.getItem("current_movie_loc");
    let user = window.localStorage.getItem("active_account");
    let fav = JSON.parse(window.localStorage.getItem("fav_"+user));
    fav[Number(loc)] = 'true';
    window.localStorage.setItem('fav_'+user, JSON.stringify(fav));
    //Reload page
    window.location.href = "movie_list_info.html";
}

var del_from_favorite = function() {
    //Turning favorite setting from true to false
    let loc = localStorage.getItem("current_movie_loc");
    let user = window.localStorage.getItem("active_account");
    let fav = JSON.parse(window.localStorage.getItem("fav_"+user));
    console.log(fav);
    fav[Number(loc)] = 'false';
    window.localStorage.setItem('fav_'+user, JSON.stringify(fav));
    //Reload page
    window.location.href = "movie_list_info.html";
}

var del_from_list = function() {
    //The movie id is removed from the list
    let user = window.localStorage.getItem("active_account");
    let list = JSON.parse(window.localStorage.getItem("list_"+user));
    let id_val = window.localStorage.getItem("current_movie");
    let fav = JSON.parse(window.localStorage.getItem("fav_"+user));
    //Find the movie to delete and delete it
    let i = 0;
    while (i < list.length){
        if (list[i] == id_val){
            //Remove list item
            list.splice(i, 1);
            fav.splice(i,1);
            break;
        }
        i = i + 1;
    }
    window.localStorage.setItem('list_'+user, JSON.stringify(list));
    window.localStorage.setItem('fav_'+user, JSON.stringify(fav));
    //Go back to the search page
    window.location.href = "movie_list.html";
}


var go_back = function(){
    //Go to main search page
    window.location.href = "movie_list.html";
}