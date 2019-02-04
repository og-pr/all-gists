//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.2e = dataCapture.gas                                                   */
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

var LOGME = 0;
var LOG_FILE = '';
var LOGGER_PREFIX = 'log... ';
var TYPE_NEW = 'new';
var TYPE_SENT = 'sent_email';
var SHEET_CHECKED = 'checked';
var SHEET_INCOMING = 'incoming';
var SHEET_FILE = 'A_GOOGLE_SPREADSHEET';
var LOGGER_LOCAL = 'local test log... ';
var ADMIN_COMPANY = 'A_COMPANY_NAME';
var ADMIN_EMAIL = 'AN_EMAIL@A_DOMAIN.COM';
var ADMIN_REPLY = 'A_DIFFERENT_EMAIL@A_DOMAIN.COM';
var DATE_FORMAT = 'yyyy-MM-dd_HH:mm:ss';

function alertAdmin(aVar) {
  var adminEmail = ADMIN_EMAIL;
  try {
    var sub = 'NEW lead = ' +aVar;
    var msg = 'Check sheet';
    MailApp.sendEmail(adminEmail, sub, msg);
  } catch(error) {
    var msg = error.message;
    MailApp.sendEmail(adminEmail, 'error', msg);
  }
};

function alertSender(aVar) {
  var adminEmail = ADMIN_EMAIL;
  try {
    MailApp.sendEmail(aVar,
                      "Thank you for contacting us.",
                      "We will reply to your message shortly.", {
                      bcc: adminEmail,
                      replyTo: ADMIN_REPLY,
                      name: ADMIN_COMPANY
                      });
  } catch(error) {
    var msg = error.message;
    MailApp.sendEmail(adminEmail, 'error', msg);
  }
};

function doPost(e) {
  if (LOGME===1) { Logger.log(LOGGER_PREFIX +arguments.callee.name); }
  var done = jsonAppend(e);
  if (done==1) {
    var result = '{"Status": "success"}';
    var jsonOutput = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    return jsonOutput
    } else {
    var result = '{"Status": "error"}';
    var jsonOutput = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    return jsonOutput
    }
};

function emailCheck() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1"); 
  var lastRow = sheet.getLastRow();
  var new_id = "C"+lastRow;
  var cellValue = sheet.getRange(new_id).getValue();
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(emailPattern.test(cellValue) === false) {
    sheet.getRange(new_id).setFontColor("red");
  } else {
    var newUser = cellValue;
    try {
        contactsCheck(newUser);
      } catch(e) {
        Logger.log("ERROR = " + e);
      }
  }    
};

function emailClear() {
  var adminEmail = ADMIN_EMAIL;
  var ss = SpreadsheetApp.getActiveSpreadsheet();    
  var source_sheet = ss.getSheetByName(SHEET_INCOMING);
  var last_row = source_sheet.getLastRow();
  var source_range = source_sheet.getRange("A2"+":G"+(last_row+1));
  source_range.clearContent();
  var sub = 'data captured - ' +last_row;
  var msg = sub;
  MailApp.sendEmail(adminEmail, sub, msg);
};

function emailKeep() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();    
  var source_sheet = ss.getSheetByName(SHEET_INCOMING);
  var rows = source_sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues(); 
  var target_sheet = ss.getSheetByName(SHEET_CHECKED);
  var keepCount = 0;
  var keep = TYPE_NEW;
  for (var i = 1; i <= numRows - 1; i++) {
    var row = values[i];
    if (row[5] === keep) {
      keepCount++;
      var id = i+1;
      var rangeVar = "A"+id+":G"+id;
      var source_range = source_sheet.getRange(rangeVar);
      var last_row = target_sheet.getLastRow();
      var target_range = target_sheet.getRange("A"+(last_row+1)+":G"+(last_row+1));
      source_range.copyTo(target_range);
      source_range.clearContent();      
    }
  }
};

function emailProcess() {
  var formattedDate = Utilities.formatDate(new Date(), 'PST', DATE_FORMAT);
  var ss = SpreadsheetApp.getActiveSpreadsheet();    
  var source_sheet = ss.getSheetByName(SHEET_CHECKED);
  var rows = source_sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues(); 
  var found = 0;
  var check = TYPE_NEW;
  var sentEmail = TYPE_SENT;
  for (var i = 1; i <= numRows - 1; i++) {
    var row = values[i];
    if (row[5] === check) {
      var id = i+1;
      var rangeEmail = "B"+id;
      var rangeStatus = "F"+id;
      var rangeCompleted = "G"+id;
      var dataEmail = source_sheet.getRange(rangeEmail).getValue();
      alertAdmin(dataEmail);
      alertSender(dataEmail);
      source_sheet.getRange(rangeStatus).setValue(TYPE_SENT);
      source_sheet.getRange(rangeCompleted).setValue(formattedDate);
    }
  }
};

function jsonAppend(e) {
  if (LOGME===1) { Logger.log(LOGGER_PREFIX +arguments.callee.name); }
  var newRecord = TYPE_NEW;
  var formattedDate = Utilities.formatDate(new Date(), 'PST', DATE_FORMAT);
  try {
    var ss = SpreadsheetApp.openById(SHEET_FILE)
    var sheet = ss.getSheetByName(SHEET_INCOMING);
    sheet.appendRow([ formattedDate, e.parameter.Email, e.parameter.userPage, e.parameter.userLocation, e.parameter.userSession, newRecord ]);
    return 1;
    } catch(e){
    return -1;
  } 
};