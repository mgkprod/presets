import { Preset } from 'use-preset';

Preset.setName('mgkprod/config');

Preset.confirm('french_localization', 'Configure French language?', true);
Preset.confirm('french_localization_latest', 'With the latest files?', true).if(({prompts}) => prompts.french_localization);
Preset.confirm('move_reused_resources', 'Move reused resources?', true);
Preset.confirm('run_php_cs', 'Run php-cs-fixer at the end of the process?', true);

// "Style code" rules
Preset.extract('config').withDots(true);

// Editor configuration
Preset.edit('.gitignore')
    .addAfter('node_modules', ['/.vscode'])

Preset.edit('.env')
    .update((content) => {
        return content + "\n" + [
            'IGNITION_EDITOR=vscode',
            'IGNITION_THEME=auto',
            '',
        ].join("\n")
    })

// AppServiceProvider
Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter(/use Illuminate\\Support\\ServiceProvider;/, [
        'use Illuminate\\Support\\Carbon;',
        'use Illuminate\\Support\\Facades\\URL;',
    ])

Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter('public function register', [
        "if (config('app.env') === 'production') {",
        "    \URL::forceScheme('https');",
        '}',
        '',
        "Carbon::setLocale(config('app.locale'));",
        "setlocale(LC_TIME, config('app.locale'));",
        '',
    ])
    .skipLines(1)
    .withIndent('double')

Preset.group((Preset) => {
    // Configure french localization
    Preset.edit('config/app.php')
        .update((content) => {
            return content
                .replace('UTC', 'Europe/Paris')
                .replace("'locale' => 'en'", "'locale' => 'fr'")
                .replace('en_US', 'fr_FR')
        })

    Preset.extract('lang');

    Preset.group((Preset) => {
        ['auth.php', 'pagination.php', 'passwords.php', 'validation-inline.php', 'validation.php'].forEach(
            (file) => Preset.execute('curl', 'https://raw.githubusercontent.com/Laravel-Lang/lang/master/src/fr/' + file, '-o', 'resources/lang/fr/' + file)
        )
    }).if(({prompts}) => prompts.french_localization_latest)
}).if(({prompts}) => prompts.french_localization)

// Helpers
Preset.execute('composer')
    .withArguments([
        'require',
        'molayli/laravel-cloudflare-real-ip',
        'calebporzio/awesome-helpers',
        '--no-interaction',
    ])

// Laravel Mix configuration
Preset.edit('webpack.mix.js')
    .update((content) => {
        return content + "\n" + [
            'mix',
            '    .version()',
            '    .disableSuccessNotifications();',
            '',
        ].join("\n")
    })

Preset.group((Preset) => {
    // Move ./public into ./resources/public
    Preset.execute('mv', 'public', 'resources\\')
    Preset.extract('public')
    Preset.execute('mv', 'resources\\public\\index.php', 'public\\index.php')
    Preset.execute('mv', 'resources\\public\\.htaccess', 'public\\.htaccess')

    Preset.edit('webpack.mix.js')
        .update((content) => {
            return content + "\n"
                + "mix.copyDirectory('resources/public/', 'public/');"
                + "\n"
        })
}).if(({prompts}) => prompts.move_reused_resources)

// Run php-cs
Preset.execute('php-cs-fixer', 'fix', '.')
    .if(({prompts}) => prompts.run_php_cs)
