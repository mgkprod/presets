import { Preset } from 'apply';

Preset.setName('mgkprod/version');

Preset.extract('config')

Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter(/use Illuminate\\Support\\ServiceProvider;/, [
        'use Illuminate\\Support\\Facades\\File;',
        'use Illuminate\\Support\\Facades\\View;',
    ])

Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter('public function register', [
        "$version = rescue(fn () => 'v' . trim(File::get(config_path('.version'))), 'WIP', false);",
        "$sha = rescue(fn () => ' (' . substr(File::get(base_path('REVISION')), 0, 7) . ')', null, false);",
        "$env = config('app.env') == 'production' ? '' : ' - ' . config('app.env');",
        '',
        "View::share('version', $version . $sha . $env);",
        '',
    ])
    .skipLines(1)
    .withIndent('double')