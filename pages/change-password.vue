<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 log-reg-pas-container">
                <h2 class="text-center mb-4 font-weight-bold">Change password</h2>
                
                <div v-if="emailFound == 'second phase'">
                    <div class="form-group">
                        Email: <b>{{email}}</b>
                    </div>
                    <div class="px-10-gap"></div>
                    <div class="form-group">
                        {{passwordRecoveryQuestion}}
                    </div>
                    <div class="form-group">
                        <input class="form-control" id="answer" v-model="selectedAnswer" @keyup.enter="recoverPasswordSecondTime()" placeholder="Answer">
                    </div>
                    <button class="btn btn-primary btn-block" @click="recoverPasswordSecondTime()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Submit' }}
                    </button>
                </div>
                <div v-else-if="emailFound == 'third phase'">
                    <div class="form-group">
                        <label for="password">New password (at least 5 or at most 20 characters)</label>
                        <input type="password" class="form-control" v-model="changePassword" @keyup.enter="recoverPasswordFinalStep()" placeholder="Password">
                        <small v-html="changePasswordMessage"></small>
                    </div>
                    <div class="form-group">
                        <label for="password">Confirm password</label>
                        <input type="password" class="form-control" v-model="confirmPassword" @keyup.enter="recoverPasswordFinalStep()" placeholder="Password">
                        <small v-html="confirmPasswordMessage"></small>
                    </div>
                    <button class="btn btn-primary btn-block" @click="recoverPasswordFinalStep()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Change password' }}
                    </button>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" v-model="email" @keyup.enter="recoverPassword()" placeholder="Email">
                        <small v-html="emailMessage"></small>
                    </div>
                    <button class="btn btn-primary btn-block" @click="recoverPassword()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Recover password' }}
                    </button>
                </div>
                
                
            </div>
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
                userIdFromDatabase: '',
                email: '',
                emailMessage: '',
                submitFormMessage: '',
                isLoading: false,
                emailFound: "first phase",
                selectedAnswer: '',
                passwordRecoveryQuestion: '',
                passwordRecoveryAnswer: '',
                changePassword: '',
                confirmPassword: '',
                changePasswordMessage: '',
                confirmPasswordMessage: '',
                token: process.client ? localStorage.getItem('token') : '',
                userEmail: '',
            }
        },

        async fetch(){
            
            const apiUrlForLoginNReg = this.$axios.defaults.baseURL;

            this.$nuxt.$options.head = {
                title: 'Fans - Change password',
                meta: [
                    
                    {name: 'description', content: "Change password if you forgot."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'Fans - Change password' },
                    { hid: 'og:description', property: 'og:description', content: "Change password if you forgot." },
                    { hid: 'og:image', property: 'og:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/change-password' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Fans - Change password' },
                    // { name: 'twitter:description', content: "Change password to continue with us." },
                    { name: 'twitter:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'Fans - Change password';
                window.scrollTo(0, 0);
            }

            await Promise.resolve();

        
        },

        created(){
            this.checkIfUserLoggedin();
        },

        methods: {
            recoverPassword(){
                this.isLoading = true;
                this.emailMessage = "";
                // this.submitFormMessage = "";
                if(this.email === ""){
                    this.emailMessage = "<span style='color:red;'>Please enter your email.</span>";
                    this.isLoading = false;
                }
                else{
                    const formData = {
                        "email": this.email
                    }
                    this.$axios.post('/api/check-if-email-exist', formData)
                    .then(response =>{
                        if(response.data.success === true){
                            this.emailFound = "second phase";
                            this.userIdFromDatabase = response.data.you_can_find_question_and_ans_here.id;
                            this.passwordRecoveryQuestion = response.data.you_can_find_question_and_ans_here.password_recovery_ques;
                            this.passwordRecoveryAnswer = response.data.you_can_find_question_and_ans_here.password_recovery_ans;
                            this.isLoading = false;
                        }
                        else if(response.data.success === false){
                            this.emailFound = "first phase";
                            this.$toast.error(response.data.message);
                            // this.submitFormMessage = "<span style='color:red;'>"+response.data.message+"</span>";
                            this.isLoading = false;
                        }
                        console.log(response.data);
                    })
                    .catch(error => {
                        this.$toast.error("Something went wrong!");
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong!</span>";
                        this.isLoading = false;
                        console.log(error);
                    });
                }
            },

            recoverPasswordSecondTime(){
                this.isLoading = true;
                // this.submitFormMessage = "";
                if(this.passwordRecoveryAnswer === this.selectedAnswer){
                    this.emailFound = "third phase";
                    this.isLoading = false;
                }
                else{
                    this.$toast.error("Answer did not match!");
                    // this.submitFormMessage = "<span style='color:red;'>Answer did not match!</span>";
                    // setTimeout(() => {
                    // 	this.submitFormMessage = '';
                    // }, 2000);
                    this.isLoading = false;
                }
            },

            recoverPasswordFinalStep(){
                this.isLoading = true;
                // this.submitFormMessage = "";
                this.changePasswordMessage = "";
                this.confirmPasswordMessage = "";
                console.log(this.changePassword.length);
                if(this.changePassword === "" || this.confirmPassword === "" || this.changePassword.length < 5 || this.changePassword.length > 20 || (this.changePassword !== this.confirmPassword) || (this.email === "" || this.userIdFromDatabase === "")){
                    if(this.changePassword === ""){
                        this.changePasswordMessage = "<span style='color:red;'>Password cannot be empty.</span>";
                    }
                    if(this.confirmPassword === ""){
                        this.confirmPasswordMessage = "<span style='color:red;'>Password cannot be empty.</span>";
                    }
                    if(this.changePassword.length < 5){
                        this.changePasswordMessage = "<span style='color:red;'>At least 5 characters need to be used.</span>";
                    }
                    if(this.changePassword.length > 20){
                        this.changePasswordMessage = "<span style='color:red;'>At most 20 characters can be used.</span>";
                    }
                    if(this.changePassword !== this.confirmPassword){
                        this.$toast.error("Password did not match.");
                        // this.submitFormMessage = "<span style='color:red;'>Password did not match.</span>";
                        this.isLoading = false;
                    }
                    if(this.email === "" || this.userIdFromDatabase === ""){
                        this.$toast.error("Something went wrong, please reload and try again.");
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong, please reload and try again.</span>";
                        this.isLoading = false;
                    }
                    this.isLoading = false;
                }
                else{
                    const formData = {
                        "email": this.email,
                        "userId": this.userIdFromDatabase,
                        "newPassword": this.changePassword
                    }
                    this.$axios.post('/api/change-password-now',formData)
                    .then(response =>{
                        if(response.data.success === true){
                            this.$toast.success(response.data.message);
                            // this.submitFormMessage = "<span style='color:green;'>"+response.data.message+"</span>";
                            this.email = "";
                            this.userIdFromDatabase = "";
                            this.changePassword = ""; 
                            this.confirmPassword = "";
                            
                            // setTimeout(() => {
                                // this.submitFormMessage = '';
                            this.$router.push(`/login`);
                            // }, 1000);
                            this.isLoading = false;
                        }
                        else{
                            this.$toast.error(response.data.message);
                            // this.submitFormMessage = response.data.message;
                            this.isLoading = false;
                        }
                        
                    })
                    .catch(error => {
                        this.isLoading = false;
                        this.$toast.error("Something went wrong, please reload and try again.");
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong, please reload and try again.</span>";
                        console.log(error);
                    });
                    
                    
                }
            },

            checkIfUserLoggedin(){
                if(process.client){
                    if(localStorage.getItem('token')){
                        this.$axios.post('/api/auth/check-if-user-logged-in', {
                            // other data you want to send
                        }, {
                            headers: {
                                'Authorization': `Bearer ${this.token}`
                            }
                        })
                        .then(response =>{
                            console.log(response.data);
                            if(response.data.success === true && response.data.message === "User logged in"){
                                this.emailFound = "second phase";
                                this.userEmail = response.data.userInfoFromTk.email;
                                this.email = this.userEmail;
                                this.userIdFromDatabase = response.data.userInfoFromTk.id;
                                this.passwordRecoveryQuestion = response.data.userInfoFromTk.password_recovery_ques;
                                this.passwordRecoveryAnswer = response.data.userInfoFromTk.password_recovery_ans;
                                // this.$router.push(`/`);
                                // this.userId = response.data.userInfoFromTk.id;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    // else{
                    //     //no token means no user logged in
                    //     console.log("no token in storage");
                    // }
                }
            }
        }
    }
</script>
