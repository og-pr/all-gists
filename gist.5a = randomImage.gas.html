//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.5a = randomImage.gas                                                   */
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

var STATUS_INDEX = ['check', 'error'];
var FILE_ID = '<link_removed>';
var FOLDER_ID = '<link_removed>';
var LOG_FILE = '<link_removed>';
var RANDOM_SET = 'randomSet';
var RANDOM_IMAGE = 'randomImage';
var RT_TEXT_YES = 'FOUND';
var RT_TEXT_NO = 'NOT_found';
var RT_FOUND = '1';
var RT_NOT_OK = '-1';
var RT_NOT_FOUND = -1;
var RT_NULL = null;
var RT_EMPTY = '';
var RT_UNDEFINED = undefined;
var LOGME = 1;
var LOGGER_PREFIX = 'exec log... ';
var LOGGER_LOCAL = 'local test log... ';
var TEXT_OUTPUT_NOT_OK = ContentService.createTextOutput().setContent("-1");

function checkRequest(aTask, aToken) {
  if (LOGME===1) { Logger.log(LOGGER_PREFIX +arguments.callee.name); }
  var check = STATUS_INDEX.indexOf(aTask);
  if (check !== RT_NOT_FOUND) {
    if (aToken==='viaBrowser') { 
      var clientResult = doClientSide();
      return clientResult;
    }
    if (aToken==='viaCloud') { 
      var cloudResult = doCloudSide();
      return cloudResult;
    }
    if (aToken==='viaGas') { 
      var cloudResult = doGas();
      return cloudResult;
    }
  } else { 
    return RT_NOT_FOUND;
  }
}

function doClientSide() {
  var picData = psRandomSet_get();
  var output = ContentService.createTextOutput().setContent(JSON.stringify(picData));
  return output;
}

function doCloudSide() {
  var picData = getRandomPic();
  if (picData === undefined) { 
    var output = HtmlService.createHtmlOutput('<center><p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-style: normal; font-weight: 400; line-height: 20px;">404 error</center>');
    output.setTitle(RANDOM_IMAGE);
  } else {
    var output = HtmlService.createHtmlOutput('<center><iframe style="border-style: none; margin:20px; padding:0; border:none;" src="' +picData +'" width=800 height=600></iframe></center>');
    output.setTitle(RANDOM_IMAGE);
  }
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function doGas() {
  var picData = psRandomSet_get();
  if (picData === undefined) { 
    var html = HtmlService.createTemplateFromFile("Error").evaluate();
    html.setTitle("Error");
    return html; 
  } else {
    var html = HtmlService.createTemplateFromFile("Index").evaluate();
    html.setTitle(RANDOM_IMAGE);
    return html;
  }
}

function doGet(e) {
  if (LOGME===1) { Logger.log(LOGGER_PREFIX +arguments.callee.name); }
  var keyCounter = "counterKey";
  var ps = PropertiesService.getScriptProperties();
  var newUindex =  ps.getProperty(keyCounter);
  newUindex++
  ps.setProperty(keyCounter, parseInt(newUindex));
  var userTask = e.parameter.task;
  var userToken = e.parameter.token;
  var getResult = checkRequest(userTask, userToken);
  if (getResult === RT_NOT_FOUND) {
    return TEXT_OUTPUT_NOT_OK;     
  } else {
    return getResult;
  }
}

function flatten(arrayOfArrays){
  return [].concat.apply([], arrayOfArrays);
}

function getRandomPic() {
  var ps = PropertiesService.getScriptProperties();  
  var returnedArr = JSON.parse(ps.getProperty('numArr'));
  var item = returnedArr.splice(0, 1);
  if (item===0) { return undefined };
  ps.setProperty('numArr', JSON.stringify(returnedArr));
  var sh = SpreadsheetApp.openById(FILE_ID); 
  var rowId = 'B'+item;
  var value = sh.getRange(rowId).getValue();
  var fullUrl = "<link_removed>" +value +"/preview";
  return fullUrl;
}

function psRandomSet_get() {
  var keyRandom = RANDOM_SET;
  var ps = PropertiesService.getScriptProperties();
  var psData = ps.getProperty(keyRandom);
  var theData = JSON.parse(psData);
  ps.deleteProperty(keyRandom)
  var oneId = theData.splice(0, 1);
  ps.setProperty(keyRandom,  JSON.stringify(theData));
  return oneId;
}

function psRandomSet_save() {
  var keyRandom = RANDOM_SET;
  var sh = SpreadsheetApp.openById(FILE_ID); 
  var ss = sh.getSheetByName(RANDOM_SET);
  var lastRow = ss.getLastRow(); 
  var theRange = 'A1:A'+lastRow;
  var data = ss.getRange(theRange).getValues();
  var flatData = flatten(data);
  var ps = PropertiesService.getScriptProperties();
  ps.setProperty(keyRandom, JSON.stringify(flatData));
}

function uniqueArr_delete() {
  var ps = PropertiesService.getScriptProperties();
  ps.deleteProperty('numArr');
}

function uniqueArr_save() {
  var sh = SpreadsheetApp.openById(FILE_ID); 
  var ss = sh.getSheetByName('Sheet1');
  var lastRow = ss.getLastRow();
  var numDraw = 100 ;
  var numPool = lastRow ;
  var arr = []
  while(arr.length < numDraw){
      var randomnumber = Math.floor(Math.random()*numPool) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;    
  }
  var index = arr.indexOf(1);
  if (index > -1) {
    arr.splice(index, 1);
  }
  var ps = PropertiesService.getScriptProperties();
  ps.setProperty('numArr', JSON.stringify(arr));
}

function uniqueSet_delete() {
  var sh = SpreadsheetApp.openById(FILE_ID); 
  var ss = sh.getSheetByName(RANDOM_SET);
  ss.clear();
}

function uniqueSet_save() {
  var sh = SpreadsheetApp.openById(FILE_ID); 
  var ss1 = sh.getSheetByName('Sheet1');
  var ss2 = sh.getSheetByName(RANDOM_SET);
  ss2.clear();
  var lastRow = ss1.getLastRow();
  var numDraw = 100 ;
  var numPool = lastRow ;
  var arr = []
  while(arr.length < numDraw){
      var randomnumber = Math.floor(Math.random()*numPool) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;    
  }
  var index = arr.indexOf(1);
  if (index > -1) {
    arr.splice(index, 1);
  }
  for (var i in arr) {
    var rowId = 'B'+arr[i];
    var value = ss1.getRange(rowId).getValue();
    ss2.appendRow([value]);
  }
}