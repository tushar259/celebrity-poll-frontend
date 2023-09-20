<template>
    <div class="terms-n-conditions-page">
        <h4><strong>About Us</strong></h4>
        <p>Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions. Please take a moment to read through our "About Us" section to learn more about who we are and what we do.
        </p>
        <h5><strong>Our Mission</strong></h5>
        <p>At PollDiary, our mission is to create an inclusive and interactive community for star enthusiasts from around the world. We aim to foster a space where users can express their opinions, participate in polls, and engage in meaningful discussions about their favorite stars and celebrities.
        </p>
        <h5><strong>User Information Collection and Storage</strong></h5>
        <p>To enhance your experience on our website, we may collect certain user information when necessary. This may include your name, email address, and other relevant details. Rest assured, we are committed to protecting your privacy and maintaining the confidentiality of your personal information. Please refer to our Privacy Policy for more information on how we collect, use, and safeguard your data.
        </p>
        <h5><strong>Polls and Discussions</strong></h5>
        <p>PollDiary offers a wide range of star-related polls and discussions to keep you informed and entertained. Through our platform, you can vote in polls, share your thoughts, and engage with other users who share your passion for stars and celebrities. We encourage respectful and constructive conversations that contribute to a positive community experience.
        </p>
        <h5><strong>Image Sources and Copyright</strong></h5>
        <p>We want to clarify that all the images displayed on our website are sourced from various websites, and we make every effort to ensure that we are using them in compliance with applicable copyright laws. If you believe that any image used on our platform infringes upon your copyright, please contact us immediately so that we can address the issue promptly.
        </p>
        <h5><strong>Disclaimer</strong></h5>
        <p>While we strive to provide accurate and up-to-date information, it's important to note that the opinions expressed in polls and discussions on our website are solely those of the individual users. PollDiary does not endorse or validate the accuracy of the opinions shared by users. We encourage you to exercise your own judgment and discretion when participating in polls and engaging in discussions.
        </p>
        <h5><strong>Contact Us</strong></h5>
        <p>If you have any questions, concerns, or feedback regarding our website or any aspect of our services, please don't hesitate to reach out to our support team. We value your input and are here to assist you.

        Thank you for being a part of the PollDiary community. We hope you enjoy your time here and have fun exploring the world of star polls!
        </p>
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
                title: 'PollDiary - About us',
                meta: [
                    
                    // {name: 'description', content: "Create account to continue with us."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - About us' },
                    // { hid: 'og:description', property: 'og:description', content: "About us to continue with us." },
                    { hid: 'og:image', property: 'og:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/about-us' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - About us' },
                    // { name: 'twitter:description', content: "About us to continue with us." },
                    { name: 'twitter:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'PollDiary - About us';
                window.scrollTo(0, 0);
            }

            await Promise.resolve();

        
        }
    }
</script>
