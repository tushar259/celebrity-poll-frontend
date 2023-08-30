<template>
    <div v-if="pollFound == false" class="parent-background">
        Page not found
    </div>
    <div v-else-if="pollFound == null" class="loading-spinner-view parent-background">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else-if="pollFound == true" class="parent-background">
        <div v-if="thumbnail != ''" class="custom-thumbnail">
            <div class="image-card">
                <div class="image-card-body">
                    <img :src="apiUrl+'/'+thumbnail">
                    <br>
                    <p class="texts-under-thumbnail">image courtesy: Google, Facebook, Instagram, Twitter, Pinterest, Wikipedia, IMDB, etc.</p>
                    <h1 class="poll-title texts-under-thumbnail">{{pollTitle}}?</h1>
                    <div class="d-flex align-items-center texts-under-thumbnail">
                        <div class="poll-date">Started - {{startingDate}}</div>
                        <div class="distance-between-two custom-align">&bull;</div>
                        <div class="poll-date">Closing - {{endingDate}}</div>
                    </div>
                </div>
                <div class="px-15-gap"></div>
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-6">
                <div class="styling-link font-selected">
                    <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                    <router-link :to="'/industry/'+whichIndustry" class="navigator-link capitalized">{{whichIndustry}}</router-link><div class="navigator-link-divider">/</div>
                    <router-link :to="'/poll/'+pollId" class="navigator-link">{{pollId}}</router-link>
                </div>
            </div>
            <div class="col-md-6" style="text-align: right;">
                
                <div class="btn-group">
                    <button type="button" id="shareButton" class="btn btn-primary share-button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span><i class="fas fa-share-alt"></i> Share</span>
                    </button>
                    <ul class="dropdown-menu share-dropdown-button">
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="facebook" style="margin-right: 0px;" @click="shareOnFacebook">
                                <img :src="apiUrl+'/logo/Facebook-logo.png'" alt="Facebook Share" style="height: 30px;width: 48px;">
                            </a>
                        
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="twitter" style="margin-right: 8px;" @click="shareOnTwitter">
                                <img :src="apiUrl+'/logo/Twitter-logo.svg.png'" alt="Twitter Share" style="height: 24px;width: 31px;">
                            </a>
                        
                            <!-- <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="instagram" @click="shareOnInstagram">
                                <img :src="apiUrl+'/logo/Instagram_logo_2016.svg.webp'" alt="LinkedIn Share" style="height: 27px;width: 27px;">
                            </a> -->
                            <a href="#" @click="copyLinkToClipboard()">
                                <i class="fas fa-copy fa-lg"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-5 custom-column">
                <div class="poll-page-custom-card">
                    <h5>{{ pollTitle }}?</h5>
                    <span class="lite-color-in-project">Participate in Poll, Cast your vote.</span>
                    <div class="px-30-gap"></div>
                    <div  v-for="(poll, index) in pollsVoted" :key="index" class="polls-in-page">
                        <div class="form-check">
                            <input class="form-check-input exampleRadios-in-poll" type="radio" name="exampleRadios" :id="`exampleRadios${index}`" @change="selectedOptionToVote(poll.id, poll.polls)" :value="poll.id">
                            
                            <div class="total-votes">
                                <div class="votes-received-here" :style="{'width': poll.percent + '%'}"></div>
                                <label class="form-check-label font-weight-in-poll d-flex justify-content-between align-items-center capitalized" :for="`exampleRadios${index}`">
                                    {{poll.polls}}
                                    <div></div>
                                    <span class="poll-votes-color">{{poll.percent}}%</span>
                                    
                                </label>
								
                                
                            </div>
                            <small class="lite-color-in-project">{{formatNumber(poll.votes)}} votes</small>
                            <div class="px-10-gap"></div>
                            
                        </div>
                    </div>
                    <div class="total-votes-count-in-poll-page">Total {{formatNumber(totalVotes)}}</div>
                    <div class="custom-align">
                        

                        <button type="button" class="btn mt-3" @click="preCheckBeforeVote()" :disabled="disableVote">Vote</button>
                    </div>
                </div>
            </div>
            <div class="col-md-7 custom-column" v-if="beforePollDescription !== ''">
                <div class="poll-page-custom-card">
                    <div v-html="beforePollDescription" class="poll-details"></div>
                    
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    import moment from 'moment';
    // import { useToast } from 'vue-toastification';
    // const toast = useToast();
    export default {

        head:{
            meta:[
                
                { charset: 'UTF-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                { name: 'robots', content: 'index, follow' },
                

                // {name: 'description', content: "polls, poll, lionel messi, messi, ronaldo, cristiano ronalo, neymar, neymar jr, ronaldinho, shah rukh khan, srk, salman khan, salman, bts, taehyung, v, jungkook, jinn, black pink, momoland, nancy jewel mcdonie, katrina kaif, katrina, deepika padukone, deepika, alia bhatt, alia, ileana d'cruz, aishwarya rai, akshay kumar, hrithik roshan, ranveer singh, ranbir kapoor, kareena kapoor, virat kohli, rohit sharma, ms dhoni" },
                
            ],
            script: [
                // Add the Bootstrap JavaScript link here
                // { src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js' },
            ],
        },

        data: () => ({
            apiUrl: null,
            pollId: null,
            pollFound: null,
            pollTitle: '',
            beforePollDescription: '',
            afterPollDescription: '',
            whichIndustry: '',
            startingDate: '',
            endingDate: '',
            pollsVoted: [],
            imagesFound: [],
            totalVotes: 0,
            thumbnail: '',
            idSelectedToVote: '',
            tableNameStartsWith: '',
            disableVote: false,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            voteMessage: '',
            pageDescriptionForMeta: '',
            selectedPollTagName: ''
        }),

        async fetch() {
            this.apiUrl = this.$axios.defaults.baseURL;
            this.pollId = this.$route.params.pollid;
            this.pollId = this.pollId.replace(/:/g, '');
            this.pollId = this.pollId.replace(/-/g, ' ');
            const formData = {
                'pollId': this.pollId
            }

            const response = await this.$axios.post('/api/get-poll-info', formData);

            if(response.data.success === true){
                this.pollFound = true;
                this.pollTitle = response.data.title_n_other_info.poll_title;
                this.beforePollDescription = response.data.title_n_other_info.before_poll_description;
                this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                this.whichIndustry = response.data.title_n_other_info.which_industry;
                this.startingDate = moment(response.data.title_n_other_info.starting_date).format('D MMM YYYY');
                this.endingDate = moment(response.data.title_n_other_info.ending_date).format('D MMM YYYY');
                this.tableNameStartsWith = response.data.title_n_other_info.table_name_starts_with;
                
                response.data.polls_n_counts.forEach(item => {
                    
                    if(((item.votes / response.data.total_votes) * 100).toFixed(2) > 0){
                        item.percent = ((item.votes / response.data.total_votes) * 100).toFixed(2);
                    }
                    else{
                        item.percent = 0;
                    }
                    this.pollsVoted.push(item);
                    this.pageDescriptionForMeta += item.polls +':('+item.percent+'%), ';
                });

                this.totalVotes = parseInt(response.data.total_votes);
                
                if(response.data.images_uploaded[0]){
                    this.thumbnail = response.data.images_uploaded[0].placeholder;
                }
                
            }
            else{
                this.pollFound = false;
            }

            this.$nuxt.$options.head = {
                title: 'Poll - '+this.pollTitle,
                meta: [
                    
                    {name: 'description', content: 'Popular website conducted a poll. '+this.pageDescriptionForMeta},

                    {name: 'description', content: this.beforePollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'Poll - '+this.pollTitle },
                    { hid: 'og:description', property: 'og:description', content: 'Popular website conducted a poll. '+this.pageDescriptionForMeta },
                    { hid: 'og:image', property: 'og:image', content: this.apiUrl+'/'+this.thumbnail },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/poll/'+this.pollId },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Poll - '+this.pollTitle },
                    { name: 'twitter:description', content: 'Popular website conducted a poll. '+this.pageDescriptionForMeta },
                    { name: 'twitter:image', content: this.apiUrl+'/'+this.thumbnail },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'Poll - '+this.pollTitle;
                // window.scrollTo(0, 500);
            }
        },

        created() {
            // if(process.client){
            //     document.title = 'Fans - '+this.pollTitle;
            // }
            // const protocol = window.location.protocol; // e.g., "http:" or "https:"
            // const hostname = window.location.hostname; // e.g., "www.example.com"
            // const port = window.location.port; // e.g., "8080" (if exists)
            // const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
            // console.log(url);

            // this.getPollInfo();

            // if(process.client){
            //     window.scrollTo(0, 0);
            // }
        },

        beforeMount(){
            // if(process.client){
            //     window.scrollTo(0, 0);
            // }
        },

        methods: {
            copyLinkToClipboard(){
                if(process.client){
                    const urlToCopy = window.location.href;
                    const dummyTextArea = document.createElement('textarea');
                    dummyTextArea.value = urlToCopy;
                    document.body.appendChild(dummyTextArea);
                    dummyTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummyTextArea);

                    this.$toast.success('Link copied to clipboard!');
                }
            },
            shareOnFacebook() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.pollTitle;
                    const description = 'Your Description';
                    const imageUrl = url+'/'+this.thumbnail;
                    const pageUrl = currentLink;

                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(description)}&hashtag=${encodeURIComponent(title)}&picture=${encodeURIComponent(imageUrl)}`;
                    // const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentLink)}`;
                    window.open(shareUrl, '_blank');
                }
            },

            shareOnTwitter() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.pollTitle+'\r\n';
                    const description = 'Your Description, Check out this link! ';
                    const imageUrl = url+'/'+this.thumbnail;
                    const pageUrl = currentLink;
                    const twitterUsername = 'Company_UserName';

                    const text = `${title} ${description} ${imageUrl}`;

                    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}&via=${twitterUsername}`;
                    // const text = "Check out this link!";
                    // const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentLink)}&text=${encodeURIComponent(text)}`;
                    // const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentLink)}`;
                    window.open(shareUrl, '_blank');
                }
            },

            shareOnInstagram() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.pollTitle;
                    const description = 'Your Description';
                    const imageUrl = url+'/'+this.thumbnail;
                    const pageUrl = currentLink;
                    const text = `Check out this link! ${imageUrl} ${title} ${description} ${pageUrl}`;
                    const shareText = encodeURIComponent(text);
                    const shareUrl = `https://www.instagram.com/?text=${shareText}`;
                    // const shareText = encodeURIComponent(`Check out this link: ${currentLink}`);
                    // const shareUrl = `https://www.instagram.com/?text=${shareText}`;
                    window.open(shareUrl, '_blank');
                }
            },
            formatNumber(number) {
                return number.toLocaleString();
            },

            getPollInfo(){
                // const formData = new FormData();
                this.pollId = this.pollId.replace(":", "");
                // formData.append('pollId', this.pollId);
                const formData = {
                    'pollId': this.pollId
                }
                this.$axios.post('/api/get-poll-info', formData)
                .then(response => {
                    if(response.data.success === true){
                        this.pollFound = true;
                        this.pollTitle = response.data.title_n_other_info.poll_title;
                        this.beforePollDescription = response.data.title_n_other_info.before_poll_description;
                        this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                        this.whichIndustry = response.data.title_n_other_info.which_industry;
                        this.startingDate = moment(response.data.title_n_other_info.starting_date).format('D MMM YYYY');
                        this.endingDate = moment(response.data.title_n_other_info.ending_date).format('D MMM YYYY');
                        this.tableNameStartsWith = response.data.title_n_other_info.table_name_starts_with;

                        // console.log(response.data );
                        // let pollObject = {
                        //     "polls": "",
                        //     "votes": 0,
                        //     "percent": 0
                        // };
                        // console.log(this.beforePollDescription);
                        
                        response.data.polls_n_counts.forEach(item => {
                            // pollObject.polls = item.polls;
                            // pollObject.votes = item.votes;
                            // if(((item.votes / response.data.total_votes) * 100).toFixed(2) > 0){
                            //     pollObject.percent = ((item.votes / response.data.total_votes) * 100).toFixed(2);
                            // }
                            // else{
                            //     pollObject.percent = 0;
                            // }

                            if(((item.votes / response.data.total_votes) * 100).toFixed(2) > 0){
                                item.percent = ((item.votes / response.data.total_votes) * 100).toFixed(2);
                            }
                            else{
                                item.percent = 0;
                            }
                            this.pollsVoted.push(item);
                        });

                        this.totalVotes = parseInt(response.data.total_votes);
                        
                        if(response.data.images_uploaded[0]){
                            this.thumbnail = response.data.images_uploaded[0].placeholder;
                        }
                        
                        
                        // response.data.images_uploaded.forEach(item => {
                        //     this.imagesFound.push(item);
                        // });
                        // let blob = "";
                        // response.data.images_uploaded.forEach(item => {
                        //     // blob = new Blob([item.placeholder]);
                        //     // blob = new Blob([new Uint8Array(item.placeholder)]);
                        //     console.log(item.placeholder);
                        //     this.imagesFound.push("/../"+item.placeholder);
                        // });

                        // console.log(this.imagesFound);
                    }
                    if(response.data.success === false && response.data.message === "Found error while fetching data"){
                        this.pollFound = false;
                    }
                    if(response.data.success === false && response.data.message === "Poll not found"){
                        // this.$router.push('/*');
                        this.pollFound = false;
                    }
                    // console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            },

            selectedOptionToVote(id, name){
                // console.log(id);
                this.idSelectedToVote = id;
                this.selectedPollTagName = name;
            },

            checkIfUserLoggedin(){
                if(process.client){
                    return new Promise((resolve, reject) => {
                        
                        // const formData = {
                        //     "token": this.token
                        // };
                        if(localStorage.getItem('token')){
                            this.$axios.post('/api/auth/check-if-user-logged-in', {
                                // other data you want to send
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${this.token}`
                                }
                            })
                            .then(response =>{
                                // console.log(response.data);
                                if(response.data.success === true && response.data.message === "User logged in"){
                                    this.userEmail = response.data.userInfoFromTk.email;
                                    resolve(true);
                                    // this.$router.push(`/`);
                                    // this.userId = response.data.userInfoFromTk.id;
                                }
                                else{
                                    resolve(false);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                resolve(false);
                            });
                        }
                        else{
                            resolve(false);
                            // console.log("no token in storage");
                        }
                    });
                }
            },

            preCheckBeforeVote(){
                // this.disableVote = true;
                // this.voteMessage = "";
                // if(this.token.length > 0){
                //     let value = await this.checkIfUserLoggedin();
                //     console.log("is he logged in: "+this.userEmail);
                //     if(value == true){
                //         this.voteNow();
                //     }
                //     else{
                //         this.disableVote = false;
                //         this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                //         setTimeout(() => {
                //             this.voteMessage = "";
                //         }, 2000);
                        
                //     }
                // }
                // else{
                //     this.disableVote = false;
                //     this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                //     setTimeout(() => {
                //         this.voteMessage = "";
                //     }, 2000);
                // }
                if(process.client){
                    this.disableVote = true;
                    // this.voteMessage = "";
                    if(localStorage.getItem('token')){
                        if (this.token.length > 0) {
                            this.checkIfUserLoggedin().then((value) => {
                                // console.log("Is he logged in: " + this.userEmail);
                                if (value === true) {
                                    this.voteNow();
                                } 
                                else{
                                    this.disableVote = false;
                                    this.$toast.error("You need to login.");
                                    // this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                                    // setTimeout(() => {
                                    //     this.voteMessage = "";
                                    // }, 2000);
                                }
                            }).catch((error) => {
                                this.disableVote = false;
                                console.log(error);
                                this.$toast.error("You need to login.");
                                // this.voteMessage = "<span style='color:red;'>Server went down.</span>";
                                // setTimeout(() => {
                                //     this.voteMessage = "";
                                // }, 2000);
                            });
                        }
                        else{
                            this.disableVote = false;
                            this.$toast.error("You need to login.");
                            // this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                            // setTimeout(() => {
                            //     this.voteMessage = "";
                            // }, 2000);
                        }
                    }
                    else{
                        this.disableVote = false;
                        this.$toast.error("You need to login.");
                    }
                }
            },

            voteNow(){
                
                if(this.idSelectedToVote === "" || this.idSelectedToVote === null){
                    this.disableVote = false;
                    this.$toast.warning("Please select an option.")
                    // this.voteMessage = "<span style='color:red;'>Please select an option.</span>";
                    // setTimeout(() => {
                    //     this.voteMessage = "";
                    // }, 2000);
                }
                else{
                    
                    const formData = {
                        "selected_id": this.idSelectedToVote,
                        "table_name_starts_with": this.tableNameStartsWith,
                        "email": this.userEmail
                    };
                    this.$axios.post('/api/vote-selected-candidate', formData)
                    .then(response => {
                        // console.log(response);
                        this.pollsVoted = [];
                        if(response.data.success === true){
                            response.data.new_polls.forEach(item => {
                                // const votesNumber = parseInt(item.votes);
                                if(((item.votes / response.data.total_votes) * 100).toFixed(2) > 0){
                                    item.percent = ((item.votes / response.data.total_votes) * 100).toFixed(2);
                                }
                                else{
                                    item.percent = 0;
                                }
                                
                                // item.votes = votesNumber.toLocaleString();
                                item.votes = parseInt(item.votes);
                                this.pollsVoted.push(item);
                            });
                            this.totalVotes = parseInt(response.data.total_votes);
                            if(response.data.message === "You have already voted."){
                                this.$toast.success(response.data.message);
                            }
                            else{
                                this.$toast.success("You have voted '"+this.capitalizeWords(this.selectedPollTagName)+"'");
                            }
                            
                            // this.voteMessage = "<span style='color:green;'>"+response.data.message+"</span>";
                        }
                        this.disableVote = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.disableVote = false;
                    });
                }
            },

            capitalizeWords(inputString) {
                return inputString
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
            
        }
    }
</script>
