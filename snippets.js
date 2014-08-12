/**
 Capitalize the first letter in each word
 Split it at : if necessary, then rejoin it
**/

function toTitleCase(str){
    return str.replace(/:/g," : ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/ : /g,":");
}


/**
    Format the date display MMM dd, YYYY 
**/
function formatDate(str){
    var d = new Date(str);
    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month_names_short[d.getMonth()] + " " + d.getDate() +", " + d.getFullYear();
}

/**
    Make the URL clickable inside a text string,
**/

function formatURL(str){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var split = str.split(" ");
    console.log("url", split)
    for(var i=0; i< split.length; i++){
        if(split[i].match(regex)){
            var text = split[i].split(".").slice(1).join(".").split("/")[0];
            var prepend = "";
            if(split[i].substring(0,4 == "http")){
                prepend = "";
            }else{
                prepend = "http://";
            }
            if(text.substr(-1) != "."){
                split[i] = '<a class=\'normal-link\' href=\"#\" onclick=\"javascript:window.open(\''+prepend+split[i]+'\',\'_blank\',\'location=yes\');\">'+text+'</a>';
            }else{
                split[i] = '<a class=\'normal-link\' href=\"#\" onclick=\"javascript:window.open(\''+prepend+split[i].slice(0,-1)+'\',\'_blank\',\'location=yes\');\">'+text.slice(0,-1)+'</a>';
            }
        }
    }        
    return split.join(" ");
}

/**
    Detect Phone Numbers and turn them into clickable links for mobile.
**/
function detectPhoneNumbers(str){
    var expression = /\b\(?\d{3}\)?[-\s.]?\d{3}[-\s.]\d{4}\b/i;
    var regex = new RegExp(expression);
    var split = str.split(" ");
    for(var i=0; i< split.length; i++){
        var text = split[i].split(".").slice(1).join(".").split("-")[0];
        if(split[i].match(regex)){
            split[i] = '<a class=\'normal-link\' href=\'tel:'+split[i].replace(/\D/g, "")+'\'>'+split[i]+'</a>';
        }
    }
    console.log("phone", split);
    return split.join(" ");
}

/**
    Round to x decimal places.
**/
function roundDown(val,sigDigits) {

    if(isInteger(sigDigits) && (val != undefined) && val != null){
        return val.toFixed(sigDigits);
    }else{
         return val;
    }
}

/**
    Tests to see if a value is an integer
**/
function isInteger(value) {
    var intRegex = /^\d+$/;
    if(intRegex.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
    Validate an email address
**/

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


/**
  Animate the color of a DOM element for a period of time.

  Usage:
  var moreButton = document.getElementById('moreButton');
  highlight(moreButton);

**/
function animate(opts, elem) {
  var start = new Date  
  var id = setInterval(function() {
    var timePassed = new Date - start
    var progress = timePassed / opts.duration
    if (progress > 1) progress = 1
    var delta = opts.delta(progress)
    opts.step(delta)
    if (progress == 1) {
      clearInterval(id);
      elem.style.backgroundColor = "transparent";
    }
  }, opts.delay || 10)
}
function linear(progress) {
  return progress
}

function highlight(elem) {
  var from = [4, 56, 168], to = [1, 58, 182]
  animate({
    delay: 10,
    duration: 1000,
    delta: linear,
    step: function(delta) {
      elem.style.backgroundColor = 'rgb(' +
        Math.max(Math.min(parseInt((delta * (to[0]-from[0])) + from[0], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[1]-from[1])) + from[1], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[2]-from[2])) + from[2], 10), 255), 0) + ')'
    }
  },
    elem)  
}


/**
  End Animate
**/


