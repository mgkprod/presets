import { Preset } from 'use-preset';

Preset.setName('mgkprod/new');

//* FIXME: Not working
// Preset.prompt().add('presets', {
//     type: 'multiselect',
//     name: 'presets',
//     message: 'Which preset do you want to run?',
//     limit: 7,
//     choices: [
//         {
//             config: 'Configure Laravel app',
//             version: 'Add basic semver file'
//         }
//     ]
// });

//* FIXME: Not working
// Preset.apply('./config')
// or
// Preset.apply('.', ['--path config'])

// Preset.prompts.presets.includes('config')
//     ? Preset.apply('.').with(['--path config'])
//     : '';

// Preset.prompts.presets.includes('version')
//     ? Preset.apply('.').with(['--path version'])
//     : '';

// TODO:
    // Config .env and package.json
    // Create git repo + first commit?
    // Configure project on rocket via api calls and trigger a deployment 😀?