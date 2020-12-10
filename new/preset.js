import { Preset } from 'use-preset';

Preset.setName('mgkprod/new');

Preset.prompt().add('config', {
    type: 'toggle',
    name: 'config',
    message: 'Configure Laravel app',
});

Preset.prompt().add('version', {
    type: 'toggle',
    name: 'version',
    message: 'Add basic semver file',
});

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
//     .if((prompts) => prompts.config)
// or
// Preset.apply('.', ['--path config'])
//     .if((prompts) => prompts.config)

// TODO:
    // Config .env and package.json
    // Create git repo + first commit?
    // Configure project on rocket via api calls and trigger a deployment 😀?