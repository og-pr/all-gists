//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.2d = dataCapture.js                                                    */
//*                                                                                          */
//*    Copyright (c) 2018-2019 Otto Grajeda. All rights reserved.                            */
//*    Contact info: ottograjeda@gmail.com. See additional disclaimers below.                */
//*                                                                                          */
//*    NOTE 1: Portions of code (mainly API methods) are copyrighted by Google LLC.          */
//*    NOTE 2: Code is NOT Open Source or Production Ready. It is working sample code.       */
//*    NOTE 3: For support or code questions search keywords @ Google or Stack Overflow.     */
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

var formEl1 = document.getElementById('form1');
var formUi1 = document.getElementById('error1');

function retryPOST(url, formData, successCallback) {
  fetch(url, {
    method: 'post',
    headers: {
    },
    redirect: 'follow',
    body: formData
  }).then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    formUi1.innerHTML = '';
    formEl1.innerHTML = "<div class='formFeedback1 inheritText' id='inputFeedback1'><p> Thank you !</p><p><img width='25px height='25px id='checkmark' src='../../images/ctk-checkmark.svg' /><br><p><br></div>";
    localStorage.setItem('h.form', 'sent');
    successCallback();
  })
  .catch(function (err) {
    formUi1.innerHTML = '';
    formEl1.innerHTML = "<div class='formFeedback1 inheritText' id='inputFeedback1' style='color: #FF0000'><p>Sorry... Server Error. Please try again.</p></div>";
  })
}

formEl1.addEventListener('submit', function (e) {
  var formInput1 = document.getElementById('email').value;
  var formInput2 = document.getElementById('userpage').value;
  localStorage.setItem('h.email', formInput1);
  localStorage.setItem('h.page', formInput2);
  var dataEmail = localStorage.getItem('h.email');
  var dataPage = localStorage.getItem('h.page');
  var dataSession = localStorage.getItem('h.session');
  var dataLocation = localStorage.getItem('h.location');
  var formData = new FormData();
  formData.append('Email', dataEmail);
  formData.append('userPage', dataPage);
  formData.append('userSession', dataSession);
  formData.append('userLocation', dataLocation);
  var object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);
  formUi1.innerHTML = '';
  formEl1.innerHTML = "<div class='formFeedback1 loader' id='inputFeedback1'><p> . </p></div>";
  var url = '<url_removed>';
  fetch(url, {
    method: 'post',
    headers: {
    },
    redirect: 'follow',
    body: formData
  }).then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    formUi1.innerHTML = '';
    formEl1.innerHTML = "<div class='formFeedback1 inheritText' id='inputFeedback1'><p> Thank you !</p><p><img width='25px height='25px id='checkmark' src='../../images/ctk-checkmark.svg' /><br><p><br></div>";
    localStorage.setItem('h.form', 'sent');
  })
  .catch(function (err) {
    formUi1.innerHTML = '';
    formEl1.innerHTML = "<div class='formFeedback1 inheritText' id='inputFeedback1' style='color: #FF0000'><p>Sorry... Server Error. Please try again.</p></div>";
    localStorage.setItem('h.form', 'fail');
    var start = (new Date()).getTime();
    var intervalId = setInterval(function() {
      var now = (new Date()).getTime();
      if (now > (start + 10*60*1000)) {
        clearInterval(intervalId);
        return
      }
      retryPOST(url, formData, function() {
        clearInterval(intervalId);
      })
    }, 2*60*1000)
  })
  e.preventDefault();
});

var requiredComponents = document.querySelectorAll('[required]')
requiredComponents.forEach(function (e) {
  e.removeAttribute('required')
});

document.getElementById('cta1-bottom').addEventListener('click', function () {
  requiredComponents.forEach(function (e) {
    e.setAttribute('required', true)
  })
});

document.getElementById('form1').addEventListener('submit', function () {
  requiredComponents.forEach(function (e) {
    e.setAttribute('required', true)
  })
});