<template>
    <div>
        <div class="absolute inset-0 bottom-auto flex flex-row py-4 space-x-8">
            <div class="container">
                <div class="flex items-center justify-end h-10 -mx-4">
                    <inertia-link v-if="$page.user" class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('home')">Home</inertia-link>
                    <template v-else>
                        <inertia-link class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('login')">Login</inertia-link>
                        <inertia-link class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('register')">Register</inertia-link>
                    </template>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="mb-8 text-6xl font-bold tracking-tight">{{ $page.props.app_name }}</h1>

            <div class="flex flex-row space-x-8">
                <a class="text-sm text-gray-600 hover:text-gray-800" target="_blank" href="https://vuejs.org/v2/guide/">Vue.js</a>
                <a class="text-sm text-gray-600 hover:text-gray-800" target="_blank" href="https://inertiajs.com/">Inertia.js</a>
                <a class="text-sm text-gray-600 hover:text-gray-800" target="_blank" href="https://tailwindcss.com/">Tailwind CSS</a>
                <a class="text-sm text-gray-600 hover:text-gray-800" target="_blank" href="https://laravel.com/docs">Laravel</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
