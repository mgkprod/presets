import { Preset } from 'use-preset';

Preset.setName('mgkprod/new');

Preset.confirm('config', 'Configure Laravel app?', true);
Preset.confirm('version', 'Add basic semver file?', true);

Preset.apply(({ presetDirectory }) => `${presetDirectory}/../config`)
    .if(({ prompts }) => prompts.config === true)

Preset.apply(({ presetDirectory }) => `${presetDirectory}/../version`)
    .if(({ prompts }) => prompts.version === true)


// TODO:
    // Config .env and package.json
    // Create git repo + first commit?
    // Configure project on rocket via api calls and trigger a deployment 😀?

Preset.instruct([
  'Build something great!',
]).withHeading("What's next?");