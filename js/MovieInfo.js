document.addEventListener("DOMContentLoaded", function(){
    //Function is called upon access of HTML page
    display_movie();
    
    //Back button to go back to search page event handler
    document.getElementById('back').onclick = go_back;
});

var display_movie = function() {
    
    id = window.localStorage.getItem("current_movie");
    user = window.localStorage.getItem("active_account");
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

    let in_list = false;
    let in_fav = 'false';
    //Get movie list
     if (localStorage.getItem("list_"+user)){
        console.log("Movie list exists");
        //Get movie to search through movies
        list = JSON.parse(window.localStorage.getItem("list_"+user));
        fav = JSON.parse(window.localStorage.getItem("fav_"+user));
        let i = 0;
        while (i < list.length){
            //Check if movie is already in list
            if (list[i] == id){
                //Movie exists, so create delete option button
                //ONLY if it is not favorited
                in_list = true;
                in_fav = fav[i];
                break;
            }
            i = i+1;
        }
        
    }
    else{
        console.log("No list made");
    }
    
    //Make button add to list or delete from list based on in_list boolean

    if(in_fav == 'true'){
        //Message saying in favorites before delete
        let workspace2 = document.getElementById("fav");
        workspace2.innerHTML = "";
        let hfav = document.createElement('h4');
        text = document.createTextNode('This movie is a favorite!')
    }
    if(in_list == false){
        //Make add button to append the new item to list
        let workspace2 = document.getElementById("add_del_button");
        workspace2.innerHTML = "";
        let hbut = document.createElement('button');
        text = document.createTextNode('Add to List');
        hbut.appendChild(text);
        workspace2.append(hbut);
        hbut.className += 'btn btn-primary btn-xl';
        hbut.type = 'submit';
        hbut.onclick = function() {add_to_list();};
    }
    else{
        //Movie is in list - delete button
        let workspace2 = document.getElementById("add_del_button");
        workspace2.innerHTML = "";
        let hbut = document.createElement('button');
        text = document.createTextNode('Delete from List');
        hbut.appendChild(text);
        workspace2.append(hbut);
        hbut.className += 'btn btn-primary btn-xl';
        hbut.type = 'submit';
        hbut.onclick = function() {del_from_list();};
    }
    
}

var add_to_list = function() {
    //The movie id will be the first in the list
    let list = [];
    let fav = [];
    let id_val = window.localStorage.getItem("current_movie");
    let user = window.localStorage.getItem("active_account");
    if (window.localStorage.getItem("list_"+user)){
        list = JSON.parse(window.localStorage.getItem("list_"+user));
    }
    if (window.localStorage.getItem("fav_"+user)){
        fav = JSON.parse(window.localStorage.getItem("fav_"+user));
    }
    len = list.length;
    list[len] = id_val;
    fav[Number(len)] = 'false';
    window.localStorage.setItem('list_'+user, JSON.stringify(list));
    window.localStorage.setItem('fav_'+user, JSON.stringify(fav));
    //Go back to the search page
    window.location.href = "search_page.html";
}

var del_from_list = function() {
    //The movie id is removed from the list
    let user = window.localStorage.getItem("active_account");
    let list = JSON.parse(window.localStorage.getItem("list_"+user));
    let id_val = window.localStorage.getItem("current_movie");
    let fav_val = JSON.parse(window.localStorage.getItem("fav_"+user));
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
    window.location.href = "search_page.html";
}


var go_back = function(){
    //Go to main search page
    window.location.href = "search_page.html";
}