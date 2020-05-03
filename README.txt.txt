Mobile Apps Final Project README File
Lillian Boettcher

Project Overview:

The files are made to be contained within a single folder to be accessed by an Android device or emulator
to form an Android mobile application. The project is originally tested using Android emulator and Cordova.

There are 5 primary HTML pages and JavaScript files, with an additional JS file for allowing viewing of CSS
features and CSS provided by the Freelancer Starter Bootstrap template.

Screen 1: Login and Sign Up

-index.html
-LoginSignUp.js
   -sign_up: creates output dialog for taking in sign up input from the username and password boxes and logs in the
    user and creates their account upon a successful sign up
   -log_in: creates output dialog for taking in login input from the username and password boxes and logs in the
    user if their username and password match an already existing account

Screen 2: Search Page

-search_page.html
-MovieSearch.js:
   -search_movie: takes in the input from the title (required), type, and year input boxes of the HTML file to
    create an API call and print results from that call; if there are more pages of results in the API call, a
    button is created to allow for showing the next page
   -print_results: called if the button for showing more results is clicked and displays the next page of the API
    call as well as creates another button to call itself if there are more movie pages in the API call

Screen 3: Movie Information from Search

-movie_info.html
-MovieInfo.js:
   -display_movie: displays the information of a selected movie from the search page and creates a button by calling
    the add_to_list or del_from_list functions, depending on whether or not the movie is part of the user's favorite
    movies list
   -add_to_list: adds the displayed movie to the user's list and goes back to the search page
   -del_from_list: deletes the displayed movie from the user's list and goes back to the search page

Screen 4: Movie List

-movie_list.html
-MovieList.js:
   -display_list: displays all of the movies in the user's movie list with title, year, and type like on the search
    page; if there are no movies to list, then there is text informing the user that they have no movies in their list

Screen 5: Movie Information from Movie List Item

-movie_list_info.html
-MovieListItem.js:
   -display_movie: displays movie information, including the movie poster, from an API call of the movie's id of the
    movie selected in the movie list
   -del_from_list: deletes the selected movie from the list and goes back to the movie list page, with the movie removed
    from the page


Bootstrap template: https://startbootstrap.com/themes/freelancer/