<template>
    <div >
        <!-- welcome home -->
    </div>
</template>

<script>
    export default {
        data: () => ({
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),

        created(){
            this.$router.push(`/polls`);
        }
    }
</script>
