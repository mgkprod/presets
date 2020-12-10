import { Preset } from 'use-preset';

Preset.setName('mgkprod/config');

Preset.prompt().add('french_localization', {
    type: 'toggle',
    name: 'french_localization',
    message: 'Configure French language?',
});

Preset.prompt().add('run_php_cs', {
    type: 'toggle',
    name: 'run_php_cs',
    message: 'Run php-cs-fixer at the end of the process?',
});

// "Style code" rules
Preset.extract('config');

//* FIXME: Workaround for .vscode (dot directory)
Preset.execute('mkdir', '.vscode');
Preset.execute('touch', '.vscode/settings.json')

Preset.edit('.vscode/settings.json')
    .update((content) => JSON.stringify({ "php-cs-fixer.onsave": true, }));

// Editor configuration
Preset.edit('.gitignore')
    .addAfter('node_modules', ['/.vscode'])

//* FIXME: Not working
// .addAfter('use Illuminate\\Support\\ServiceProvider;',

// AppServiceProvider
Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter('use', [
        'use Illuminate\\Support\\Carbon;',
        'use Illuminate\\Support\\Facades\\URL;',
    ])

//* FIXME: Not working
// .addAfter(/public function register\(\)(\s*){/gm, [

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

Preset.group((preset) => {
    // Configure french localization
    Preset.edit('config/app.php')
        .update((content) => {
            return content
                .replace('UTC', 'Europe/Paris')
                .replace("'locale' => 'en'", "'locale' => 'fr'")
                .replace('en_US', 'fr_FR')
        })

    Preset.execute('mkdir', 'resources\\lang\\fr');

    ['auth.php', 'pagination.php', 'passwords.php', 'validation-inline.php', 'validation.php'].forEach(
        (file) => Preset.execute('curl', 'https://raw.githubusercontent.com/Laravel-Lang/lang/master/src/fr/' + file, '-o', 'resources\\lang\\fr\\' + file)
    )
}).if((prompts) => prompts.french_localization)

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
        return content + "\n\n" + [
            'mix',
            '    .version()',
            '    .disableSuccessNotifications();',
        ].join("\n")
    })

// Move public assets into resources/
Preset.execute('mv', 'public\\', 'resources\\public')

//* FIXME: Not working
// Preset.extract('public')

Preset.execute('mkdir', 'public');
Preset.execute('touch', 'public/.gitignore')

Preset.edit('public/.gitignore')
    .update((content) => [
        '*',
        '!.gitignore',
        '!index.php',
        '!.htaccess',
    ].join('\n'));

// But keep these files:
let files = ['index.php', '.htaccess']
.forEach(
    (file) => Preset.execute('mv', 'resources\\public\\' + file, 'public\\' + file)
);

Preset.edit('webpack.mix.js')
    .update((content) => {
        return content + "\n\n" + "mix.copyDirectory('resources/public/', 'public/');"
    })

// Run php-cs
Preset.execute('php-cs-fixer', 'fix', '.')
    .if((prompts) => prompts.run_php_cs)
