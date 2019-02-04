//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - */
//*                                                                                          */
//*    Filename: gist.2b = dataCapture.js (gulp)                                             */
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

const gulp = require('gulp'); 
const pump = require('pump');
const log = require('fancy-log'); 
const args = require('yargs').argv;
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const concat = require('gulp-concat'); 
const gfi = require('gulp-file-insert');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-html-minifier');
const path = require('path');
const Jimp = require("jimp");
const imagemin = require('imagemin');
const foreach = require('gulp-foreach');
const image = require('gulp-image');

var paths = {
    sourceHtml: args.inputFolder,
    destHtml: args.outputFolder
};

gulp.task('cli_resizeAll', function(done) {
    gulp.src(''+paths.sourceHtml+'/images/t-503/demo/landingPage_1*')
    .pipe(foreach(function(stream, file) {
         var name_wo_ext = path.basename(file.path, '.jpg');
         var name_w_ext = path.basename(file.path);
        Jimp.read(''+paths.sourceHtml+'/images/t-503/demo/landingPage_1/'+name_w_ext, function (err, img) {
            console.log(" ");
            console.log("processing image... " +name_w_ext);
            var sizes = [1440, 1366, 900, 768, 414, 320];
            var quality = 100;
            if (err) { 
              throw err 
            } else {
            sizes.forEach(function (size) {
                console.log('resize to: ' + size);
                img.resize(size, Jimp.AUTO, Jimp.RESIZE_BICUBIC)
                .quality(quality)
                .write(''+paths.destHtml+'/images/preOptim_t-503/'+name_wo_ext+'_s' + size + '.jpg');
            })
        }
        done();
      })
        return stream;
    }))
});

gulp.task('cli_compressAll', function (done) {
  gulp.src(paths.destHtml+'/images/preOptim_t-503/**/*.{gif,png,jpg}')
    .pipe(image())
    .pipe(gulp.dest(paths.destHtml+'/images/t-503/'));
    done();
});

gulp.task('cli_minify_css_s', function () {
  return gulp.src(''+paths.sourceHtml+'/css/_inline/styles/h.s.demo_landingPage_1.css')
    .pipe(cssnano())
    .pipe(rename({extname: '.min.css' }))
    .pipe(gulp.dest(paths.sourceHtml+'/css/_inline/styles/min/'))
});

gulp.task('cli_minify_css_q', function () {
  return gulp.src(''+paths.sourceHtml+'/css/_inline/queries/h.q.demo_landingPage_1.css')
    .pipe(cssnano({autoprefixer: false})) 
    .pipe(rename({extname: '.min.css' }))
    .pipe(gulp.dest(paths.sourceHtml+'/css/_inline/queries/min/'))
});

gulp.task('cli_concatJs_1', function() {
  return gulp.src(''+paths.sourceHtml+'/js/h.post/h.demo_landingPage_1.form*')
    .pipe(concat('post.demo_landingPage_1.not_min.js'))
    .pipe(gulp.dest(paths.destHtml+'/js/not_min/'));
});
uglyOptions_js2 = {
  sourceMap: false,
  mangle: true
};
gulp.task('cli_minifyJs_1', function(cb) {   
  pump([
    gulp.src(''+paths.destHtml+'/js/not_min/post.demo_landingPage_1.not_min.js'),
    uglify(uglyOptions_js2),
    rename('post.demo_lp1.min.js'),
    gulp.dest(paths.destHtml+'/js/')
    ],
    cb
  );
});

gulp.task('cli_inline', function () {
  log('building inline files for HTML, CSS, & JS...');
  return gulp.src(''+paths.sourceHtml+'/demo/landingPage/raw_index.html') 
  .pipe(gfi({
    '/* inline_js15_C */': ''+paths.sourceHtml+'/_inline/sectionMeta.txt',
    '/* inline_js15_A */': ''+paths.sourceHtml+'/_inline/sectionIe.txt',
    '/* inline_js15_B */': ''+paths.sourceHtml+'/_inline/ieRedirect.txt',
    '/* inline_js1 */': ''+paths.sourceHtml+'/js/_inline/head.load.min.js',
    '/* inline_h.preJs */': ''+paths.destHtml+'/js/pre.min.js',
    '/* inline_cssReset */': ''+paths.sourceHtml+'/css/_inline/min/h.reset.min.css',
    '/* inline_cssPostReset */': ''+paths.sourceHtml+'/css/_inline/min/vanilla.post.reset.min.css',
    '/* inline_cssCommon */': ''+paths.sourceHtml+'/css/_inline/min/h.common.min.css',
    '/* inline_cssHomeStyle */': ''+paths.sourceHtml+'/css/_inline/styles/min/h.s.demo_landingPage_1.min.css',
    '/* inline_cssHomeQueries */': ''+paths.sourceHtml+'/css/_inline/queries/min/h.q.demo_landingPage_1.min.css'
  }))
  .pipe(gulp.dest(paths.destHtml+'/demo/landingPage/'));
});

gulp.task('cli_rename', function () {
  return gulp.src(''+paths.destHtml+'/demo/landingPage/raw_index.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.destHtml+'/demo/landingPage/'));
});

gulp.task('cli_minifyHtml', function() {
  return gulp.src(''+paths.destHtml+'/demo/landingPage/index*')
    .pipe(htmlmin({
      collapseWhitespace: true, 
      conservativeCollapse: true, 
      removeComments: true,
      ignoreCustomComments: [ /^!/ ]
  }))
    .pipe(gulp.dest(paths.destHtml+'/demo/landingPage/')) 
});

gulp.task('cli_subtask_1', gulp.parallel('cli_minify_css_s', 'cli_minify_css_q'));
gulp.task('cli_subtask_2', gulp.series('cli_concatJs_1', 'cli_minifyJs_1'));
gulp.task('cli_subtask_3', gulp.series('cli_inline', 'cli_rename', 'cli_minifyHtml'));
gulp.task('cli_subtask_4', gulp.series('cli_resizeAll', 'cli_compressAll'));