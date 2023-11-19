window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

// let displayTerm = "";
let offset = 1;
let bigString = "";

function searchButtonClicked()
{
    document.getElementById("rightplaceholder").style.display = 'none';

    console.log("searchButtonClicked() called");
    
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?"

    let GIPHY_KEY = "tb9SsjJ7aWuKzDZ6QUSPi0RKRL3mGgWE";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    // displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    let rating = document.querySelector("#rating").value;
    if (rating != "") { url += "&rating=" + rating; }

    offset = 1;
    bigString = "";
    document.querySelector("#right").scrollTop = 0;

    // document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);
}

function showmoreButtonClicked()
{
    console.log("showmoreButtonClicked() called");
    
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?"

    let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    // displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    let rating = document.querySelector("#rating").value;
    if (rating != "") { url += "&rating=" + rating; }
    
    offset += parseInt(limit);
    url += "&offset=" + offset;

    // document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);
}

function getData(url)
{
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

// Callback Functions

function dataLoaded(e)
{
    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    // if (!obj.data || obj.data.length == 0)
    // {
    //     document.querySelector("#status").innerHTML = "<b>No result found for '" + displayTerm + "'</b>";
    //     return;
    // }

    let results = obj.data;
    console.log("results.length = " + results.length);

    for (let i = 0; i < results.length; i++)
    {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png"
    
        let url = result.url;

        let line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title='${result.id}'/></a>`;
        line += `<button type="button" onclick="copyURL('${url}')"><i class="fa-solid fa-copy"></i></button></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    // document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    document.querySelector("#showmore").style.display = "block";
}

function dataError(e)
{
    console.log("An error occurred");
}

function copyURL(e)
{
    navigator.clipboard.writeText(e);
}