/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import 'expose-loader?PIXI!../node_modules/phaser-ce/build/custom/pixi.js'
import 'expose-loader?p2!../node_modules/phaser-ce/build/custom/p2.js'
import 'expose-loader?Phaser!../node_modules/phaser-ce/build/custom/phaser-split.js'

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