<template>
    <div class="min-h-screen">
        <nav class="py-4 mb-8 bg-white border-b border-gray-200">
            <div class="container">
                <div class="flex items-center h-10 -mx-4">
                    <inertia-link :href="route('index')" class="mx-4 text-lg font-bold tracking-tight">{{ $page.props.app_name }}</inertia-link>

                    <div class="ml-auto"></div>

                    <inertia-link v-if="$page.user" class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('home')">Home</inertia-link>
                    <template v-else>
                        <inertia-link class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('login')">Login</inertia-link>
                        <inertia-link class="mx-4 text-sm font-semibold text-gray-600 hover:text-gray-800" :href="route('register')">Register</inertia-link>
                    </template>
                </div>
            </div>
        </nav>

        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
