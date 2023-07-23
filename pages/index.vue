<template>
    <div >
        <!-- welcome home -->
    </div>
</template>

<script>
    export default {
        head:{
            meta:[
                
                { charset: 'UTF-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                { name: 'robots', content: 'index, follow' },
                

                // {name: 'description', content: "polls, poll, lionel messi, messi, ronaldo, cristiano ronalo, neymar, neymar jr, ronaldinho, shah rukh khan, srk, salman khan, salman, bts, taehyung, v, jungkook, jinn, black pink, momoland, nancy jewel mcdonie, katrina kaif, katrina, deepika padukone, deepika, alia bhatt, alia, ileana d'cruz, aishwarya rai, akshay kumar, hrithik roshan, ranveer singh, ranbir kapoor, kareena kapoor, virat kohli, rohit sharma, ms dhoni" },
                
            ]
        },

        async fetch(){
            
            const apiUrlForLoginNReg = this.$axios.defaults.baseURL;

            this.$nuxt.$options.head = {
                title: 'Fans - Home',
                meta: [
                    
                    // {name: 'description', content: "Change password if you forgot."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'Fans - Home' },
                    // { hid: 'og:description', property: 'og:description', content: "Home if you forgot." },
                    { hid: 'og:image', property: 'og:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Fans - Home' },
                    // { name: 'twitter:description', content: "Home to continue with us." },
                    { name: 'twitter:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'Fans - Home';
                window.scrollTo(0, 0);
            }

            await Promise.resolve();

        
        },

        data: () => ({
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),

        created(){
            this.$router.push(`/polls`);
        }
    }
</script>
