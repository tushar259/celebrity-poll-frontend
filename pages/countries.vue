<template>
    <div class="country-page">
        <div class="container">
            <div class="styling-link-for-countries font-selected">
                <router-link to="/" class="navigator-link">Home</router-link> <div class="navigator-link-divider">/</div> 
                <router-link to="" class="navigator-link capitalized">Countries</router-link>
            </div>
            <div class="row">
                
                <div class="col-md-8">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(country, index) in countries" :key="index" :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
                                <td>{{ country.name }}</td>
                                <td>{{ formatNumber(country.population) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Population</h5>
                            <p class="card-text">{{ formatNumber(totalPopulation) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

        data: () => ({
            apiUrl: null,
            countries: [],
            totalPopulation: 0,
            pageDescriptionForMeta: ''
        }),
        
        async fetch() {
            this.apiUrl = this.$axios.defaults.baseURL;
            const response = await this.$axios.$get('/api/show-country-list');
            if(response.success === true){
                response.countries_list.forEach(item => {
                    this.totalPopulation += item.population;
                    this.pageDescriptionForMeta += item.name + ": "+item.population+", "
                    this.countries.push(item);
                });
            }

            // const protocol = window.location.protocol;
            // const host = window.location.host;
            // const fullUrl = `${protocol}://${host}${window.location.pathname}`;

            this.$nuxt.$options.head = {
                title: 'World Population',
                meta: [
                    
                    {name: 'description', content: this.pageDescriptionForMeta+"Total Population: "+this.totalPopulation+"."},

                    // {name: 'description', content: this.afterPollDescription },

                    { hid: 'og:title', property: 'og:title', content: 'World Population' },
                    { hid: 'og:description', property: 'og:description', content: this.pageDescriptionForMeta },
                    { hid: 'og:image', property: 'og:image', content: this.apiUrl+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'http://127.0.0.1:3000/countries' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'World Population' },
                    { name: 'twitter:description', content: this.pageDescriptionForMeta },
                    { name: 'twitter:image', content: this.apiUrl+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },

                    // { name: 'poll-id', content: this.pollId }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: this.pollTitle },
                ],
            };

            if (process.client){
                document.title = 'World Population';
                window.scrollTo(0, 0);
            }
            
        },

        created(){
            // this.getCountriesInfoFromApi();
            // this.getCountriesInfoFromController();
        },

        methods: {
            formatNumber(number) {
                return number.toLocaleString();
            },

            getCountriesInfoFromApi(){
                this.$axios.get('https://restcountries.com/v3.1/all')
                .then(response => {
                    // console.log(response);
                    const countries = response.data.map(country => ({
                        name: country.name.common,
                        population: country.population,
                    }));

                    const totalPopulation = countries.reduce((total, country) => total + country.population, 0);

                    // console.log('Countries:', countries);
                    // console.log('Total Population:', totalPopulation);
                })
                .catch(error =>{
                    console.log('Error: ',error);
                });
            },

            getCountriesInfoFromController(){
                this.$axios.get('/api/show-country-list')
                .then(response =>{
                    // console.log(response);
                    response.data.countries_list.forEach(item => {
                        this.totalPopulation += item.population;
                        this.countries.push(item);
                    });
                })
                .catch(error =>{
                    console.log(error);
                });
            }
        }
    }
</script>
