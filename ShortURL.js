/**
202208 shorten url
*/
function BITLY_V4(URL, Token) {  
    var bitlyurl = "https://api-ssl.bitly.com/v4/shorten";
    var bitlyarr = [];
    if (Array.isArray(URL)){
        for (var i = 0; i < URL.length; i++) {
          if (URL[i] == "") {
            bitlyarr.push("Empty Cell");
            continue;
          }
         
        var l_url = URL[i].toString();
        var long_url = {
          long_url: l_url
        };
       
        var options = {
          headers: {Authorization: 'Bearer '+ Token},
          muteHttpExceptions: true,
          contentType: 'application/json',
          method: 'POST',
          payload : JSON.stringify(long_url)
        };
       
          var response = UrlFetchApp.fetch(bitlyurl, options);
          if (response.getResponseCode() == 200 || response.getResponseCode() == 201){
            var response_Json = JSON.parse(response.getContentText());
            var bitlyShort = response_Json.link;
            bitlyarr.push(bitlyShort);
          } else {
          bitlyarr.push(response.getContentText());
          }
      }
    } else{
    if (URL == "?") {
            return"--"
          }
        var long_url = {
          long_url: URL
        };
        var options = {
          headers: {Authorization: 'Bearer '+ Token},
          muteHttpExceptions: true,
          contentType: 'application/json',
          method: 'POST',
          payload : JSON.stringify(long_url)
        };
          var response = UrlFetchApp.fetch(bitlyurl, options);
          if (response.getResponseCode() == 200 || response.getResponseCode() == 201){
            var response_Json = JSON.parse(response.getContentText());
            var bitlyShort = response_Json.link;
            bitlyarr.push(bitlyShort);
          } else {
          bitlyarr.push(response.getContentText());
          }
      }
      return bitlyarr;
    }
