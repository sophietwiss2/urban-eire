// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();
 
// Header scroll shadow
window.addEventListener('scroll', function() {
  var header = document.getElementById('main-header');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
 
// Hamburger menu
var hamburger = document.getElementById('hamburger-btn');
var nav = document.getElementById('main-nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('nav-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}
 
// Weather API
var weatherBtn = document.getElementById('get-weather-btn');
if (weatherBtn) {
  var WEATHER_API_KEY = '2e82c8dfea62dd2313cc8b633fecbfa6';
 
  var outfitMap = {
    cold:  { text: 'Layer up! Try a Ditsy Bits Claddagh Knit Cardigan over a Slainte baby tee — cosy, stylish and very Irish.', link: 'ditsy-bits.html' },
    cool:  { text: 'Perfect weather for a Bound Apparel tracksuit or leggings set — comfortable and on-trend for campus.', link: 'bound-apparel.html' },
    mild:  { text: 'Great day for a Ditsy Bits Slainte tee with your favourite jeans — casual Irish style at its best.', link: 'ditsy-bits.html' },
    warm:  { text: 'Sun is out! Go for a Bound Apparel sports bra and leggings combo — fresh and ready for anything.', link: 'bound-apparel.html' },
    rainy: { text: 'Classic Irish weather! The Ditsy Bits Claddagh Knit Cardigan is your best friend today.', link: 'ditsy-bits.html' }
  };
 
  weatherBtn.addEventListener('click', function() {
    var city = document.getElementById('city-input').value.trim();
    var resultEl = document.getElementById('weather-result');
    var errorEl = document.getElementById('weather-error');
 
    errorEl.hidden = true;
    resultEl.hidden = true;
 
    if (!city) {
      errorEl.textContent = 'Please enter a city name.';
      errorEl.hidden = false;
      return;
    }
 
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + ',IE&units=metric&appid=' + WEATHER_API_KEY;
 
    fetch(url)
      .then(function(res) {
        if (!res.ok) { throw new Error('not ok'); }
        return res.json();
      })
      .then(function(data) {
        var temp = Math.round(data.main.temp);
        var isRain = data.weather[0].main.toLowerCase().indexOf('rain') > -1;
        var key;
        if (isRain) { key = 'rainy'; }
        else if (temp < 5) { key = 'cold'; }
        else if (temp < 12) { key = 'cool'; }
        else if (temp < 18) { key = 'mild'; }
        else { key = 'warm'; }
 
        var outfit = outfitMap[key];
        document.getElementById('weather-city-name').textContent = data.name;
        document.getElementById('weather-temp').textContent = temp + 'C';
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('weather-icon').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        document.getElementById('outfit-text').textContent = outfit.text;
        document.getElementById('outfit-link').href = outfit.link;
        resultEl.hidden = false;
      })
      .catch(function() {
        errorEl.textContent = 'Could not find that city. Try Dublin, Cork or Galway.';
        errorEl.hidden = false;
      });
  });
 
  var cityInput = document.getElementById('city-input');
  if (cityInput) {
    cityInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { weatherBtn.click(); }
    });
  }
}
 
// Newsletter form
var newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('nl-name');
    var email = document.getElementById('nl-email');
    var consent = document.getElementById('nl-consent');
    var nameErr = document.getElementById('nl-name-error');
    var emailErr = document.getElementById('nl-email-error');
    var valid = true;
 
    nameErr.textContent = '';
    emailErr.textContent = '';
    name.classList.remove('error');
    email.classList.remove('error');
 
    if (!name.value.trim()) {
      nameErr.textContent = 'Please enter your first name.';
      name.classList.add('error');
      valid = false;
    }
 
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailErr.textContent = 'Please enter a valid email address.';
      email.classList.add('error');
      valid = false;
    }
 
    if (!consent.checked) {
      alert('Please tick the consent box to subscribe.');
      valid = false;
    }
 
    if (valid) {
      document.getElementById('nl-success').hidden = false;
      newsletterForm.reset();
      setTimeout(function() {
        document.getElementById('nl-success').hidden = true;
      }, 5000);
    }
  });
}