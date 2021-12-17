
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
// const currentTheme = localStorage.getItem('theme');
const currentTheme = getCookie('theme') || false;

if (currentTheme) {
  document.documentElement.setAttribute('class', currentTheme);

  if (currentTheme === 'dark-theme') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('class', 'dark-theme');
    // localStorage.setItem('theme', 'dark-theme');
    document.cookie = 'theme' + "=" + ('dark-theme' || "") + "; path=/ ;max-age=31536000";
  }
  else {        document.documentElement.setAttribute('class', 'light-theme');
  // localStorage.setItem('theme', 'light-theme');
  document.cookie = 'theme' + "=" + ('light-theme' || "") + "; path=/ ;max-age=31536000";

}
}

toggleSwitch.addEventListener('change', switchTheme, false);

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(".sale-block").hover(
  function() {
    var itms = $(this).find('.crystal');

    $.each(itms, function (index, div) {
        var randL = getRandomArbitrary(0,50);
        var randT = getRandomArbitrary(0,50);
        var randRot = getRandomArbitrary(-85,85);
        $(this).css({"transform": "translate("+randL+"%, "+randT+"%) rotate("+randRot+"deg)"});
    });

  },function() {
    var itms = $(this).find('.crystal');
    $.each(itms, function (index, div) {
        $(this).css({"transform": ""});
    });

  },
);



$(document).ready(function(){
    var scroll_start = 50;
    var startchange = $('.nav-om-bg');
    var offset = startchange.offset();
    if (length(window.location.href.split("/")) == 3) {
        if (startchange.length){
          $(document).scroll(function() {
            scroll_start = $(document).scrollTop();
            if(scroll_start > offset.top) {
              // $(".nav-om-bg").css('background-color', '#f0f0f0');
              startchange.addClass("nav-om-bg-c");
            } else {
              // $('.nav-om-bg').css('background-color', 'transparent');
              if (startchange.hasClass("nav-om-bg")) {
                startchange.removeClass("nav-om-bg-c");
              }
            }
          });
        }
    }
    else {
        startchange.addClass("nav-om-bg-c");
    }
});



async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      "X-CSRFToken": "IjEzYmUwNTAwYmRkNzlmMzM3NDZlNmFhZjY4YmI4N2RkMWZhN2NmZjki.Ybiugg.bqdhFX7LkzZUVzaSSpJASt4dsEg"

    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}





$(document).ready(function() {
  $('.selector').niceSelect();
});

function request(url,data) {

  var out = '';
  $.ajax({
    url: url,
    type: 'POST',
    data: data,
    async:false,
    success: function (datas) {
      //wacky nested anonymous callbacks go here
      out = datas;
    }
    // error: function (jqXHR, textStatus, errorThrown) {
    //     // Empty most of the time...
    // }
  });

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", "IjEzYmUwNTAwYmRkNzlmMzM3NDZlNmFhZjY4YmI4N2RkMWZhN2NmZjki.Ybiugg.bqdhFX7LkzZUVzaSSpJASt4dsEg")
      }
    }
  });

  return out;

}



// tooltip
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
// dark-mode

//
// // Select the button
// const btn = document.getElementById("theme-switcher");
// // Select the theme preference from localStorage
// const currentTheme = localStorage.getItem("theme");
//
// // If the current theme in localStorage is "dark"...
// if (currentTheme == "dark") {
//   // ...then use the .dark-theme class
//   document.body.classList.add("dark-theme");
// }
//
// // Listen for a click on the button
// btn.addEventListener("click", function() {
//   // Toggle the .dark-theme class on each click
//   document.body.classList.toggle("dark-theme");
//
//   // Let's say the theme is equal to light
//   let theme = "light";
//   // If the body contains the .dark-theme class...
//   if (document.body.classList.contains("dark-theme")) {
//     // ...then let's make the theme dark
//     theme = "dark";
//   }
//   // Then save the choice in localStorage
//   localStorage.setItem("theme", theme);
// });

function num_word(value, words){
  value = Math.abs(value) % 100;
  var num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num == 1) return words[0];
  return words[2];
}

