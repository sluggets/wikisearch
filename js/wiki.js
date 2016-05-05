$(document).ready(function() {
  //var value;
  $("#guide").click(function() {
    $(".search").toggle("fade");
    $(this).css("visibility", "hidden");
  });

  var nvalue;
  $("input").keyup(function() {
    nvalue = $(this).val();
  }).keyup();
  console.log("nvalue: " + nvalue);
  var hitchTerms = hitchhikerArray();
  var vals;
  $("#search-box").autocomplete({
    source: hitchTerms,
    select: function (event, ui) {
      console.log(ui.item.value);
      nvalue = ui.item.value;
      
    }
  });

 
  $("button").click(function() {
    var guideNode = document.getElementById("guide"); 
    if (guideNode && guideNode.parentNode)
    {
      guideNode.parentNode.removeChild(guideNode);    
    }
  
    var resultsNode = document.getElementById("results");
    while(resultsNode.firstChild)
    {
      resultsNode.removeChild(resultsNode.firstChild);
    }
    
    if (nvalue == "")
    {
      window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
    }
    else
    {
      nvalue = nvalue.trim();
      nvalue = nvalue.replace(/[^\w\s()]/gi, '');
    }
    console.log("nvalue on buttton: " + nvalue);
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
        action: "query",
        format: "json",
        list:   "search",
        srsearch: nvalue,
        srlimit: "5",
        srnamespace: "0",
        srprop:  "snippet" 
      },
      xhrFields: { withCredentials: true},
      success: function(response) {
        //$(".results").html(JSON.stringify(response));
        var wjarr = response["query"]["search"];
        var wikiTitle;
        var wikiSnippet;
        wjarr.forEach(function(val) {
          var keys = Object.keys(val);
          keys.forEach(function(key) {
            if (key == "title")
            {
              //console.log(val[key] + "\n"); 
              wikiTitle = val[key];
            }
            else if (key == "snippet")
            {
              //console.log(val[key] + "\n");
              wikiSnippet = val[key];
            }
          });
          
          buildWikiResult(wikiTitle, wikiSnippet);
});
      }
    });
  });



  
});

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

function buildWikiResult(title, snippet)
{
  var wikiUrl = "https://en.wikipedia.org/wiki/";
  var formattedTitle = title.replace(/\s/gi, "_");
  var newAnchor = document.createElement("a");
  var newHeader = document.createElement("h4");
  var newPara = document.createElement("p");
  var currentDiv = $("#results");
  var strippedSnippet = snippet.replace(/(<([^>]+)>)/ig, " "); 
  strippedSnippet += "...";
  /*var target = document.createAttribute("target");
  target.value = "_blank";*/

  snippetNode = document.createTextNode(strippedSnippet);
  titleNode = document.createTextNode(title);
  newHeader.appendChild(titleNode);
  newPara.appendChild(snippetNode);
  newAnchor.href = wikiUrl + formattedTitle;
  newAnchor.setAttribute("target", "_blank");
  newAnchor.appendChild(newHeader);
  newAnchor.appendChild(newPara);
  currentDiv.append(newAnchor);
}
