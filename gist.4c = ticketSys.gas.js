//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.4c = ticketSys.gas (routers)                                           */
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

function showAppAdmin() {
  var ui = HtmlService.createTemplateFromFile('s_appAdmin')
      .evaluate()
      .setTitle(UF_ADMIN)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showAppError() {
  var ui = HtmlService.createTemplateFromFile('s_appError')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showErrorFile() {
  var ui = HtmlService.createTemplateFromFile('s_errorFile')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showErrorToken() {
  var ui = HtmlService.createTemplateFromFile('s_errorToken')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showMainFunnel() {
  var ui = HtmlService.createTemplateFromFile('s_mainFunnel')
      .evaluate()
      .setTitle(TITLE_FUNNEL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
  return;
}
function showMainSettings() {
  var ui = HtmlService.createTemplateFromFile('s_mainSettings')
      .evaluate()
      .setTitle(UF_SETTINGS)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showMainSupport() {
  var ui = HtmlService.createTemplateFromFile('s_mainSupport')
      .evaluate()
      .setTitle(UF_SUPPORT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showNoAccess() {
  var ui = HtmlService.createTemplateFromFile('s_noAccess')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showSetup() {
  var ui = HtmlService.createTemplateFromFile('d_Setup')
      .evaluate()
      .setWidth(320)
      .setHeight(200)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(ui, UF_SETUP_COMPLETED);
  return;
}

function showSetupDone() {
  var ui = HtmlService.createTemplateFromFile('s_setupDone')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showSetupNeeded() {
  var ui = HtmlService.createTemplateFromFile('s_setupNeeded')
      .evaluate()
      .setTitle(TITLE_ALERT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showSupportAdmin() {
  var ui = HtmlService.createTemplateFromFile('s_supportAdmin')
      .evaluate()
      .setTitle(UF_SUPPORT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showUserFree() {
  var ui = HtmlService.createTemplateFromFile('s_userFree')
      .evaluate()
      .setTitle(TITLE_SIDEBAR)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}

function showUserPaid() {
  var ui = HtmlService.createTemplateFromFile('s_userPaid')
      .evaluate()
      .setTitle(TITLE_SIDEBAR)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
  return;
}