import { Preset } from 'apply';

Preset.setName('mgkprod/new');

Preset.confirm('config', 'Configure Laravel app?', true);
Preset.confirm('version', 'Add basic semver file?', true);

Preset.apply(({ presetDirectory }) => `${presetDirectory}/../config`)
    .ifPrompt('config')

Preset.apply(({ presetDirectory }) => `${presetDirectory}/../version`)
    .ifPrompt('version')

// TODO:
    // Config .env and package.json
    // Create git repo + first commit?
    // Configure project on rocket via api calls and trigger a deployment 😀?

Preset.instruct([
  'Build something great!',
]).withHeading("What's next?");