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
                    <p class="texts-under-thumbnail">image courtesy: Google, Facebook, Instagram, Twitter, X, Pinterest, Wikipedia, IMDB, etc.</p>
                    <h1 class="poll-title texts-under-thumbnail">{{pollTitle}}?</h1>
                    <div class="d-flex align-items-center texts-under-thumbnail">
                        <div class="poll-date">Started - {{startingDate}}</div>
                        <div class="distance-between-two custom-align">&bull;</div>
                        <div class="poll-date">Published - {{publishedDate}}</div>
                    </div>
                </div>
                <div class="px-10-gap"></div>
            </div>
        </div>
        <div class="px-10-gap"></div>
        <div class="row poll-page-row">
            <div class="styling-link font-selected">
                <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div> <!-- <i class='fas fa-angle-right'></i> -->
                <router-link :to="'/industry/'+whichIndustry" class="navigator-link">{{whichIndustry}}</router-link><div class="navigator-link-divider">/</div>
                <router-link :to="'/poll-winner/'+pollId" class="navigator-link">{{pollId}}</router-link>
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-5 custom-column">
                <div class="poll-page-custom-card winner-animation">
                    <h5 class="text-color-in-winner">{{ pollTitle }}?</h5>
                    <div class="px-30-gap"></div>
                    <div class="custom-align">
                        <h5 class="flashing text-color-in-winner">W I N N E R</h5>
                        <img :src="apiUrl+'/'+winnersThumbnail" class="winners-picture">
                        <br>
                        <h5 class="text-color-in-winner">{{winnersName}}</h5>
                    </div>
                    <div class="px-20-gap"></div>
                    
                </div>
            </div>

            <div class="col-md-7 custom-column" v-if="afterPollDescription !== ''">
                <div class="poll-page-custom-card">
                    <div v-html="afterPollDescription" class="poll-details"></div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    import moment from 'moment';
    export default {
        head:{
            meta:[
                
                { charset: 'UTF-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                { name: 'robots', content: 'index, follow' },
                

                // {name: 'description', content: "polls, poll, lionel messi, messi, ronaldo, cristiano ronalo, neymar, neymar jr, ronaldinho, shah rukh khan, srk, salman khan, salman, bts, taehyung, v, jungkook, jinn, black pink, momoland, nancy jewel mcdonie, katrina kaif, katrina, deepika padukone, deepika, alia bhatt, alia, ileana d'cruz, aishwarya rai, akshay kumar, hrithik roshan, ranveer singh, ranbir kapoor, kareena kapoor, virat kohli, rohit sharma, ms dhoni" },
                
            ]
        },

        data: () => ({
            apiUrl: null,
            pollId: null,
            pollFound: null,
            pollTitle: '',
            whichIndustry: '',
            startingDate: '',
            endingDate: '',
            publishedDate: '',
            imagesFound: [],
            totalVotes: '',
            thumbnail: '',
            winnersThumbnail: '',
            winnersName: '',
            winnersVotes: '',
            afterPollDescription: '',
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),

        async fetch() {
            this.apiUrl = this.$axios.defaults.baseURL;
            this.pollId = this.$route.params.pollid;
            this.pollId = this.pollId.replace(/:/g, '');
            this.pollId = this.pollId.replace(/-/g, ' ');
            const formData = {
                'pollId': this.pollId
            };
            
            const response = await this.$axios.post('/api/get-poll-winner-info', formData);
            if(response.data.success === true){
                this.pollFound = true;
                this.pollTitle = response.data.title_n_other_info.poll_title;
                this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                this.whichIndustry = response.data.title_n_other_info.which_industry;
                this.startingDate = moment(response.data.title_n_other_info.starting_date).format('D MMM YYYY');
                this.endingDate = response.data.title_n_other_info.ending_date;
                this.publishedDate = moment(response.data.title_n_other_info.updated_at).format('D MMM YYYY');
                
                this.winnersName = response.data.title_n_other_info.winners_name;
                
                this.totalVotes = response.data.title_n_other_info.total_votes;
                this.winnersVotes = response.data.title_n_other_info.winners_votes;

                this.thumbnail = response.data.images_uploaded[0].placeholder;
                this.winnersThumbnail = response.data.images_uploaded[2].placeholder;
                
            }
            else{
                this.pollFound = false;
            }

            this.$nuxt.$options.head = {
                title: 'Poll Winner - '+this.pollTitle,
                meta: [
                    
                    {name: 'description', content: this.winnersName+" won the poll with "+this.winnersVotes+" votes."},

                    {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'Poll Winner - '+this.pollTitle },
                    { hid: 'og:description', property: 'og:description', content: this.winnersName+" won the poll with "+this.winnersVotes+" votes." },
                    { hid: 'og:image', property: 'og:image', content: this.apiUrl+'/'+this.thumbnail },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/poll-winner/'+this.pollId },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Poll Winner - '+this.pollTitle },
                    { name: 'twitter:description', content: this.winnersName+" won the poll with "+this.winnersVotes+" votes." },
                    { name: 'twitter:image', content: this.apiUrl+'/'+this.thumbnail },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'Poll Winner - '+this.pollTitle;
                window.scrollTo(0, 500);
            }
        },

        created() {
            // this.getPollInfo();
            // window.scrollTo(0, 0);
        },

        methods: {
            getPollInfo(){
                const formData = new FormData();
                this.pollId = this.pollId.replace(":", "");
                formData.append('pollId', this.pollId);
                this.$axios.post('/api/get-poll-winner-info', formData)
                .then(response => {
                    if(response.data.success === true){
                        this.pollFound = true;
                        this.pollTitle = response.data.title_n_other_info.poll_title;
                        this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                        this.whichIndustry = response.data.title_n_other_info.which_industry;
                        this.startingDate = moment(response.data.title_n_other_info.starting_date).format('MMM D, YYYY h:mm A');
                        this.endingDate = response.data.title_n_other_info.ending_date;
                        this.publishedDate = moment(response.data.title_n_other_info.updated_at).format('MMM D, YYYY h:mm A');
                        // this.publishedDate = this.beautifyTime(response.data.title_n_other_info.updated_at);
                        this.winnersName = response.data.title_n_other_info.winners_name;
                        // console.log(response.data );
                        
                        
                        this.totalVotes = response.data.total_votes;
                        this.thumbnail = response.data.images_uploaded[0].placeholder;
                        this.winnersThumbnail = response.data.images_uploaded[2].placeholder;
                        
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

            beautifyTime(timestamp) {
                timestamp = Date.parse(timestamp) / 1000;
                const now = Date.now() / 1000;
                const diff = Math.floor(now - timestamp);
                if (diff < 60) {
                    return 'published now';
                } else if (diff < 3600) {
                    const minutes = Math.floor(diff / 60);
                    return `published ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (diff < 86400) {
                    const hours = Math.floor(diff / 3600);
                    return `published ${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    const days = Math.floor(diff / 86400);
                    return `published ${days} day${days > 1 ? 's' : ''} ago`;
                }
            }

            
            
        }
    }
</script>

<style>
/* 
.winner-animation{
    --api-url: {{ apiUrl }};
    background-image: url('var(--api-url)/winner/winnerCelebration.gif');
} */
</style>
