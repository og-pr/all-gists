//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.7b = codeIndex.gas (helper)                                            */
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

var SHEET_NAME = '';
var SHEET_HELPERS = 'helpers';
var SHEET_MAIN_RANGE = 'A2:Z500';
var STATUS_INDEX = [ <_an_index_> ];
var SHEET_FILE = '<_a_file_>';
var LOG_FILE = '';
var RT_TEXT_YES = 'FOUND';
var RT_TEXT_NO = 'NOT_found';
var RT_FOUND = '1';
var RT_NOT_OK = '-1';
var RT_NOT_FOUND = -1;
var RT_NULL = null;
var RT_EMPTY = '';
var RT_UNDEFINED = undefined;
var textOutputOk = ContentService.createTextOutput().setContent("ok");
var textOutputError = ContentService.createTextOutput().setContent("error");
var textOutputNotOk = ContentService.createTextOutput().setContent("-1");
var LOGME = 0;

function doGet(e) {
  var userTask = e.parameter.task;
  var userToken = e.parameter.token;
  var getResult = checkRequest(userTask, userToken);
  if (getResult === RT_NOT_FOUND) {
    return textOutputNotOk;    
  } else {
    var output = ContentService.createTextOutput().setContent(JSON.stringify(getResult));
    return output;
  }
  return;
}

function getJson(aSheet){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source_sheet = ss.getSheetByName(aSheet);
  if (source_sheet == null) {
    return RT_NOT_FOUND;
  }
  var rows = source_sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var obj = {};
  var result = [];
  var headers = values[0];
  var cols = headers.length;
  var row = [];
  for (var i = 1; i <= numRows - 1; i++) {
    var row = values[i];
    obj = {};
    for (var col = 0; col < cols; col++) {
      obj[headers[col]] = row[col];
    }
    result.push(obj);
    }
  return result; 
}

function checkRequest(aTask, aToken) {   
  var check = STATUS_INDEX.indexOf(aTask);
  if (check !== RT_NOT_FOUND) {    
    if (aTask==='<_a_task_>') {
      var dataFound = getJson(aToken);
      return dataFound;
      }
    } else {
    return RT_NOT_FOUND;
  }
}

