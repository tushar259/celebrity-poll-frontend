<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 log-reg-pas-container">
                <img class="log-reg-logo-image mx-auto d-block" :src="apiUrl+'/logo/favicon2.png'" alt="logo">
                <h2 class="text-center">Login</h2>
                <div class="text-center lite-color-in-project">Login to continue with us.</div>
                <div class="px-20-gap"></div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" v-model="email" @keyup.enter="loginNow()" placeholder="Email address">
                    <small v-html="emailMessage"></small>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input :type="passwordType" class="form-control" id="password" v-model="password" @keyup.enter="loginNow()" placeholder="Password">
                    <!-- <button class="btn btn-outline-secondary" type="button" id="togglePassword" onclick="togglePasswordVisibility()">
                        <i class="fas fa-eye" id="eyeIcon"></i>
                    </button> -->
                    <small v-html="passwordMessage"></small>
                    <div class="show-password-div">
                        <input class="form-check-input" type="checkbox" id="showPasswordCheckbox" name="showPasswordCheckbox" style="vertical-align: middle;" v-model="showPassword" @click="showPasswordClicked()">
                        <label for="showPasswordCheckbox" style="margin-left: 5px;" @click="showPasswordClicked()">Show password</label>
                    </div>
                </div>
                <!-- <div class="form-check"> -->
  <!-- <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked> -->
  <!-- <label class="form-check-label" for="flexCheckChecked">
    Checked checkbox
  </label> -->
<!-- </div> -->
                <div class="form-group text-right">
                    <router-link to="/change-password" class="forgot-password-link">Forgot password?</router-link>
                </div>
                <small v-html="submitFormMessage"></small>
                <button class="btn btn-primary btn-block" @click="loginNow()" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
                <div class="px-20-gap"></div>
                <div class="log-reg-or-sign"><span>or</span></div>
                <div class="px-5-gap"></div>
                <div class="text-center">
                    <span>Don't have account? </span><router-link to="/create-account" :disabled="isLoading">Create an account</router-link>
                </div>
                <div class="px-5-gap"></div>
                
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
                apiUrl: null,
                email: '',
                password: '',
                token: process.client ? localStorage.getItem('token') : '',
                userEmail: '',
                userId: '',
                emailMessage: '',
                passwordMessage: '',
                submitFormMessage: '',
                isLoading: false,
                showPassword: false,
                passwordType: 'password',
            }
        },

        async fetch() {
            const apiUrlForLoginNReg = this.$axios.defaults.baseURL;

            this.$nuxt.$options.head = {
                title: 'PollDiary - Login',
                meta: [
                    
                    {name: 'description', content: "Login to continue with us."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Login' },
                    { hid: 'og:description', property: 'og:description', content: "Login to continue with us." },
                    { hid: 'og:image', property: 'og:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/login' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Login' },
                    { name: 'twitter:description', content: "Login to continue with us." },
                    { name: 'twitter:image', content: apiUrlForLoginNReg+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'PollDiary - Login';
                window.scrollTo(0, 0);
            }

            await Promise.resolve();

        },

        created(){
            this.apiUrl = this.$axios.defaults.baseURL;
            // console.log(this.token);
            // localStorage.removeItem('token');
            this.checkIfUserLoggedin();
        },

        methods: {
            showPasswordClicked(){
                if(this.showPassword){
                    this.passwordType = "password";
                }
                else{
                    this.passwordType = "";
                }
            },

            loginNow(){
                // toast.success('Hello, Vue Toast!');
                if(process.client){
                    this.isLoading = true;
                    this.email = this.email.replace("<", "");
                    this.emailMessage = "";
                    this.passwordMessage = "";
                    this.submitFormMessage = "";
                    if(this.email === "" || this.password === ""){
                        if(this.email === ""){
                            this.emailMessage = "<span style='color:red;'>Please enter email address.</span>"
                        }
                        if(this.password === ""){
                            this.passwordMessage = "<span style='color:red;'>Please enter password.</span>"
                        }
                        this.isLoading = false;
                    }
                    else{
                        const formData = {
                            'email': this.email,
                            'password': this.password
                        };

                        this.$axios.post('/api/auth/login', formData)
                        .then(response => {
                            // console.log(response.data);
                            if(response.data.success === true){
                                localStorage.setItem('token', response.data.token);
                                this.email = "";
                                this.password = "";
                                this.userEmail = response.data.userEmail;
                                this.isLoading = false;
                                this.$nuxt.$emit('class-changed', this.userEmail);
                                if(localStorage.getItem('load-page') && localStorage.getItem('load-page').length > 0){
                                    this.$router.push(localStorage.getItem('load-page'));
                                }
                                else{
                                    this.$router.push(`/`);
                                }
                            }
                            else if(response.data.success === false){
                                this.$toast.error('Email or password did not match!');
                                // this.submitFormMessage = "<span style='color:red;'>Email or password did not match.</span>"
                                this.isLoading = false;
                            }
                        })
                        .catch(error => {
                            // console.log(error);
                            if(error.response.data.errors.email){
                                this.emailMessage = "<span style='color:red;'>"+error.response.data.errors.email[0]+"</span>";
                            }
                            if(error.response.data.errors.password){
                                this.passwordMessage = "<span style='color:red;'>"+error.response.data.errors.password[0]+"</span>";
                            }
                            this.isLoading = false;
                        });
                        // this.isLoading = false;
                    }
                }
            },

            checkIfUserLoggedin(){
                // const formData = new FormData();
                // formData.append("token", this.token);
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
                                this.userEmail = response.data.userInfoFromTk.email;
                                this.$router.push(`/`);
                                // this.userId = response.data.userInfoFromTk.id;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    else{
                        console.log("no token in storage");
                    }
                }
            }
        }
    }
</script>
