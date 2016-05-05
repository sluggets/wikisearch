$(document).ready(function() {
  // fades out book image, fades in search box
  $("#guide").click(function() {
    $(".search").toggle("fade");
    $(this).css("visibility", "hidden");
  });

  // variable to hold search value
  var searchValue;

  // tracks search entry by key,
  // adds to search value
  $("input").keyup(function() {
    searchValue = $(this).val();
  }).keyup();

  // uses function to load up array of string
  // values for Hitchhiker's Guide-centric
  // autocomplete
  var hitchTerms = hitchhikerArray();

  // implements autocomplete to search box
  // adds autocomplete value to search value
  $("#search-box").autocomplete({
    source: hitchTerms,
    select: function (event, ui) {
      searchValue = ui.item.value;
    }
  });

 
  // After clicking "enter", many things happen
  $("button").click(function() {
    // removes book image from page, so that the
    // search box slides up, making room for search results
    var guideNode = document.getElementById("guide"); 
    if (guideNode && guideNode.parentNode)
    {
      guideNode.parentNode.removeChild(guideNode);    
    }
  
    // if there are results currently displayed, and
    // and another search is made, removes old search results
    var resultsNode = document.getElementById("results");
    while(resultsNode.firstChild)
    {
      resultsNode.removeChild(resultsNode.firstChild);
    }
    
    // if search is made with empty input, navigate
    // to random wikipedia article page, otherwise
    // clean up string submitted by user to make search
    if (searchValue == "")
    {
      window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
    }
    else
    {
      searchValue = searchValue.trim();
      searchValue = searchValue.replace(/[^\w\s()]/gi, '');
    }

    // makes the api request with user's search string
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
        action: "query",
        format: "json",
        list:   "search",
        srsearch: searchValue,
        srlimit: "5",
        srnamespace: "0",
        srprop:  "snippet" 
      },
      xhrFields: { withCredentials: true},
      success: function(response) {
        // grabs search result object
        var wikiArray = response["query"]["search"];

        // variables to hold article title
        // and article snippet
        var wikiTitle;
        var wikiSnippet;

        // loops through to grab title and
        // snippet for each search result
        wikiArray.forEach(function(val) {
          var keys = Object.keys(val);
          keys.forEach(function(key) {
            if (key == "title")
            {
              wikiTitle = val[key];
            }
            else if (key == "snippet")
            {
              wikiSnippet = val[key];
            }
          });
          
          // builds and adds to DOM search results
          buildWikiResult(wikiTitle, wikiSnippet);
        });
      }
    });
  });


  // mini portfolio navigation
  $('#ab').click(function(){
    $('#about').toggle(600);
  });
 
  $('#pr').click(function(){
    $('#projects').toggle(600);
  });

  $('#ti').click(function(){
    $('#timpic').toggle(600);
  });

  
});

// simple function to return array of HGTTG themed
// autocomplete values
function hitchhikerArray()
{
  return ["42 (number)", "adams douglas", "arthur dent",
          "babel fish", "beeblebrox", "brockian ultra-cricket",
          "damogran", "deep thought",  
          "dentrassi","douglas adams",
          "encyclopedia galactica", "gargravarr",
          "great green arkleseizure", "heart of gold",
          "hitchiker's guide to the galaxy", "hooloovoo",
          "infinite probability drive", "jatravartids",
          "jeltz, prostetnic vogon", "marvin", "mcmillan, tricia",
          "old thrashbarg", "old pink dog bar", 
          "pan galactic gargle blaster", "paranoid android",
          "perfectly normal beast",
          "peril sensitive sunglasses", "prefect, ford",
          "ravenous bugblatter beast of traal", 
          "silastic armorfiends of striterax",
          "sirius cybernetics corporation", "slartibartfast",
          "slo-time envelope", "starship titanic",
          "sub etha sens-o-matic", "thumb", 
          "total perspective vortex", "towel", "tragula, trin",
          "trillian", "viltvodle six", "vogon",
          "vogon constructor fleet", "vogons", "vroomfondel",
          "whole sort of general mish-mash", "wonko the sane",
          "zarquon" ];
}

// builds and adds to DOM search results
function buildWikiResult(title, snippet)
{
  // first part of wiki article link url
  var wikiUrl = "https://en.wikipedia.org/wiki/";

  // create a formatted title with underscores to
  // add to wikiURL, thus creating a valid wikipedia
  // article url
  var formattedTitle = title.replace(/\s/gi, "_");

  // creates <a> html tag to link to wikipedia article
  // from results
  var newAnchor = document.createElement("a");

  // creates <h4> html tag to hold the Wiki title
  var newHeader = document.createElement("h4");

  // creates <p> html tag to hold the wiki snippet
  var newPara = document.createElement("p");

  // grab results <div> to append new result anchor later
  var currentDiv = $("#results");

  // mediawiki returns snippet strings full of <span> elements
  // for some reason. This strips them out to display clean
  // snippet
  var strippedSnippet = snippet.replace(/(<([^>]+)>)/ig, " "); 
  var strippedSnippet = strippedSnippet.replace(/(&quot;)/ig, "\"");

  // mediawiki snippets end abruptly, presentation looks
  // like an error. This adds ellipses to communicate the
  // snippet is to be continued if you follow the link
  strippedSnippet += "...";

  // creates and assembles all the html elements
  snippetNode = document.createTextNode(strippedSnippet);
  titleNode = document.createTextNode(title);
  newHeader.appendChild(titleNode);
  newPara.appendChild(snippetNode);

  // sets href to proper wikipedia article url
  newAnchor.href = wikiUrl + formattedTitle;

  // makes the links open in new page
  newAnchor.setAttribute("target", "_blank");

  // adds a bootstrap class
  newAnchor.setAttribute("class", "list-group-item");

  // build the <a> link with all nested content
  newAnchor.appendChild(newHeader);
  newAnchor.appendChild(newPara);

  // add it all to the DOM !!
  currentDiv.append(newAnchor);
}
