var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var uncss        = require('gulp-uncss');

// Статический сервер
    gulp.task('serve', ['sass'], function(){
        browserSync.init({
            server: './'
        });

        gulp.watch('scss/*.scss', ['sass']);
        gulp.watch('*.html').on('change', browserSync.reload);
    });

// Scss в css
    gulp.task('sass', function(){
        gulp.src('scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('css'))
            .on('error', sass.logError)
            .pipe(browserSync.stream());
    });

// Автопрефикс
    gulp.task('autoprefixer', function (){
        gulp.src('css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('css'));
    });

// Минификация css
    gulp.task('minify-css', function(){
        gulp.src('css/*.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('css'));
});

// Оичстка неиспользуемых стилий
    gulp.task('uncss', function(){
        gulp.src('css/*.css')
            .pipe(uncss({
                html: ['*.html']
            }))
            .pipe(gulp.dest('css'));
    });

// Запуск browserSync и компиляция scss в css
    gulp.task('default', ['serve']);