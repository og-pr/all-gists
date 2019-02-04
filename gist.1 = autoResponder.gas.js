//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.1 = autoResponder.gas                                                  */
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

var arrName = ["Sales", "Info"]
var arrLabel = ["salesLabel","infoLabel"]
var arrDraft = ["salesDraft","infoDraft"]
var arrAlias = ["sales@a_domain.com","info@a_domain.com"]

function processInbox() {
 for (var i=0; i<arrAlias.length; i++) {
   processAlias(arrName[i], arrAlias[i], arrLabel[i], arrDraft[i])
 }
 return;
}

function processAlias(aName, anAlias, aLabel, aDraft) {
  var replyName = aName;
  var replyFrom = anAlias;
  var autorespondLabel = aLabel;
  var draftSubject = aDraft;
  
  var getDraftMessage = (function(draftSubject) {
    var message = "";
    return function(draftSubject) {
      if (!message) {
        var drafts = GmailApp.getDrafts();
        for (var i = 0; i < drafts.length; ++i) {
          var draft = GmailApp.getDraft(drafts[i].getId());
          if (draft.getMessage().getSubject() == draftSubject) {
            message = draft.getMessage().getBody();
            break;
          }
        }
        if (!message) {
          throw 'Cannot find draft"' + draftSubject + '"';
        }
      }
      return message;
    };
  }());

  var autorespond = GmailApp.getUserLabelByName(autorespondLabel);
  var threads = GmailApp.search("label:" + autorespondLabel);
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();

  for (var i = 0; i < threads.length; ++i) {
    var responsebody = getDraftMessage(draftSubject);
    threads[i].reply("", {
      htmlBody: responsebody,
      name: replyName,
      from: replyFrom 
      });
    Logger.log('reply sent');
    threads[i].removeLabel(autorespond)
   }
}