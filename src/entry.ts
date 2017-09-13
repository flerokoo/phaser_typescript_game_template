/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

/*declare function require(name:string);
(<any>window).PIXI = require("../node_modules/phaser-ce/build/custom/pixi.js");
(<any>window).p2 = require("../node_modules/phaser-ce/build/custom/p2.js");
(<any>window).Phaser = require("../node_modules/phaser-ce/build/custom/phaser-split.js");*/

/*import "expose-loader?$!phaser";
import "expose-loader?$!pixi";
import "expose-loader?$!p2";*/

/*import 'phaser';
import 'pixi';
import 'p2';*/

import '../node_modules/phaser-ce/build/phaser.js'

/*import '../node_modules/phaser-ce/build/custom/pixi.js'
import '../node_modules/phaser-ce/build/custom/p2.js'
import '../node_modules/phaser-ce/build/custom/phaser-split.js'*/

import { MainMenu } from './states/MainMenu';
import { Preloader } from './framework/states/preloader';
import { Layout } from './framework/tools/layout';
import { Boot } from './framework/states/boot';


class Entry 
{
	
	static game:Phaser.Game;


	constructor()
	{				
		Entry.game = new Phaser.Game( GAME_W, GAME_H, Phaser.AUTO, 'content', {create: this.init} )				
	}

	init() 
	{
		if( DEBUG ) {
			console.log(GAME_NAME);
		}		

		Layout.init( Entry.game, GAME_W, GAME_H )
		
		Entry.game.state.add('boot', Boot )
		Entry.game.state.add('preloader', Preloader )
		Entry.game.state.add('mainmenu', MainMenu )
		Entry.game.state.start('boot')
		
	}

}

window.onload = () => {
	new Entry();
}