import { Preset } from 'use-preset'

Preset.setName('mgkprod/vitl')

Preset.extract('stubs')

Preset.execute('rm', 'resources/views/welcome.blade.php');
Preset.execute('rm', '-r', 'resources/css');

Preset.group((Preset) => {
    Preset
        .editPhpPackages()
        .add('inertiajs/inertia-laravel', '^0.3.4')
        .add('tightenco/ziggy', '^1.0.4')
        .add('laravel/ui', '^1.0|^2.0|^3.0')

    Preset.installDependencies('php')
}).withTitle('Installing php dependencies...')

Preset.group((Preset) => {
    Preset
        .editNodePackages()
        .addDev('@inertiajs/inertia', '^0.7.0')
        .addDev('@inertiajs/inertia-vue', '^0.4.3')
        .addDev('@inertiajs/progress', '^0.2.2')
        .addDev('resolve-url-loader', '^3.1.0')
        .addDev('sass', '^1.20.1')
        .addDev('sass-loader', '7.*')
        .addDev('tailwindcss', '^2.0.2')
        .addDev('autoprefixer', '^10.1.0')
        .addDev('postcss', '^8.2.1')
        .addDev('vue', '^2.5.17')
        .addDev('vue-template-compiler', '^2.6.10')

    Preset.installDependencies('node')
}).withTitle('Installing node dependencies...')

//* FIXME: Not working
// Laravel Mix configuration
Preset.edit('webpack.mix.js')
    .update((content) => {
        content.replace(/mix.js((.|\s)+)]\);/gm, [
                "mix",
                "    .js('resources/js/app.js', 'public/js')",
                "    .sass('resources/sass/app.scss', 'public/css')",
                '    .options({',
                '        processCssUrls: false,',
                '        postCss: [',
                "            require('tailwindcss')()",
                '        ],',
                '    })',
        ].join("\n"))
    })

// AppServiceProvider
Preset.edit('app/Providers/AppServiceProvider.php')
    .addAfter(/use Illuminate\\Support\\ServiceProvider;/, [
        'use Inertia\\Inertia;',
    ])

// If you used mgkprod/version
Preset.edit('app/Providers/AppServiceProvider.php')
    .update((content) => {
        content.replace(
            "View::share('version', $version . $sha . $env);",
            "Inertia::share('version', $version . $sha . $env);"
        )
    })

// Kernel
Preset.edit('app/Http/Kernel.php')
    .addAfter(/\\App\\Http\\Middleware\\VerifyCsrfToken::class,/, [
        '\\App\\Http\\Middleware\\HandleInertiaRequests::class,'
    ])
    .skipLines(1)

Preset.instruct([
    `Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`,
])