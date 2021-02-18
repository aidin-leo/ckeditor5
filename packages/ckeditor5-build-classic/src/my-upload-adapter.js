import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import {logWarning} from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

export default class MyUploadAdapter extends Plugin {
	static get requires() {
		return [FileRepository];
	}

	static get pluginName() {
		return 'MyUploadAdapter';
	}

	init() {
		const options = this.editor.config.get('upload');
		if (!options) return;

		if (!options['uploadAction']) {
			logWarning('my-upload-adapter missing uploadAction');
			return;
		}

		this.editor.plugins.get(FileRepository).createUploadAdapter = loader => {
			return new Adapter(loader, options);
		};
	}
}

class Adapter {
	constructor(loader, options) {
		this.loader = loader;
		this.imageBaseURL = options['imageBaseURL'];
		this.uploadAction = options['uploadAction'];
	}

	async upload() {
		const file = await this.loader.file;
		const {error, payload} = await this.uploadAction(file);
		if (error) return Promise.reject(payload);
		return {default: `${this.imageBaseURL}${payload.url}`}
	}

	abort() {
		console.log('abort');
	}
}
