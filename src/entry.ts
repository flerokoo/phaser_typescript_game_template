//// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import 'expose-loader?PIXI!../node_modules/phaser-ce/build/custom/pixi.js';
import 'expose-loader?p2!../node_modules/phaser-ce/build/custom/p2.js';
import 'expose-loader?Phaser!../node_modules/phaser-ce/build/custom/phaser-split.js';

import { MainMenu } from './states/MainMenu';
import { Preloader } from './framework/states/preloader';
import { Layout } from './framework/tools/layout';
import { Boot } from './framework/states/boot';
import { AssetPackManager } from './framework/assets/assetPackManager';
import { GameState } from './states/gamestate';


export class Entry {	

	static game:Phaser.Game;

	constructor() {				
		Entry.game = new Phaser.Game( GAME_W, GAME_H, Phaser.AUTO, 'content', {create: this.init} );			
	}

	init() {	

		// this class will keep an eye on window size and change canvas respectively	
		Layout.init( Entry.game, GAME_W, GAME_H );

		// show this state after preloading
		Preloader.nextStateName = 'mainmenu';

		// main asset pack name
		Preloader.preloadPack = 'mainmenu';

		// load additional assets in background after main asset pack is loaded
		Preloader.onComplete.add( () => {
			//AssetPackManager.addToQueue( "game" );
		});
		
		
		// boot state loads asset manifest and inits AssetPackManager with it
		Entry.game.state.add( 'boot', Boot );
		// preloader just loads common resouces
		Entry.game.state.add( 'preloader', Preloader );
		// other states...
		Entry.game.state.add( 'mainmenu', MainMenu );
		Entry.game.state.add( 'game', GameState );

		// starting boot state
		Entry.game.state.start( 'boot' );		
	}

}

window.onload = () => {
	new Entry();
};