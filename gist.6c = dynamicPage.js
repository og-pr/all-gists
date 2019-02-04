//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.6c = dynamicPage.js                                                    */
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
var THE_INDEX = 'index';
var H_INDEX = 'h.index';
var BLOG_INDEX = 'h.blogIndex';
var ARTICLE = '< a docFile >';
var URL_INDEX = '< a webApp >';
var URL_HELPER = '< a gasHelper >';
var UX_TOP = '#uxTopWorking';
var UX_WORKING = 'working...';
var UX_BOTTOM = '#uxBottomWorking';

function checkLs (aVar) {
  var exist = localStorage.hasOwnProperty(aVar);
  if( exist === true ) {
    return 1;
    } else { 
      COUNTER = X++;
      var timer = setTimeout( checkLs, 100, aVar );
      if (COUNTER===40) {
        var id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        return;
      }
    } 
}

function getBlogArticle() {
  var cacheBuster = Math.round(new Date().getTime() / 1000);
  var aToken = ARTICLE;
  var urlBlogIndex = URL_HELPER+'?task=<a taskType>token='+aToken+'&cb='+cacheBuster+'&type=get';
  var arrObj = jsonGet(urlBlogIndex, success2);
  if (arrObj===0) { 
    return; 
  } else {
    return; 
  }
}

function getIndex() {
  var cacheBuster = Math.round(new Date().getTime() / 1000);
  var theIndex = THE_INDEX;
  var urlIndex = URL_INDEX+'?task=<a taskType>&token='+theIndex+'&cb='+cacheBuster+'&type=get';
  var arrObj = jsonGet(urlIndex, success1);
  if (arrObj===0) { 
    return; 
  } else {
      var lsVar = H_INDEX;
      var checkIndex = checkLs(lsVar);
      return checkIndex;
  }
}

function jsonGet(url, success) {
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = success;
  xhr.onerror= function(e) { 
    localStorage.setItem('h.gas', 'error');
    var validDiv = document.querySelector(UX_TOP);
    if(validDiv){
      var text = validDiv.textContent;
      validDiv.textContent = '';
    }
    var elNotice = document.querySelector('#theNotice');
    elNotice.classList.remove("hide");
    return;   
    }
  xhr.send();
  return xhr;
};

function jsonSave(lsVar) {
  var jsonData = localStorage.getItem(lsVar);
  return jsonData;
}

function jsonUse(data) {
  var jsonRaw = data;
  if (jsonRaw.status==='error') {
    var validDiv = document.querySelector(UX_TOP);
    if(validDiv){
      var text = validDiv.textContent;
      validDiv.textContent = '';
    }
    var elNotice = document.querySelector('#theNotice');
    elNotice.classList.remove("hide");
    return;
  } else {
      var validDiv = document.querySelector(UX_TOP);
      if (validDiv) {
          var text = validDiv.textContent;
          validDiv.textContent = '';
  } 

  var jsonNested = jsonRaw;
  var jsonData = jsonNested.data;
  var jsonHero = jsonNested.data.heroall;
  var jsonContent = jsonNested.data.textall;
  var pagefn1 = doT.template(document.getElementById('template_aHero').text);
  document.getElementById('aHero').innerHTML = pagefn1(jsonHero);
  var pagefn2 = doT.template(document.getElementById('template_aHeading').text);
  document.getElementById('aHeading').innerHTML = pagefn2(jsonHero);
  var pagefn3 = doT.template(document.getElementById('template_aContent').text);
  document.getElementById('aContent').innerHTML = pagefn3(jsonContent); 
  }
}

var objClearEmpties = function removeFalsy(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (prop) {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

function objFilter(source, keys) {
   var newObject = {};
   keys.forEach(function(key) {
     newObject[key] = source[key]
   })
   return newObject
}

var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

function success1 (request) {
  var response = request.currentTarget.response || request.target.responseText;
  localStorage.setItem(H_INDEX, JSON.stringify(response));
};

function success2 (request2) {
  var response2 = request2.currentTarget.response || request2.target.responseText;
  jsonUse(response2);
};

var indexLs = localStorage.getItem(H_INDEX);
if (!indexLs) {
  var theIndex = getIndex();
}

var validDiv = document.querySelector(UX_TOP);
if(validDiv){
    var text = validDiv.textContent;
    validDiv.textContent = UX_WORKING;
  } 

var dataLs = localStorage.getItem(BLOG_INDEX);
if (!dataLs) {
    var theData = getBlogArticle();
    } else {
      var theData = getBlogArticle();
}