/* 
To add:
-button that picks the two colors randomly
-button to change the gradient from left-right to top-down
*/


let primary = document.querySelector("#primary");
let secondary = document.querySelector("#secondary");
let body = document.getElementsByTagName("body");
let colorTextDisplay = document.querySelector("#colorTextDisplay");

//Create and set the inital values for primary and secondary color variables
let primaryColorPicked = {r: 73, g: 241, b: 116}; 
let secondaryColorPicked = {r: 115, g: 165, b: 247};


//EVENT LISTENERS ===================================================================================
//Event listener for primary "left" color
primary.addEventListener("input", function(){
    primaryColorPicked = hexToRgb(primary.value);
    changeBackgroundColor();
})
//Event listener for secondary "right" color
secondary.addEventListener("input", function(){
    secondaryColorPicked = hexToRgb(secondary.value);
    changeBackgroundColor();
})


//FUNCTIONS =========================================================================================
//Builds the primary part of the rgba declaration
function buildPrimary() {
    let color = `rgb(${primaryColorPicked.r}, ${primaryColorPicked.g}, ${primaryColorPicked.b})`;
    return color;
}
//Builds the secondary part of the rgba declaration
function buildSecondary() {
    let color = `rgb(${secondaryColorPicked.r}, ${secondaryColorPicked.g}, ${secondaryColorPicked.b})`;
    return color;
}
//Builds the entire rgba declaration using buildPrimary() and buildSecondary()
function buildRgbColor() {
    let pri = `linear-gradient(to right, ${buildPrimary()}, ${buildSecondary()})`;
    return pri;
}
//Changes the style attribute of body to change the color, alse updates inner text of the h4 to display current values
function changeBackgroundColor() {
    body[0].style.background = buildRgbColor();
    colorTextDisplay.innerText = buildRgbColor();
}




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
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}