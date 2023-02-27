let body = document.querySelector("body");
let themeSwitches = document.querySelectorAll("input");
console.log(themeSwitches);

themeSwitches.forEach((themeSwitch) => {
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      themeSwitch.checked = false;
      let className = body.getAttribute("class");
      body.classList.replace(className, themeSwitch.id);
    }
  });
});
