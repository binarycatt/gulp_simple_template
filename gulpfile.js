var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var uncss        = require('gulp-uncss');

// Статический сервер
    gulp.task('serve', ['sass'], function(){
        browserSync.init({
            server: './dist'
        });
    });

// Scss в css
    gulp.task('sass', function(){
        gulp.src('src/scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('dist/css'))
            .on('error', sass.logError)
            .pipe(browserSync.reload({
                stream: true
            }));
    });

// Автопрефикс
    gulp.task('autoprefixer', function (){
        gulp.src('dist/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('dist/css'));
    });

// Минификация css
    gulp.task('minify-css', function(){
        gulp.src('dist/css/*.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'));
});

// Оичстка неиспользуемых стилий
    gulp.task('uncss', function(){
        gulp.src('dist/css/*.css')
            .pipe(uncss({
                html: ['dist/*.html']
            }))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('watch', function(){
        gulp.watch('src/scss/*.scss', ['sass']);
        gulp.watch('dist/*.html').on('change', browserSync.reload);
    })

// Запуск browserSync и компиляция scss в css
    gulp.task('default', ['serve','watch','sass']);
