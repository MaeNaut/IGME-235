window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

let offset = 1;
let bigString = "";
let resultURL = "";

function searchButtonClicked()
{
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?"

    let GIPHY_KEY = "tb9SsjJ7aWuKzDZ6QUSPi0RKRL3mGgWE";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    let rating = document.querySelector("#rating").value;
    if (rating != "") { url += "&rating=" + rating; }

    resultURL = url;
    offset = 1;
    bigString = "";
    document.querySelector("#right").scrollTop = 0;

    document.getElementById("rightplaceholder").style.display = 'none';

    console.log(url);

    getData(url);
}

function searchTrending()
{
    document.getElementById("rightplaceholder").style.display = 'none';

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/trending?"

    let GIPHY_KEY = "tb9SsjJ7aWuKzDZ6QUSPi0RKRL3mGgWE";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    let rating = document.querySelector("#rating").value;
    if (rating != "") { url += "&rating=" + rating; }

    resultURL = url;
    offset = 1;
    bigString = "";
    document.querySelector("#right").scrollTop = 0;

    document.getElementById("rightplaceholder").style.display = 'none';

    console.log(url);

    getData(url);
}

function showmoreButtonClicked()
{
    let limit = document.querySelector("#limit").value;
    offset += parseInt(limit);
    let url = resultURL + "&offset=" + offset;

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

    let results = obj.data;
    console.log("results.length = " + results.length);

    for (let i = 0; i < results.length; i++)
    {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image.jpg"
    
        let url = result.url;

        let line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title='${result.id}'/></a>`;
        line += `<button type="button" onclick="copyURL('${url}')"><i class="fa-solid fa-copy"></i></button></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

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