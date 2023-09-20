<template>
    <div>
        <div class="container terms-n-conditions-page">
            <h2>Report a Problem</h2>
            
            <div class="form-group">
                <label for="name">Email / Name / Phone</label>
                <input class="form-control" id="name" v-model="name" @keyup.enter="submitProblem()" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input class="form-control" id="subject" v-model="subject" @keyup.enter="submitProblem()" required>
            </div>
            <div class="form-group">
                <label for="description">Problem Description</label>
                <textarea class="form-control" id="description" v-model="description" @keyup.enter="submitProblem()" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click="submitProblem()">Submit</button>
            
        </div>
    </div>
</template>

<script>
    // import { useToast } from 'vue-toastification';
    // const toast = useToast();
    export default {
        head:{
            meta:[
                
                { charset: 'UTF-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                { name: 'robots', content: 'index, follow' },
                

                // {name: 'description', content: "polls, poll, lionel messi, messi, ronaldo, cristiano ronalo, neymar, neymar jr, ronaldinho, shah rukh khan, srk, salman khan, salman, bts, taehyung, v, jungkook, jinn, black pink, momoland, nancy jewel mcdonie, katrina kaif, katrina, deepika padukone, deepika, alia bhatt, alia, ileana d'cruz, aishwarya rai, akshay kumar, hrithik roshan, ranveer singh, ranbir kapoor, kareena kapoor, virat kohli, rohit sharma, ms dhoni" },
                
            ]
        },

        data() {
            return {
                name: '',
                subject: '',
                description: ''
            }
        },

        async fetch(){
            
            const apiUrlForLoginNReg = this.$axios.defaults.baseURL;

            this.$nuxt.$options.head = {
                title: 'PollDiary - Report a problem',
                meta: [
                    
                    // {name: 'description', content: "Change password if you forgot."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Report a problem' },
                    // { hid: 'og:description', property: 'og:description', content: "Report a problem if you forgot." },
                    { hid: 'og:image', property: 'og:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/report-problem' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Report a problem' },
                    // { name: 'twitter:description', content: "Report a problem to continue with us." },
                    { name: 'twitter:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'PollDiary - Report a problem';
                window.scrollTo(0, 0);
            }

            await Promise.resolve();

        
        },

        methods: {
            submitProblem(){
                if(this.name.trim() === '' || this.subject.trim() === '' || this.description.trim() === ''){
                    this.$toast.error("Fields cannot be empty!");
                }
                else{
                    const formData = {
                        "name": this.name,
                        "subject": this.subject,
                        "description": this.description
                    };
                    this.$axios.post('/api/report-a-problem', formData)
                    .then(response =>{
                        // console.log(response);
                        if(response.data.success === true){
                            this.name = '';
                            this.subject = '';
                            this.description = '';
                            this.$toast.success(response.data.message);
                        }
                    })
                    .catch(error =>{
                        console.log(error);
                    });
                }
            }
        }
    }
</script>
