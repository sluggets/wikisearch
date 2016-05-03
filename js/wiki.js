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
      vals = ui.item.value;
      
    }
  });

  
  $("button").click(function() {
    console.log("nvalue on buttton: " + nvalue);
  });

  console.log(vals);
  /*$("#search-box").bind("keydown", function(event) {
    if (event.keyCode === $.ui.keyCode.TAB &&
        $(this).autocomplete("instance").menu.active)
    {
      event.preventDefault();
    }
  }).autocomplete({
      minLength: 2,
      source: function(request, response) {
        response($.ui.autocomplete.filter(
          hitchTerms, extractLast(request.term)));
      },
      focus: function() {
        return false;
      },
      select: function(event, ui) {
        var terms = split(this.value);
        terms.pop();
        terms.push(ui.item.value);
        terms.push("");
        this.value = terms.join(""); 
        return false;
      }
    });*/


    /*$.ajax( {
      url: "https://en.wikipedia.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
        action: "query",
        format: "json",
        list:   "search",
        srsearch:"dogs",
        srnamespace: "0",
        srprop:  "snippet" 
      },
      xhrFields: { withCredentials: true},
      success: function(response) {
        $(".results").html(JSON.stringify(response));
      }
    });*/

  
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
          "pan galactic gargle blaster", "perfectly normal beast",
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

//next two functions  borrowed from jquery ui 
// https://jqueryui.com/autocomplete/#multiple
function split(val)
{
  return val.split(/,\s*/);
}

function extractLast(term)
{
  return split(term).pop();
}
