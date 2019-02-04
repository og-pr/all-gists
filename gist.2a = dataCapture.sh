#!/bin/bash

# * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
# *                                                                                          */
# *    Filename: gist.2a = dataCapture.sh (bash)                                             */
# *                                                                                          */
# *    Copyright (c) 2018-2019 Otto Grajeda. All rights reserved.                            */
# *    Contact info: ottograjeda@gmail.com. See additional disclaimers below.                */
# *                                                                                          */
# *    NOTE 1: Code is NOT Open Source or Production Ready. It is working sample code.       */
# *    NOTE 2: For support or code questions search keywords @ Google or Stack Overflow.     */
# *                                                                                          */
# * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
# *                                                                                          */
# *    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND       */
# *    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED         */
# *    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE                */
# *    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR       */
# *    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES        */
# *    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;          */
# *    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON        */
# *    ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT               */
# *    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS         */
# *    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.                          */
# *                                                                                          */
# * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */

echo "using build.sh"
echo "..."
echo ""

OUTPUT="pwd"
echo "${OUTPUT}"

IN=input;
OUT=output;
PUBLIC=public;
WORKSPACE=ticket.503;
PROJECT=h.demos;

clear && \

echo "..."
# build css
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_subtask_1 -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.dataCapture.js && \
# build js
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_common_preminJs -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.common.js && \
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_subtask_2 -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.dataCapture.js && \
# build html
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_subtask_3 -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.dataCapture.js && \
# build images
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_subtask_4 -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.dataCapture.js && \
# build other
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_copyHtml -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.common.js && \
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_copyFolder_randomImage -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.common.js && \
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t cli_copyFiles_commonImages -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.common.js && \

# cleanup
echo "..."
echo "making changes to output"
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/_not*
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/images/_not*
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/images/common*
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/images/old*
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/images/preOptim*
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/demo/landingPage/raw*

# make public
echo "..."
buildTool.sh -u og -g deploy -p themes -f $WORKSPACE -d public -t pre_deploy2fb -x $HOME/$PROJECT/$WORKSPACE/_build/tasks/gf.common.js 

echo "..."
echo ""
echo "finished"
echo ""