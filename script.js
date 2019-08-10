/* 
To add:
-button that picks the two colors randomly - DONE
-button to change the gradient from left-right to top-down -DONE
*/

//DOM ELEMENTS ======================================================================================
let primary = document.querySelector("#primary");
let secondary = document.querySelector("#secondary");
let body = document.getElementsByTagName("body");
let colorTextDisplay = document.querySelector("#colorTextDisplay");
let gradientDirectionSelection = document.querySelector(
  "#gradientDirectionSelection"
);
const randomButton = document.querySelector("#randomColors");

let variables = {
  color1: "rgb(73, 241, 116)",
  color2: "rgb(115, 165, 247)",
  direction: "to right"
};

const createRgb = obj => {
  return `rgb(${obj.r}, ${obj.g}, ${obj.b})`;
};

//EVENT LISTENERS ===================================================================================
//Event listener for primary "left" color
primary.addEventListener("input", function() {
  variables.color1 = createRgb(hexToRgb(primary.value));
  changeBackgroundColor();
});
//Event listener for secondary "right" color
secondary.addEventListener("input", function() {
  variables.color2 = createRgb(hexToRgb(secondary.value));
  changeBackgroundColor();
});
//Event listener for gradient direction
gradientDirectionSelection.addEventListener("input", () => {
  variables.direction = gradientDirectionSelection.value;
  changeBackgroundColor();
});
randomButton.addEventListener("click", () => {
  variables.color1 = randomizeColor();
  variables.color2 = randomizeColor();
  changeBackgroundColor();
  primary.value = fullColorHex(variables.color1);
  secondary.value = fullColorHex(variables.color2);
});

//Changes the style attribute of body to change the color, alse updates inner text of the h4 to display current values
const changeBackgroundColor = () => {
  body[0].style.background = `linear-gradient(${variables.direction}, ${
    variables.color1
  }, ${variables.color2})`;
  colorTextDisplay.innerText = `linear-gradient(${variables.direction}, ${
    variables.color1
  }, ${variables.color2})`;
};
const randomizeColor = () => {
  colorObject = { r: 0, g: 0, b: 0 };
  Object.keys(colorObject).forEach(el => {
    colorObject[el] = Math.round(Math.random() * 255);
  });
  return `rgb(${colorObject.r}, ${colorObject.g}, ${colorObject.b})`;
};

//CODE TO CONVERT HEX TO RGB ===========================================================================
/**
 * hexToRgb
 * @param  string hex Hexadicimal value
 * @return number     description
 * @usage  //alert(hexToRgb("#0033ff").g); // "51"
 * @usage  //alert(hexToRgb("#03f").g);    // "51"
 * @usage  //alert(hexToRgb("0033ff").g);  // "51"
 * @usage  //alert(hexToRgb("03f").g);     // "51"
 */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
//CONVERT RGB TO HEX
var rgbToHex = function(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};
var fullColorHex = function(string) {
  rgbStr = string.match(/\d+/g).map(Number);
  var red = rgbToHex(rgbStr[0]);
  var green = rgbToHex(rgbStr[1]);
  var blue = rgbToHex(rgbStr[2]);
  return `#${red}${green}${blue}`;
};
