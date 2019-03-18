/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module font/fontfamily/fontfamilyediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import FontBackgroundColorCommand from './fontbackgroundcolorcommand';

import { FONT_BACKGROUND_COLOR, renderDowncastElement, renderUpcastAttribute } from '../utils';

export default class FontBackgroundColorEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( FONT_BACKGROUND_COLOR, {
			colors: [
				'hsl(0, 0%, 0%)',
				'hsl(0, 0%, 30%)',
				'hsl(0, 0%, 60%)',
				'hsl(0, 0%, 90%)',
				'hsl(0, 0%, 100%)',
				'hsl(360, 75%, 60%)',
				'hsl(30, 75%, 60%)',
				'hsl(60, 75%, 60%)',
				'hsl(90, 75%, 60%)',
				'hsl(120, 75%, 60%)',
				'hsl(150, 75%, 60%)',
				'hsl(180, 75%, 60%)',
				'hsl(210, 75%, 60%)',
				'hsl(240, 75%, 60%)',
				'hsl(270, 75%, 60%)'
			]
		} );

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'background-color': /[\s\S]+/
				}
			},
			model: {
				key: FONT_BACKGROUND_COLOR,
				value: renderUpcastAttribute( 'background-color' )
			}
		} );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: FONT_BACKGROUND_COLOR,
			view: renderDowncastElement( 'background-color' )
		} );

		editor.commands.add( FONT_BACKGROUND_COLOR, new FontBackgroundColorCommand( editor ) );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		// Allow fontBackgroundColor attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: FONT_BACKGROUND_COLOR } );
	}
}
