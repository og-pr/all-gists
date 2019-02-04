//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.5c = randomImage.js                                                    */
//*                                                                                          */
//*    Copyright (c) 2018-2019 Otto Grajeda. All rights reserved.                            */
//*    Contact info: ottograjeda@gmail.com. See additional disclaimers below.                */
//*                                                                                          */
//*    NOTE 1: Code is NOT Open Source or Production Ready. It is working sample code.       */
//*    NOTE 2: For support or code questions search keywords @ Google or Stack Overflow.     */
//*                                                                                          */
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND       */
//*    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED         */
//*    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE                */
//*    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR       */
//*    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES        */
//*    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;          */
//*    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON        */
//*    ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT               */
//*    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS         */
//*    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.                          */
//*                                                                                          */
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */

var X = 1;
var COUNTER;
var UX_BOX = 'imageBox';
var UX_TOP = '#uxTopWorking';
var UX_WORKING = 'working...';
var URL_BASE = '<link_removed>';

function getRandom() {
  var cacheBuster = Math.round(new Date().getTime() / 1000);
  var aToken = 'viaBrowser';
  var urlRandom = URL_BASE+'?task=<key_removed>&token='+aToken+'&cb='+cacheBuster+'&type=get';
  var arrObj = jsonGet(urlRandom, success);
  if (arrObj===0) { 
    return; 
  } else {
    console.log('got data')      
    return
  }
};

function jsonGet(url, success) {
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = success;
  xhr.onerror= function(e) { 
    localStorage.setItem('h.gas', 'error');
    var validDiv1 = document.querySelector(UX_TOP);
    if(validDiv1){
      var text = validDiv1.textContent;
      validDiv1.textContent = '';
    }
    var elNotice = document.querySelector('#noticeError');
    elNotice.classList.remove("hide");
    return 0;   
    }
  xhr.send();
  return xhr;
};

function jsonUse(data) {
  if (data.length===undefined) {
    var elNotice = document.querySelector('#noticeError');
    elNotice.classList.remove("hide");
    return;
  } else {
    var randomItem = data[Math.floor(Math.random()*data.length)];
    var validDiv2 = document.getElementById(UX_BOX);
    if(validDiv2){
        var img = document.createElement("img");
        var imgUrl = '<link_removed>='+randomItem;
        img.src = imgUrl;
        img.onload = function () {
            validDiv2.appendChild(img);
            var elFair = document.querySelector('#noticeLegal');
            elFair.classList.remove("hide");
        }
      } else {
        console.log('error');
      }
    var validDiv1 = document.querySelector(UX_TOP);
    if(validDiv1){
        var text = validDiv1.textContent;
        validDiv1.textContent = '';
      } else {
        console.log('error');
      }
  }
}

function success (request) {
  var response = request.currentTarget.response || request.target.responseText;
  jsonUse(response);
  return 
};

// main
var validDiv1 = document.querySelector(UX_TOP);
if(validDiv1){
    var text = validDiv1.textContent;
    validDiv1.textContent = UX_WORKING;
  } else {
}
var theData = getRandom();