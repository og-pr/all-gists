//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.4b = ticketSys.gas (helpers)                                           */
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

function helper_checkDb() {
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }  
  var destFolder = DriveApp.getFolderById(psu[0]);
  var destFileId = destFolder.getFilesByName(psu[1]);
  if (!destFileId[0]) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, "no file"); return RT_TEXT_NO; }
  if (destFileId[0]) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, "file = " +destFileId[0]) ; return RT_FOUND}
}

function helper_checkPaid(aToken) {
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var searchKey = aToken;
  var queryString = '?status=<key_removed>token='+aToken+'&type=<type_removed>';
  var urlExec = ADDON_GET;
  var url = urlExec + queryString;
  var options =
      {
        "method"  : "GET",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  var result = UrlFetchApp.fetch(url, options);
  if (result.getResponseCode() == 200) {
    if (result==RT_TEXT_NO) {
      if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +RT_TEXT_NO); }
      return RT_TEXT_NO;
    } else {
      var a = result.getContentText();
      var arr = a.split(",");
      return [ arr[6], arr[7], arr[8], arr[9], arr[10], arr[11] ]
    }
  }
}

function helper_findColumn(aFile, aColumnId, aKeyword) {
  var ss = SpreadsheetApp.openById(aFile)
  var sheet = ss.getSheetByName(ADDON_USERS_SHEET);
  var lastRow = sheet.getLastRow();
  var column = sheet.getRange(aColumnId + ":" + aColumnId);
  var data = column.getValues(); 
  var row = 1;
  while ( row <= lastRow ) {
    if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +row); }
    if (data[row] == aKeyword) {
      Logger.log(LOGGER_ADDON_PREFIX +RT_TEXT_YES);
      Logger.log(LOGGER_ADDON_PREFIX +data[row]);
      return row+1;
    } else {
      if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +RT_TEXT_NO); }
    }
    row++;
  }
}

function helper_findInRow(aFile, aKeyword) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var rows  = ss.getDataRange.getValues(); 
  for (var r=0; r<rows.length; r++) { 
    if ( rows[r].join("#").indexOf(aKeyword) !== -1 ) {
      return r+1;
    }
  }
  return RT_NOT_FOUND;
}

function helper_formSearch(value1,value2){
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssId = ss.getId();
  if(value1===SHEET_CONTACTS) { 
    ss.getSheetByName(SHEET_CONTACTS).getRange(SHEET_MAIN_CELL).activate();
  }
  if(value1===SHEET_CLIENTS) { 
    ss.getSheetByName(SHEET_CLIENTS).getRange(SHEET_MAIN_CELL).activate();
  }
  if(value1===SHEET_ORDERS) { 
    ss.getSheetByName(SHEET_ORDERS).getRange(SHEET_MAIN_CELL).activate();
  }
  var db = lib_dbSearch(ssId, value1, value2);
  if (db === RT_TEXT_NO) {
    if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, RT_TEXT_NO); }
    return RT_TEXT_NO;
  } else {
    return [value1, db]
    }
}

function helper_localLogger(prefix, aFile, aMsg) {
  var formattedDate = Utilities.formatDate(new Date(), 'PST', 'yyyy-MM-dd_HH:mm:ss');
  var ss = SpreadsheetApp.openById(aFile).getSheetByName(SHEET_LOG);
  var lastRow = ss.getLastRow();
  var range = ss.getRange(SHEET_MAIN_RANGE);
  if (lastRow >= 400) {
    range.clearContent();
  } else {
    ss.appendRow([ formattedDate, prefix, aMsg]); 
  }
  return;
}

function helper_recordCounts() {   
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }
  var rows = lib_recordCounts(dbFile);
  return rows;
}

function helper_sheetActive(aSheet) {   
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if(aSheet===SHEET_CONTACTS) { 
    spreadsheet.getSheetByName(SHEET_CONTACTS).getRange(SHEET_MAIN_RANGE).setBackground(COLOR_WHITE);
    spreadsheet.getSheetByName(SHEET_CONTACTS).getRange(SHEET_MAIN_CELL).activate();
    if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, SHEET_CONTACTS); }
    return;
  } 

  if(aSheet===SHEET_CLIENTS) { 
    spreadsheet.getSheetByName(SHEET_CLIENTS).getRange(SHEET_MAIN_RANGE).setBackground(COLOR_BLUE_LITE);
    spreadsheet.getSheetByName(SHEET_CLIENTS).getRange(SHEET_MAIN_CELL).activate();
    if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, SHEET_CLIENTS); }
    return;
  } 

  if(aSheet===SHEET_ORDERS) { 
    spreadsheet.getSheetByName(SHEET_ORDERS).getRange(SHEET_MAIN_RANGE).setBackground(COLOR_GREEN_LITE);
    spreadsheet.getSheetByName(SHEET_ORDERS).getRange(SHEET_MAIN_CELL).activate();
    if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, SHEET_ORDERS); }
    return;
  } 

  if(aSheet===SHEET_VIEW) { 
    spreadsheet.getSheetByName(SHEET_VIEW).getRange(SHEET_MAIN_RANGE).setBackground(COLOR_WHITE);
    spreadsheet.getSheetByName(SHEET_VIEW).getRange(SHEET_MAIN_CELL).activate();
    if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, SHEET_VIEW); }
    return;
  } 
}

function helper_sheetClear(aSheet) {   
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }  
  var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  lib_sheetClear(ssId,aSheet);
  helper_sheetActive(aSheet);
  return;
}

function helper_sheetCopy(aSheet) {   
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }  
  var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  lib_sheetCopy(dbFile,ssId,aSheet);
  helper_sheetActive(aSheet);
  return;
}

function helper_sheetSort(aSheet,aVar) {   
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }  
  var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  var aFile = ssId;
  lib_sheetSort(aFile,aSheet,aVar)
  return;
}

function helper_transpose(endRow,fullRow,aSheet,isHeader) {
  for (var i=0; i <endRow; i++){
    var aValue = fullRow[0][i];
    if (isHeader===1) { var aCell = aSheet.getRange(i+1,1).setValue(aValue); }
    if (isHeader===0) { var aCell = aSheet.getRange(i+1,2).setValue(aValue); }
  }
  return;
}

function helper_turnLogOff() {
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var userToken = psu[1];
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(PSU_LOG, '0');
  var new_userLog = userProperties.getProperty(PSU_LOG);
  var ss = SpreadsheetApp.openById(dbFile).getSheetByName(SHEET_CONFIG);
  var psuBackupLocal = ss.getRange("B11")
  psuBackupLocal.setValues([ [0] ]);
  var psuBackupRemote = setup_psuUpdateLog('logOff',userToken);
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, psuBackupRemote); }
  return new_userLog;
}

function helper_turnLogOn() {
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var userToken = psu[1];
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, aFunc); }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(PSU_LOG, '1');
  var new_userLog = userProperties.getProperty(PSU_LOG);
  var ss = SpreadsheetApp.openById(dbFile).getSheetByName(SHEET_CONFIG);
  var psuBackupLocal = ss.getRange("B11")
  psuBackupLocal.setValues([ [1] ]);
  var psuBackupRemote = setup_psuUpdateLog('logOn',userToken);
  if (userLog==1) { helper_localLogger(LOGGER_LOCAL_PREFIX, dbFile, psuBackupRemote); }
  return new_userLog;
}

function helper_viewRecord(aSheet, aRow) {
  var aFunc = arguments.callee.name;
  if (LOG_APP===1) { Logger.log(LOGGER_ADDON_PREFIX +aFunc); }
  var psu = setup_psuGet();
  var dbFile = psu[4];
  var userType = psu[6];
  var userLog = psu[9];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ss2 = ss.getSheetByName(SHEET_VIEW);   
  if(aSheet===SHEET_CONTACTS) {
    var ss1 = ss.getSheetByName(SHEET_CONTACTS);
    var lastColumn = ss1.getLastColumn();
    var rowHeader = ss1.getRange(1,1,1,lastColumn).getValues();
    var rowData = ss1.getRange(aRow,1,1,lastColumn).getValues();
    helper_sheetClear(SHEET_VIEW);   
    helper_transpose(lastColumn,rowHeader,ss2,1);
    helper_transpose(lastColumn,rowData,ss2,0);
  } 

  if(aSheet===SHEET_CLIENTS) {
    var ss1 = ss.getSheetByName(SHEET_CLIENTS);
    var lastColumn = ss1.getLastColumn();
    var rowHeader = ss1.getRange(1,1,1,lastColumn).getValues();
    var rowData = ss1.getRange(aRow,1,1,lastColumn).getValues();
    helper_sheetClear(SHEET_VIEW);   
    helper_transpose(lastColumn,rowHeader,ss2,1);
    helper_transpose(lastColumn,rowData,ss2,0);
  } 

  if(aSheet===SHEET_ORDERS) {
    var ss1 = ss.getSheetByName(SHEET_ORDERS);
    var lastColumn = ss1.getLastColumn();
    var rowHeader = ss1.getRange(1,1,1,lastColumn).getValues();
    var rowData = ss1.getRange(aRow,1,1,lastColumn).getValues();
    helper_sheetClear(SHEET_VIEW);   
    helper_transpose(lastColumn,rowHeader,ss2,1);
    helper_transpose(lastColumn,rowData,ss2,0);
  } 

  ss2.getRange('A2').activate();
  var rangeHeader = ss2.getRange("A:A");
  var rangeClean = ss2.getRange(SHEET_ALL_RANGE);
  rangeClean.setVerticalAlignment("middle");
  rangeClean.setHorizontalAlignment("left")  
  rangeClean.setFontFamily("Arial");
  rangeClean.setFontSize(DEFAULT_FONT_SIZE);
  rangeClean.setBorder(true,true,true,true,true,true,'white',null);
  rangeHeader.setFontWeight("bold");
  ss2.autoResizeColumn(1);
  ss2.autoResizeColumn(2);
  return;
}