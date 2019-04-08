// run script on window load
window.addEventListener("load", () => {
  let long; //longitude
  let lat; //latitude
  let tempDescription = document.querySelector(".ui-degree-description");
  let tempSection = document.querySelector(".ui-convert-value");
  let tempDegree = document.querySelector(".ui-temperature-degree");
  let locationTimeZone = document.querySelector(".ui-location-timezone");
  let tempDegreeStandard = document.querySelector(".ui-degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/762bda02604c40ba30dec04f105c08c0/${lat},${long}`;

      console.log(api);

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          document.querySelector(".ui-main-wrapper").style.display = "block";
          return data;
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // Changing DOM elemets after api is fetched
          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          seticons(icon, document.querySelector(".icon"));

          tempSection.addEventListener("click", () => {
            if (tempDegreeStandard.textContent === "F") {
              tempDegreeStandard.textContent = "C";
              tempDegree.textContent = ((temperature - 32) / 1.8).toFixed(2);
              document.querySelector(".ui-convert-value").textContent =
                "Convert to Fahrenheit!";
            } else {
              tempDegreeStandard.textContent = "F";
              tempDegree.textContent = temperature;
              document.querySelector(".ui-convert-value").textContent =
                "Convert to Celsius!";
            }
          });
        });
    });
  }

  function seticons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
