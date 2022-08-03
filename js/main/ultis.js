/**
 * Author: Sneaky
 * Date Created: 29/07/2022
 * todo check limit of input
 * @param {String} id
 * @returns query selector
 */
function querySeletorById(id) {
    return document.querySelector("#" + id);
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check limit of input
 * @param {Number} inputLength
 * @param {Number} min
 * @param {Number} max
 * @returns 1:valid / 0:invalid
 */
function checkLimitValue(inputVal, min, max) {
    return inputVal >= min && inputVal <= max ? 1 : 0;
}

function displayMessageSpan(spanId, message){
    querySeletorById(spanId).innerHTML = message;
    querySeletorById(spanId).style.display = "block";
}

function hideMessageSpan(spanId){
    querySeletorById(spanId).innerHTML = "";
    querySeletorById(spanId).style.display = "none";
}