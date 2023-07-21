export default {
    head: {
        title: 'ergodnc',
        htmlAttrs: {
            lang: 'en'
        },
        bodyAttrs: {
            class: 'bg-gray-100'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            // {
            //     rel: 'stylesheet',
            //     href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'
            // }
        ]
    },

    css: [
        '~/assets/custom.css',
        'bootstrap/dist/css/bootstrap.min.css',
        'vue-toastification/dist/index.css',
    ],

    plugins: [
        '~/plugins/jquery.js',
        { src: '~/plugins/bootstrap.client.js', mode: 'client' }
    ],

    components: true,

    buildModules: [
        '@nuxtjs/eslint-module',
        // '@nuxtjs/tailwindcss'
    ],

    modules: [
        '@nuxtjs/axios',
        'vue-toastification/nuxt',
        // '@nuxtjs/auth-next'
    ],

    // auth: {
    //     strategies: {
    //         cookie: {
    //             endpoints: {
    //                 csrf: {
    //                     url: '/sanctum/csrf-cookie'
    //                 },
    //                 login: {
    //                     url: '/login'
    //                 },
    //                 logout: {
    //                     url: '/logout'
    //                 },
    //                 user: {
    //                     url: '/user'
    //                 }
    //             },
    //             user: {
    //                 property: 'data'
    //             },
    //         }
    //     },

    //     redirect: {
    //         login: '/login',
    //         logout: '/login',
    //         home: '/'
    //     },

    //     plugins: ['~/plugins/axios'],
    // },

    axios: {
        baseURL: 'http://127.0.0.1:8000',
        // credentials: true,
    },

    build: {},

    router: {
        // extendRoutes(routes, resolve) {
        //   routes.push({
        //     path: '/industry/:industry',
        //     component: resolve(__dirname, 'pages/industry/_industry.vue')
        //   });
        // }
    },

    "rules": {
        "no-console": "off"
    }
}
