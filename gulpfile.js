var fs = require("fs")
var gulp = require('gulp')
var changed = require('gulp-changed')
var yaml = require('yaml')
var ts = require("gulp-typescript")
var del = require('del')
var tap = require('gulp-tap')
var webpack = require('webpack')
var stream = require("webpack-stream")
var sequence = require("gulp-sequence")
var uglify = require("gulp-uglify")
var minify = require("gulp-minify")
var args = require('yargs').argv;
var gulpif = require('gulp-if')
var help = require('gulp-help')(gulp)
var browserSync = require("browser-sync").create()
var path = require("path")

/****************************** INIT *******************************/
var debug = args.release === undefined || !args.release;

var params = {
    game : {
        width: 640,
        height: 800,
        name: "Game#1",
        version: "1.0.0",
        stretchOnDesktop: false
    },
    build : {
        config : "./tsconfig.json",
        destination : "./build",
        bundleFileName : "bundle.js"
    },
    server : {
        port : 11100
    }
}

/***************************** HELPERS *****************************/

function createManifest( dir ) {
    if( !dir || dir === undefined ) throw 'No manifest directory';
    var out = {};
    var packs = fs.readdirSync( dir )
    for (var packIndex = 0; packIndex < packs.length; packIndex++) {
        var packPath = path.join(dir, packs[packIndex])        
        if( fs.statSync(packPath).isDirectory ) {
            out[packs[packIndex]] = [];
            
        }

    }
}


/****************************** TASKS ******************************/

gulp.task("clean", "Clean up all build files.", function(){
    return del([params.build.destination])
})

gulp.task("bundle", "Compile and bundle all typescript files.", function(){
    return gulp.src("src/entry.ts")
        .pipe( stream({ 
            output: {
                filename: params.build.bundleFileName
            },
            resolve:  {
                extensions: [".ts", ".tsx", ".js" ]
            },
            module: {
                rules: [                  
                    { test: /\.tsx?$/, use: 'ts-loader', exclude: /node-modules/ }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'DEBUG' : debug,
                    'GAME_W': params.game.width,
                    'GAME_H': params.game.height,
                    'STRETCHED_ON_DESKTOP' : params.game.stretchOnDesktop,
                    'GAME_NAME': JSON.stringify( params.game.name ),
                    'GAME_VERSION': JSON.stringify( params.game.version )
                })
            ],
            devtool: (debug ? 'inline-source-map' : undefined )
         }, webpack))
        .pipe(gulpif(!debug, uglify({mangle: true, compress: true})))
        //.pipe(gulpif(!debug, minify()))
        .pipe(gulp.dest(params.build.destination + '/js/'))     
         
})

gulp.task("copy", "Copy all static assets to destination folder and create asset manifest.", function(){
    gulp.src("./assets/**/*")
        .pipe(changed(params.build.destination + "/assets/"))
        .pipe( gulp.dest(params.build.destination  + "/assets/"))

    gulp.src("./web/**/*")
        .pipe(changed(params.build.destination))
        .pipe( gulp.dest(params.build.destination))

    createManifest(path.join( params.build.destination, '/assets/'));
    
})

gulp.task("serve", "Start test server", function(){
    browserSync.init({
        port: params.server.port,
        server: './build/'
    })
    browserSync.watch( "./build/**/*.js" ).on('change', browserSync.reload )
})

gulp.task("manifest", "Generate assets manifest inside build folder", function() {
    require("./tools/generateManifest");
});

gulp.task('build', "Compile, copy assets, create manifest. Use with --release to uglify.", sequence(['copy', 'bundle'], "manifest") );

gulp.task('default', false, ['help'] )
