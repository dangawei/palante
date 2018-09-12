var gulp = require('gulp'),
    seajsCombo = require( 'gulp-seajs-combo' ),
    uglify = require("gulp-uglify"),
    runSequence = require('run-sequence'),
    yargs = require('yargs').argv,//获取运行gulp命令时附加的命令行参数
    imagemin = require('gulp-imagemin'),        //图片压缩
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),            //js检查
    transport = require('gulp-seajs-transport'), //合并seajs用
    concat = require('gulp-seajs-concat'),         //合并seajs用
    uglify = require('gulp-uglify'),            //js压缩
    merge = require('merge-stream'),            //合并多个流
    replace = require('gulp-replace-task'),//对文件中的字符串进行替换
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector')
    fileinclude = require('gulp-file-include')

  //LESS 转化css 并加md5随机数
  gulp.task('LESS', function(){
      return gulp.src(['./src/less/**/*.less',])
          .pipe(sourcemaps.init())
          .pipe(less())
          .pipe(gulp.dest('./src/css'))
  })
  //LESS 转化css 并加md5随机数
  gulp.task('css', function(){
      return gulp.src(['./src/less/**/*.css'])
          .pipe(sourcemaps.init())
          .pipe(gulp.dest('./src/css'))
  })
gulp.task('revcss', function(){
    return gulp.src(['./dist/rev/img/*.json', './src/css/**/*.css'])  /*WEB-INF/views是本地html文件的路径，可自行配置*/
        .pipe(revCollector())
        .pipe(gulp.dest('./src/css/')) /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/rev/css'));
})
  //模块组件
  gulp.task('components', function(){
      var componentsSrc = './src/conponents/**/*'
      gulp.src(componentsSrc)
          .pipe(gulp.dest('./dist/conponents'))
  });
  //图标
  gulp.task('iconfont', function(){
      var componentsSrc = './src/font/**/*'
      gulp.src(componentsSrc)
          .pipe(gulp.dest('./dist/font'))
  });
  //js 添加MD5随机数
  gulp.task('JS', function(){
      return gulp.src(['./src/js/**/*.js'])
          .pipe(rev())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./dist/js/'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('./dist/rev/js'))
  })

  //html 压缩
  gulp.task('html', ['LESS','JS'], function () {
      var options = {
          removeComments: true,  //清除HTML注释
          collapseWhitespace: false,  //压缩HTML
          collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
          removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
          removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
          removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
          minifyJS: true,  //压缩页面JS
          minifyCSS: true  //压缩页面CSS
      };
      gulp.src(['./dist/rev/**/*.json', './dist/**/*.html'])
          .pipe(revCollector({
              replaceReved: true,
              dirReplacements: {
                  'css/': 'css/',
                  'js/':'js/'
              }
          }))
          .pipe(htmlmin(options))
          .pipe(gulp.dest('./dist'))
  });

gulp.task('inc',function(){
  return gulp.src('./src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('clean',function(){
  return gulp.src(['./dist'])
       .pipe(clean())
})

gulp.task('watch', function() {
    gulp.watch('src/**/*.css', ['default']);
    gulp.watch('src/**/*.less', ['default']);
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.html', ['default']);
});

//默认任务
gulp.task('default', function(callback){
      runSequence('clean','inc','iconfont','LESS','css','revcss','JS','components','html','watch',callback)
});
