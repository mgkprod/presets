import { Preset } from 'use-preset';

Preset.setName('mgkprod/version');

//* FIXME: Not working
// .addAfter('use Illuminate\\Support\\ServiceProvider;',

// AppServiceProvider
Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter('use', [
        'use Illuminate\\Support\\Facades\\File;',
        'use Illuminate\\Support\\Facades\\View;',
    ])

//* FIXME: Not working
// .addAfter(/public function register\(\)(\s*){/gm, [

Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter('public function register', [
        "$version = rescue(fn () => File::get(config_path('.version')), 'WIP', false);",
        "$env = config('app.env');",
        '',
        "View::share('version', \"v$version.$env\");",
        '',
    ])
    .skipLines(1)
    .withIndent('double')

Preset.execute('touch', 'config/.version')

//* IDEA: Create file if not exists
Preset.edit('config/.version')
    .update((content) => '1.0.0')