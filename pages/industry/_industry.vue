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
        
        <div class="row poll-page-background">
            
            <div class="styling-link-for-home font-selected">
                <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                <router-link to="" class="navigator-link capitalized">{{industryName}}</router-link>
            </div>
            
            <div class="col-md-6 list-of-anything">
                
                <h6 class="poll-heads-in-all-poll-new"><span>New polls</span></h6>
                <div v-if="allRecentPollsFound == true">
                    <div v-for="(poll, index) in allRecentUploadedPolls" :key="index">
                        <router-link class="card my-3 custom-card-border" :to="'/poll/'+poll.table_name_starts_with"> 
                            
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong>
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Closing {{poll.ending_date}}</span>
                                    <div class="px-20-gap"></div>
                                    <div v-for="(tag, indexT) in poll.poll_tags" :key="indexT" class="card-name-n-votes">
                                        <div v-if="indexT <= 1">
                                            <span v-if="indexT !== poll.poll_tags.length - 1">
                                                <b>{{tag.polls}}</b> ({{tag.votes}} votes),&nbsp;
                                            </span>
                                            <span v-else>
                                                <b>{{tag.polls}}</b> ({{tag.votes}} votes)
                                            </span>
                                        </div>
                                    </div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                        <div v-if="index%6==0">
                            <!-- ad -->
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-md-6" >
                
                <h6 class="poll-heads-in-all-poll-new"><span>Recent results</span></h6>
                <div v-if="resultPollsFound == true">
                    <div v-for="(poll, index) in resultAllPolls" :key="index">
                        <router-link class="card my-3 custom-card-border" :to="'/poll-winner/'+poll.table_name_starts_with">
                            
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong> <!-- <span class="custom-card-winning-date">(Published {{poll.updated_at}})</span> -->
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Published {{poll.updated_at}}</span>
                                    <div class="px-20-gap"></div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div class="px-10-gap"></div>
                <h6 class="poll-heads-in-all-poll-new"><span>Polls ending</span></h6>

                <div v-if="allPollFound == true">
                    <div v-for="(poll, index) in allPolls" :key="index">

                        <router-link class="card my-3 custom-card-border" :to="'/poll/'+poll.table_name_starts_with">
                            
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong>
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Closing {{poll.ending_date}}</span>
                                    <div class="px-20-gap"></div>
                                    <div v-for="(tag, indexT) in poll.poll_tags" :key="indexT" class="card-name-n-votes">
                                        <div v-if="indexT <= 1">
                                            <span v-if="indexT !== poll.poll_tags.length - 1">
                                                <b>{{tag.polls}}</b>({{tag.votes}} votes),&nbsp;
                                            </span>
                                            <span v-else>
                                                <b>{{tag.polls}}</b>({{tag.votes}} votes)
                                            </span>
                                        </div>
                                    </div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                        <div v-if="index%3==0">
                            <!-- ad -->
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import FormData from 'form-data';
    export default {

        head:{
            meta:[
                
                { charset: 'UTF-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                { name: 'robots', content: 'index, follow' },
                

                {name: 'description', content: "polls, poll, lionel messi, messi, ronaldo, cristiano ronalo, neymar, neymar jr, ronaldinho, shah rukh khan, srk, salman khan, salman, bts, taehyung, v, jungkook, jinn, black pink, momoland, nancy jewel mcdonie, katrina kaif, katrina, deepika padukone, deepika, alia bhatt, alia, ileana d'cruz, aishwarya rai, akshay kumar, hrithik roshan, ranveer singh, ranbir kapoor, kareena kapoor, virat kohli, rohit sharma, ms dhoni" },
                
            ]
        },
        
        data: () => ({
            apiUrl: null,
            industryName: null,
            allPolls: [],
            pollFound: null,
            allPollFound: null,
            resultAllPolls: [],
            resultPollsFound: null,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            allRecentUploadedPolls: [],
            allRecentPollsFound: null,
            pageDescriptionForMeta: ''

        }),

        async fetch() {
            this.apiUrl = this.$axios.defaults.baseURL;
            this.industryName = this.$route.params.industry;

            this.allRecentUploadedPolls = [];
            this.allPolls = [];
            this.resultAllPolls = [];

            let allRecentPollsFound = false;
            let allPollFound = false;
            let resultPollsFound = false;

            const formData = new FormData();
            if (this.industryName !== null){
                this.industryName = this.industryName.replace(":", "");
            }
            formData.append('industryName', this.industryName);
            const recentPolls = await this.$axios.post('/api/get-all-recent-uploaded-poll-industry-wise', {"industryName": this.industryName});
            const endingPolls = await this.$axios.post('/api/get-all-poll-industry-wise', {"industryName": this.industryName});
            const pollResults = await this.$axios.post('/api/get-result-list-poll-industry-wise', {"industryName": this.industryName});
            
            // console.log("recentPolls: ", recentPolls);
            if(recentPolls.data.success === true){
                this.pollFound = true;
                allRecentPollsFound = true;
                recentPolls.data.all_polls.forEach(item => {
                    item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                    this.pageDescriptionForMeta += item.poll_title +'. ';
                    this.allRecentUploadedPolls.push(item);
                });
                
            }
            else{
                allRecentPollsFound = false;
            }


            if(endingPolls.data.success === true){
                this.pollFound = true;
                allPollFound = true;
                endingPolls.data.all_polls.forEach(item => {
                    item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                    this.pageDescriptionForMeta += item.poll_title +'. ';
                    this.allPolls.push(item);
                });
                
            }
            else{
                allPollFound = false;
            }


            if(pollResults.data.success === true){
                this.pollFound = true;
                resultPollsFound = true;
                pollResults.data.all_poll_result.forEach(item => {
                    item.updated_at = this.beautifyTime(item.updated_at);
                    this.pageDescriptionForMeta += item.poll_title +'. ';
                    this.resultAllPolls.push(item);
                });
            }
            else{
                resultPollsFound = false;
            }


            if(this.pollFound === null){
                this.pollFound = false;
            }
            // console.log("this.pollFound: "+this.pollFound);
            this.allRecentPollsFound = allRecentPollsFound;
            this.allPollFound = allPollFound;
            this.resultPollsFound = resultPollsFound;

            
            this.$nuxt.$options.head = {
                title: 'PollDiary - '+this.industryName,
                meta: [
                    
                    {name: 'description', content: this.pageDescriptionForMeta},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - '+this.industryName },
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to [Your Website Name]! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: this.apiUrl+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/industry/'+this.industryName },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - '+this.industryName },
                    { name: 'twitter:description', content: 'Welcome to [Your Website Name]! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: this.apiUrl+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ],
            };
            
            if (process.client){
                document.title = 'PollDiary - '+this.industryName;
            }

        },

        created() {
            // this.getAllRecentPolls();
            // this.getAllPollsEnding();
            // this.getlistOfResultPolls();
        },

        methods: {
            getAllRecentPolls(){
                const formData = new FormData();
                if (this.industryName !== null){
                    this.industryName = this.industryName.replace(":", "");
                }
                formData.append('industryName', this.industryName);
                this.$axios.post('/api/get-all-recent-uploaded-poll-industry-wise', formData)
                .then(response => {
                    
                    if(response.data.success === true){
                        this.allRecentPollsFound = true;
                        
                        response.data.all_polls.forEach(item => {
                            // item.all_tags = response.data.all_tags;
                            item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                            this.allRecentUploadedPolls.push(item);
                        });
                        // console.log("why");
                        // console.log(this.allRecentUploadedPolls);
                        // console.log("why");
                        
                    }
                    else if(response.data.success === false && response.data.message === "No polls uploaded yet"){
                        this.allRecentPollsFound = false;
                    }
                    else{
                        this.allRecentPollsFound = false;
                    }
                    this.pollFound = true;
                })
                .catch(error => {
                    console.log(error);
                    this.pollFound = true;
                    this.allRecentPollsFound = false;
                });
            },

            getAllPollsEnding(){
                const formData = new FormData();
                if (this.industryName !== null){
                    this.industryName = this.industryName.replace(":", "");
                }
                formData.append('industryName', this.industryName);
                this.$axios.post('/api/get-all-poll-industry-wise', formData)
                .then(response => {
                    if(response.data.success === true){
                        this.allPollFound = true;
                        
                        response.data.all_polls.forEach(item => {
                            // item.all_tags = response.data.all_tags;
                            item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                            this.allPolls.push(item);
                        });
                        // console.log(this.allPolls);
                    }
                    else if(response.data.success === false && response.data.message === "No polls uploaded yet"){
                        this.allPollFound = false;
                    }
                    else{
                        this.allPollFound = false;
                    }
                    this.pollFound = true;
                })
                .catch(error => {
                    console.log(error);
                    this.pollFound = true;
                    this.allPollFound = false;
                });
            },

            getlistOfResultPolls(){
                const formData = new FormData();
                if (this.industryName !== null){
                    this.industryName = this.industryName.replace(":", "");
                }
                formData.append('industryName', this.industryName);
                this.$axios.post('/api/get-result-list-poll-industry-wise', formData)
                .then(response => {
                    if(response.data.success === true){
                        this.resultPollsFound = true;
                            
                        response.data.all_poll_result.forEach(item => {
                            item.updated_at = this.beautifyTime(item.updated_at);
                            this.resultAllPolls.push(item);
                        });
                    }
                    else if(response.data.success === false && response.data.message === "No poll found"){
                        this.resultPollsFound = false;
                    }
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            },

            endingPollClicked(event, tableNameStartsWith){
                if(process.client){
                    if (event.ctrlKey){
                        window.open('/poll/'+tableNameStartsWith, '_blank');
                    }
                    else{
                        window.location.href = '/poll/'+tableNameStartsWith;
                    }
                    // this.$router.push(`/poll/${tableNameStartsWith}`);
                }
            },

            resultPollsClicked(event, tableNameStartsWith){
                if(process.client){
                    if (event.ctrlKey){
                        window.open('/poll-winner/'+tableNameStartsWith, '_blank');
                    }
                    else{
                        window.location.href = '/poll-winner/'+tableNameStartsWith;
                    }
                    // this.$router.push(`/poll/${tableNameStartsWith}`);
                }
            },

            beautifyTime(timestamp) {
                timestamp = Date.parse(timestamp) / 1000;
                const now = Date.now() / 1000;
                const diff = Math.floor(now - timestamp);
                if (diff < 60) {
                    return 'now';
                } else if (diff < 3600) {
                    const minutes = Math.floor(diff / 60);
                    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (diff < 86400) {
                    const hours = Math.floor(diff / 3600);
                    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    const days = Math.floor(diff / 86400);
                    return `${days} day${days > 1 ? 's' : ''} ago`;
                }
            }
        }
    }
</script>
