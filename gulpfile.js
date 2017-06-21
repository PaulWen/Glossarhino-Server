// File Paths
var devOutputPathServer = "build";

var serverSrcFolderPath = "src";
var serverTypeScriptFiles = serverSrcFolderPath + "/**/*.ts";
var serverTypeScriptCompilerFiles = [serverTypeScriptFiles, 'typings_own/**/*.ts', 'typings/**/*.ts'];

// Gulp Tools
var gulp = require('gulp');
var server = require('gulp-develop-server');
var del = require('del');
var gulpTsc = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var serverTsProject = gulpTsc.createProject('tsconfig.json', {typescript: typescript});
var browserSync = require('browser-sync').create();

// is used in order to control if tasks should be run parallel or in sequenze
var gulpSequence = require('gulp-sequence');

// ////////////////////////////////////////////////
// Server TypeScript Files Tasks
// // /////////////////////////////////////////////

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('server-typescript-own-dev', function (cb) {
    var tscResult = gulp.src(serverTypeScriptCompilerFiles) // instead of "serverTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(serverTsProject());

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPathServer, cb));
});


// ////////////////////////////////////////////////
// Web Development Tasks
// ////////////////////////////////////////////////

// starts the node.js server for development
gulp.task('start-dev-server', function () {
    server.listen({path: devOutputPathServer + '/server.js'});
});

// this tasks starts a simple HTTP web server with browser sync functionality
// this means that when ever the content inside web browser changes, all browsers are getting refreshed automatically
gulp.task('serve-dev', ['start-dev-server'], function (cb) {
    browserSync.init({
        proxy: "localhost:3000",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true,
        // if true all sessions in different browsers and devices are getting synced = if you type in something in one window it will appear in every video
        // this feature is good for testing multiple browsers at the same time
        ghostMode: false
    });

    gulp.watch(serverTypeScriptFiles, ["browserSync-server-typescript-dev"], cb);
});

// the task reloads all browsers using browserSync after compiling all TypeScript server files to JavaScript files and copying the files to the server
// and finally also restarting the server
gulp.task('browserSync-server-typescript-dev', ["server-typescript-own-dev"], function (cb) {
    // restart the server
    server.restart(function () {
        // reload all browser windows
        browserSync.reload();
    });
    cb();
});

gulp.task('clear-console', function (cb) {
    process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    cb();
});

// the tasks compiles all the own typescript files automatically, when ever they change
gulp.task('dev-typescript', ['clear-web-dev'], function (cb) {
    gulp.watch(serverTypeScriptFiles, ["clear-console", "server-typescript-own-dev"], cb);
});

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('clear-web-dev', function (cb) {
    del([devOutputPathServer + '/**'], cb);
});

// build process for production
gulp.task('develop-web', gulpSequence('clear-web-dev', ['server-typescript-own-dev'], 'serve-dev'));

// ////////////////////////////////////////////////
// Default Tasks
// // /////////////////////////////////////////////

gulp.task('default', ['develop-web']);