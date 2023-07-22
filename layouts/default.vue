<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="width: 100% !important">
            <img class="navbar-brand navbar-logo-custom" :src="apiUrl+'/logo/favicon2.png'" alt="logo" @click="gotoHome()">
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="collapse = false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" :class="{'hide-navbar-now': collapse}" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/" :class="{ 'active': activeLink === 'home' }" @click="collapse = true,activeLink = 'home'">Home</router-link>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-truncate" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Industry
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NuxtLink class="dropdown-item capitalized" v-for="(industryName, index) in allIndustry" :key="index" :class="{ 'active': activeLink === industryName.which_industry }" :to="'/industry/'+industryName.which_industry" @click="transferIndustryTo(industryName.which_industry)">{{industryName.which_industry}}</NuxtLink>
                            
                        </div>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/countries" :class="{ 'active': activeLink === 'countries' }" @click="collapse = true,activeLink = 'countries'">Countries</router-link>
                    </li>
                    
                </ul>
                <hr class="my-1">
                <ul class="navbar-nav ml-auto" :class="{'d-none': foundLoggedinUser}"> <!-- d-none -->
                    <li class="nav-item">
                        <a class="nav-link" :class="{ 'active': activeLink === 'login' }" href="" @click="loginClicked()">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ 'active': activeLink === 'registration' }" href="" @click="registrationClicked()">Registration</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" :class="{'d-none': !foundLoggedinUser}">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-truncate" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :title="userEmail">
                            {{userEmail}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/change-password" :class="{ 'active': activeLink === 'changePassword' }" @click="collapse = true,activeLink = 'changePassword'">Change password</router-link>
                            
                            <div class="dropdown-divider"></div>
                            <a href="" class="dropdown-item" @click="logoutClicked()">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="content">
            <Nuxt/>
        </div>
        <div>
            <!-- Sticky footer -->
            <footer class="footer">
                <div class="container text-white">
                    <div class="row">
                        <div class="col-md-7">
                            <h5>Contact Information</h5>
                            <ul>
                                <li>Email: <a href="mailto:contact@example.com">contact@example.com</a></li>
                                <li>Phone: <a href="tel:+11234567890">+1 123-456-7890</a></li>
                            </ul>
                        </div>
                        <div class="col-md-5">
                            <h5>Connect with Us</h5>
                            <ul>
                                <li><a href="https://www.facebook.com/YourWebsiteName">Facebook</a></li>
                                <li><a href="https://twitter.com/YourWebsiteName">Twitter</a></li>
                                <li><a href="https://www.instagram.com/YourWebsiteName">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>
                                Disclaimer: [Your Website Name] is an independent platform and is not affiliated with any particular star or celebrity.
                                All content, including text, images, and logos displayed on [Your Website Name], is protected by copyright laws.
                            </p>
                            <p>
                                <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-and-conditions">Terms and Conditions</a> | <!-- <a href="/copyright">Copyright Notice</a> |--> <a href="/about-us">About us</a> | <a href="/report-problem">Report a Problem</a>
                            </p>
                            <p>&copy; [Year] [Your Website Name]. All rights reserved. | Designed and developed by [Your Name].

                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    head: {
        link: [
            {rel: 'preconnect', href: 'https://fonts.bunny.net' },
            {rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=figtree:400,600&display=swap',},
            {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',},
            {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',},
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        script: [
            {src:'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',},
            {src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',},
            {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
        ],
    },

    data: () => ({
        apiUrl: null,
        collapse: false,
        foundLoggedinUser: false,
        userEmail: '',
        token: process.client ? localStorage.getItem('token') : '',
        currentPage: '',
        activeLink: '',
        allIndustry: [],
        currentLocation: process.client ? window.location.pathname : '',
    }),

    async fetch() {
        this.apiUrl = this.$axios.defaults.baseURL;
        const response = await this.$axios.$get('/api/get-list-of-industries')
        // console.log(response);
        if(response.success === true){
            this.allIndustry = response.all_industry;
        }
        else{
            this.allIndustry = [];
        }
        
    },

    created(){

        // if(process.client){
        //     this.token = localStorage.getItem('token');
        //     // this.currentLocation = window.location.pathname;
        // }
        
        // console.log("window.location.href: "+window.location.href); // current URL
        // console.log("window.location.pathname: "+window.location.pathname); // path of the current URL
        // console.log("window.location.hash: "+window.location.hash); // anchor part of the current URL
        // console.log("window.location.search: "+window.location.search); // query string part of the current URL
        this.$nuxt.$on('class-changed', ($event) => this.updateSpecificDivClass($event))
        this.checkIfUserLoggedin();
        // this.getListOfIndustries();
        this.getCurrentWindowLocation();
    },

    methods:{
        gotoHome(){
            this.collapse = true;
            this.activeLink = 'home';
            this.$router.push('/');
        },
        
        getCurrentWindowLocation(){
            const parts = this.currentLocation.split('/');
            // if((parts[1] === "" || parts[1] === "polls") && !parts[2]){
            //     this.activeLink = 'home';
            // }
            if(parts[1] === "industry" && parts[2] && parts[2].length > 0){
                this.activeLink = parts[2];
            }
            else if(parts[1] === "countries"){
                this.activeLink = 'countries';
            }
            else if(parts[1] === "change-password"){
                this.activeLink = 'changePassword';
            }
            else if(parts[1] === "login"){
                this.activeLink = 'login';
            }
            else if(parts[1] === "create-account"){
                this.activeLink = 'registration';
            }
            else{
                this.activeLink = 'home';
            }
        },
        transferIndustryTo(industry){
            this.collapse = true;
            this.activeLink = industry;
            // this.$router.push(`/industry/${industry}`);
            // '/polls/'+industyName
        },
        getListOfIndustries(){
            this.$axios.get('/api/get-list-of-industries')
            .then(response =>{
                console.log(response);
                if(response.data.success === true){
                    response.data.all_industry.forEach(item =>{
                        this.allIndustry.push(item);
                    })
                }

            })
            .catch(error =>{
                console.log(error); 
            })
        },
        
        setActiveLink(link) {
            this.collapse = true;
            this.activeLink = link;
        },

        updateSpecificDivClass(usersEmailFromComponent){
            console.log("ifUser: ",usersEmailFromComponent);
            if(usersEmailFromComponent !== ""){
                this.userEmail = usersEmailFromComponent;
                this.foundLoggedinUser = true;
            }
            else{
                this.userEmail = null;
                this.foundLoggedinUser = false;
            }
        },

        checkIfUserLoggedin(){
            if(process.client){
                const formData = new FormData();
                formData.append("token", this.token);
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
                            this.foundLoggedinUser = true;
                            this.userEmail = response.data.userInfoFromTk.email;
                            // this.userId = response.data.userInfoFromTk.id;
                        }
                        else{
                            this.foundLoggedinUser = false;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.foundLoggedinUser = false;
                    });
                }
                // else{
                //     //no token means no user logged in
                //     console.log("no token in storage");
                // }
            }
        },

        logoutClicked(){
            event.preventDefault();
            if(process.client){
                this.collapse = true;
                // localStorage.setItem('logout', 'clicked');
                this.currentPage = window.location.pathname;
                console.log("what is currentpage: "+this.currentPage);
                localStorage.removeItem('token');
                this.userEmail = null;
                this.foundLoggedinUser = false;
                if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                    this.currentPage = "/";
                    this.activeLink = 'home';
                }
                this.$router.push(this.currentPage);
                const parts = this.currentPage.split('/');
                if((parts[1] === "" || parts[1] === "polls") && !parts[2]){
                    this.activeLink = 'home';
                }
                else if(parts[1] === "polls" && parts[2] && parts[2].length > 0){
                    this.activeLink = parts[2];
                }
                else if(parts[1] === "countries"){
                    this.activeLink = 'countries';
                }
                else if(parts[1] === "change-password"){
                    this.activeLink = 'changePassword';
                }
                else if(parts[1] === "login"){
                    this.activeLink = 'login';
                }
                else if(parts[1] === "create-account"){
                    this.activeLink = 'registration';
                }
            }
        },

        loginClicked(){
            event.preventDefault();
            if(process.client){
                this.collapse = true;
                this.activeLink = 'login';
                this.currentPage = window.location.pathname;
                if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                    this.currentPage = "/";
                }
                localStorage.setItem('load-page', this.currentPage);
                this.$router.push("/login");
            }
        },

        registrationClicked(){
            event.preventDefault();
            if(process.client){
                this.collapse = true;
                this.activeLink = 'registration';
                this.currentPage = window.location.pathname;
                if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                    this.currentPage = "/";
                }
                localStorage.setItem('load-page', this.currentPage);
                this.$router.push("/create-account");
            }
        }
    }
}
</script>
