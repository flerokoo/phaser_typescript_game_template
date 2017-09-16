//// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import 'expose-loader?PIXI!../node_modules/phaser-ce/build/custom/pixi.js'
import 'expose-loader?p2!../node_modules/phaser-ce/build/custom/p2.js'
import 'expose-loader?Phaser!../node_modules/phaser-ce/build/custom/phaser-split.js'

import { MainMenu } from './states/MainMenu';
import { Preloader } from './framework/states/preloader';
import { Layout } from './framework/tools/layout';
import { Boot } from './framework/states/boot';
import { AssetPackManager } from './framework/assets/assetPackManager';


export class Entry 
{	
	static game:Phaser.Game;

	constructor() {				
		Entry.game = new Phaser.Game( GAME_W, GAME_H, Phaser.AUTO, 'content', {create: this.init} );			
	}

	init() {
		
		Layout.init( Entry.game, GAME_W, GAME_H );

		// show this state after preloading
		Preloader.nextStateName = 'mainmenu';

		// main asset pack name
		Preloader.preloadPack = 'pack';

		// load additional assets in background after main asset pack is loaded
		Preloader.onComplete.add( () => {
			//AssetPackManager.addToQueue( "pack2" );
		});
		
		
		Entry.game.state.add( 'boot', Boot );
		Entry.game.state.add( 'preloader', Preloader );
		Entry.game.state.add( 'mainmenu', MainMenu );
		Entry.game.state.start( 'boot' );
		
	}

}

window.onload = () => {
	new Entry();
}