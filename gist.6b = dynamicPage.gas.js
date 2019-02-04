//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.6b = dynamicPage.gas                                                    */
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

function createHtml() {
  var docBody = DocumentApp.getActiveDocument().getBody();
  var searchElement = docBody.findElement(DocumentApp.ElementType.TABLE);
  var element = searchElement.getElement();
  var table = element.asTable();
  var tablerows = element.getNumRows();
  var array = [];
  for ( var row = 0; row < tablerows; row++ ) {
    var tablerow = element.getRow(row);
    array[row] = [];
    for ( var cell=0; cell < tablerow.getNumCells(); cell++) {
      var celltext = tablerow.getChild(cell).getText();
      array[row][cell] = celltext;
    }
  }  
  for ( var x = 0 ; x < array.length ; x++ ) {
    var placeHolder = array[x][0];
    var fileName = array[x][1];
    var altText = array[x][2];        
    var data = JSON.stringify(array[x]); 
    var checkTemp = data.indexOf('/');  
    if ( checkTemp === -1 ) { 
      continue; 
      } else {
        var result = placeHolder.split('/');
        var imageNumber = result[1];
        doSar_N(imageNumber, fileName, altText);
      } 
    } 
  return
} 

function doSar_N(var1, var2, var3) {
  var baseUrl = '< a URL link >'; 
  lib.sarBlock(var1); 
  lib.sarText('replace_baseurl',baseUrl);  
  var replaceNum = 'replace_'+var1;
  lib.sarText(replaceNum,var2); 
  lib.sarText('replace_imagealt',var3); 
}