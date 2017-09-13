// Script that generates asset manifest
// 
// 

var fs = require("fs")
var path = require("path")

function getManifest( dir ) {
    if( !dir || dir === undefined ) throw 'No manifest directory';
    var out = {};
    var packs = fs.readdirSync( dir )
    for (var packIndex = 0; packIndex < packs.length; packIndex++) {
        var packPath = path.join(dir, packs[packIndex])        
        if( fs.statSync(packPath).isDirectory() ) {
            out[packs[packIndex]] = getAssetsFromDir( packPath );
            processAssetPack(out[packs[packIndex]])
        }

    }

    return JSON.stringify( out )
}


function getAssetsFromDir( dir ) {
    var fn = function( dir, out ) {
        var files = fs.readdirSync(dir);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var pth = path.join(dir, file);
            var stat = fs.statSync(pth);            
            if(!stat.isDirectory()) {
                var type = getAssetType( pth );
                if( out[type] === undefined ) out[type] = [];
                out[type].push({
                    name: pth,
                    url: pth,
                    size: stat.size
                });
            } else {
                fn( pth, out )
            }
        }
    }
    var ret = {}
    fn( dir, ret )
    return ret;
}

function getAssetType( filepath ) {
    var ext = path.extname(filepath).toLowerCase();
    console.log(filepath)
    switch(ext) {
        case ".png":
        case ".jpg":
        case ".gif":
        case ".webp":
            return "image";
            break
        case ".mp3":
        case ".ogg":
        case ".m4a":
        case ".aac":
        case ".ac3":
            return "audio";
            break
        case ".json":
            return isSpritesheet(filepath) ? "spritesheet" : "json"
        default:
            return "raw";
            break
    }

}

function isSpritesheet( filepath ) {
    return false;
}

function processAssetPack( pack ) {
    // union audiofiles with same name into one entry
    // 
}

if(fs.existsSync( "./build" )) {
    process.chdir( "./build" )
    fs.writeFileSync( "./assets/manifest.json", getManifest("./assets") );
}
