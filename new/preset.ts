import { Preset } from 'apply';
import path from 'path';

Preset.setName('mgkprod/new');

Preset.confirm('config', 'Configure Laravel app?', true);
Preset.confirm('version', 'Add basic semver file?', true);
Preset.confirm('vitl', 'VITL stack?', true);

Preset.apply(({ presetDirectory }) => path.join(presetDirectory, '..', 'config'))
    .ifPrompt('config');

Preset.apply(({ presetDirectory }) => path.join(presetDirectory, '..', 'version'))
    .ifPrompt('version');

Preset.apply('mgkprod/vitl')
    .ifPrompt('vitl');

// TODO:
    // Config .env and package.json
    // Create git repo + first commit?
    // Configure project on rocket via api calls and trigger a deployment 😀?

Preset.instruct([
  'Build something great!',
]).withHeading("What's next?");