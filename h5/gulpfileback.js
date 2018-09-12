/**
 * Created by aniu on 2016/7/5.
 */
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');  //模板提前预编译
var rename = require('gulp-rename');  // 文件重命名的
var watch = require('gulp-watch');  //监听api
var livereload = require('gulp-livereload'); //监听文件的变化
var less = require('gulp-less'); //压缩less转写css 压缩
var uglify = require('gulp-uglify'); //压缩js
var concat  = require('gulp-concat'); //合并文件
var RevAll  = require('gulp-rev-all'); //md5 的输出，控制版本号
var cssmin = require('gulp-minify-css');// css 压缩
var clean = require('gulp-clean'); // 清理执行clean
var minifyhtml =require('gulp-minify-html'); //html压缩
var useref =require('gulp-useref'); //html压缩
var filter = require('gulp-filter'); // 目录的插件
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');//公用的文件调用 @@
var tmodjs = require('gulp-tmod');
var gulpsequence = require('gulp-sequence');//顺时完成一任务执行下面一个任务

    gulp.task('watch', function() {
        gulp.watch('src/**/*.less', ['watchter']);
        gulp.watch('src/**/*.js', ['watchter']);
        gulp.watch('src/**/*.html', ['watchter']);
    });

   gulp.task('buildTemplate',function () {
       var searchPath = 'src/tpl/*.html';
       gulp.src(searchPath)
           .pipe(tmodjs({
             templateBase: 'src/tpl',
             combo: false,
             compress: true,
             cache: true,
             escape: true,
             charset: "utf-8",
             syntax: "simple",
             type: "default"
           })).pipe(gulp.dest('src/js/tpl'));
   });

   gulp.task('pask',function () {
       var jsFilter = filter("**/*.js", {restore: true});
       var lessFilter = filter("**/*.less", {restore: true});
       var htmlFilter = filter('**/*.html', {restore: true});
       var revAll = new RevAll({
           //不重命名文件
           dontRenameFile: ['.html', '.vm', '.md'],
           //不去跟新html的引用
           dontUpdateReference: ['.html', '.vm', '.md'],

           //无需关联处理文件
           dontGlobal: [/^\/favicon.ico$/, '.bat', '.txt', '.json','.handlebars'],

           //该项配置只影响绝对路径的资源
           //prefix: 'http://localhost:1111/'
       });
       return gulp.src(['src/**','src/**/**'])
          //压缩js
            .pipe(jsFilter)
            //.pipe(uglify())
            .pipe(jsFilter.restore)

           //压缩css
           .pipe(lessFilter)
           .pipe(less())
           .pipe(cssmin())
           .pipe(lessFilter.restore)


           //合并html里面的js/css
           .pipe(htmlFilter)
           .pipe(fileinclude({
               prefix: '@@',
               basepath: '@file'
            }))
           .pipe(useref())
           /*.pipe(minifyhtml())*/
           .pipe(htmlFilter.restore)

           //加MD5后缀
          .pipe(revAll.revision())

           //输出
            .pipe(gulp.dest('build'))

           //生成映射json文件
           .pipe(revAll.manifestFile())
           .pipe(gulp.dest('build'));
   });

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('watchter',('clean',['pask']));
gulp.task('default',gulpsequence('buildTemplate','clean','pask','watch'));

gulp.task('rsync', function () {
    var rsync = require('gulp-rsync');
    return gulp.src('build/**')
        .pipe(rsync({
            destination: '/work_space/website/client/build/',
            root: 'build',
            hostname: '192.168.1.16',
            username: 'root',
            incremental: true,
            progress: true,
            relative: true,
            //emptyDirectories: true,
            archive: true,
            clean: true,
            compress: true,
            recursive: true,
            exclude: ['.DS_Store'],
            include: [],
            chmod: "ugo=rwX"
        }))
        .on('error', function (err) {
            console.log(err);
        });
    /*
     var git = require('gulp-git');
     if (!options.v) throw new Error('参数版本号不能为空,e.g:--v 1.0 ');
     if (!options.m) throw new Error('参数版本描述不能为空,e.g:--m  增加订单取消');
     git.tag(options.v, options.m, function (err) {
     if (err) throw err;
     git.push('origin', 'microshop-multipage', function (err) {
     if (err) throw err;
     });
     });
     */
});
gulp.task('deploy', function() {
    var rsync = require('gulp-rsync');
    return gulp.src('build/**')
        .pipe(rsync({
            root: 'build/',
            hostname: '192.168.1.16',
            destination: '/work_space/website/client/build/',
            username: 'root',
            archive: true,
            silent: false,
            compress: true,
            chmod: "ugo=rwX"
        }));
});


