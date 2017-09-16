// Script that generates asset manifest
// 
// 

var fs = require("fs")
var path = require("path")
/**
 * Returns manifest in JSON format
 * @param {string} dir Directory where asset packs are
 */
function getManifest( dir ) {
    if( !dir || dir === undefined ) throw 'No manifest directory';
    var out = {};
    var packs = fs.readdirSync( dir )
    for (var packIndex = 0; packIndex < packs.length; packIndex++) {
        var packPath = path.join(dir, packs[packIndex])        
        if( fs.statSync(packPath).isDirectory() ) {
            out[packs[packIndex]] = getAssetsFromDir( packPath, dir );
            processAssetPack( out[packs[packIndex]] );            
        }

    }

    return JSON.stringify( out )
}

/**
 * Returns all asset entries in directory and its subdirectories, sorted by type.
 * @param {string} baseDir directory itself
 * @param {string} relativeTo (optional) format name relative to the given path
 */
function getAssetsFromDir( baseDir, relativeTo ) {
    relativeTo = relativeTo || baseDir;
    //this function recursively iterates over all files in dir
    var fn = function( dir, out ) {
        var files = fs.readdirSync(dir);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var url = path.join(dir, file);
            var stat = fs.statSync(url);            
            if(!stat.isDirectory()) {   
                var type = getAssetType( url );
                var name = path.relative(relativeTo, url );
                name = name.substr(0, name.lastIndexOf('.'));

                if( out[type.name] === undefined ) out[type.name] = [];

                var rec = {
                    name: name,
                    url: url,
                    size: stat.size
                }  
                
                switch( type.name ) {
                    case 'audio':
                        addAssetWithDuplicateCheck( out, type.name, rec ); 
                        break;
                    case 'spritesheet':                        
                        rec.image = path.join(path.dirname(url), type.image);
                        out[type.name].push(rec);
                        break;
                    default:
                        out[type.name].push(rec);
                }

            } else {
                fn( url, out )
            }
        }
    }
    var ret = {}
    fn( baseDir, ret )
    return ret;
}

/**
 * Adds asset entry to object. Unions assets with same name and type (uses multiple URLs in one entry)
 * @param {object} out Object in which entry needs to be added
 * @param {string} type Type of entry
 * @param {object} params Entry itself
 */
function addAssetWithDuplicateCheck( out, type, params ) {
    for (var j = 0; j < out[type].length; j++) {
        var comp = out[type][j];
        if( comp.name == params.name ) {
            if( Array.isArray(comp.url) )
                comp.url.push(params.url)
            else
                comp.url = [comp.url, params.url]
            addNew = false;
            return;
        }
    }
    
    out[type].push( params );
}

/**
 * Returns asset type
 * @param {string} filepath Path to a file 
 */
function getAssetType( filepath ) {
    var ext = path.extname(filepath).toLowerCase();    
    switch(ext) {
        case ".png":
        case ".jpg":
        case ".gif":
        case ".webp":
            return { name: "image" };
            break
        case ".mp3":
        case ".ogg":
        case ".m4a":
        case ".aac":
        case ".ac3":
            return { name: "audio" };
            break
        case ".json":
            var check = isSpritesheet(filepath)
            if( check == null ) {
                return { name: "json" }
            } else {
                return { name: "spritesheet", image: check[1]}
            } 
        case ".fnt":
            return { name: 'font' }
        default:
            return { name: "raw" };
            break
    }

}

/**
 * Process assetpack: remove font/spritesheet images from `images` array
 * @param {object} out assetpack
 */
function processAssetPack( out ) {
    // don't include font images inside of `images` array of asset pack
    if( out['font'] ) {
        for (var i = 0; i < out['font'].length; i++) {
            var font = out['font'][i];
            var fontDescription = fs.readFileSync(font.url).toString();
            var imageName = /file=\"([a-z0-9_\-\.]+)\"/gi.exec( fontDescription )[1];               
            for (var j = 0; j < out['image'].length; j++) {
                var image = out['image'][j];
                if(image.url.indexOf(imageName) > -1) {
                    out['image'].splice(j, 1);
                    font.image = image.url;
                    break;
                }
            }            
        }
        if( out['image'].length == 0 ) out['image'] = undefined;
    }

    if( out['spritesheet']) {
        for (var i = 0; i < out['spritesheet'].length; i++) {
            var ss = out['spritesheet'][i];
            var content = fs.readFileSync(ss.url).toString()
            for (var j = 0; j < out['image'].length; j++) {
                var image = out['image'][j];
                if(image.url.indexOf(ss.image) > -1) {
                    out['image'].splice(j, 1);
                    break;
                }                
            }
            
        }
    }
    // same with spritesheets
}

function isSpritesheet( filepath ) {
    var content = fs.readFileSync(filepath).toString();
    return /\"image\"[\s]{0,}:[\s]{0,}\"([A-Za-z\-_0-9\.]+)\"/gi.exec(content);
}


if(fs.existsSync( "./build" )) {
    process.chdir( "./build" )
    fs.writeFileSync( "./assets/manifest.json", getManifest("./assets") );
}
