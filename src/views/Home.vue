<template>
    <div class="main">
        <div class="top">
            <div class="container">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button @click="handleGetInfo" class="btn btn-outline-secondary" type="button">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            Search
                        </button>
                    </div>
                    <input @keyup.enter="handleGetInfo" type="text" class="form-control"
                        placeholder="Search your github's name" aria-label="" aria-describedby="basic-addon1"
                        v-model="name">
                </div>
            </div>
        </div>
        <div class="container">
            <div v-if="user != null" class="result row">
                <div @click="handleGetRepositories" class="col-sm-4 cardUser">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" :src="user.avatar_url" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{ user.login }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div v-for="repo, index in userRepositories" :key="index">
                        <cardRepo :repo="repo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getUser, getRepositories } from '../services/api'
import cardRepo from "../components/cardRepo.vue";
export default {
    components: { cardRepo },
    setup() {
        const name = ref(null);
        const user = ref(null);
        const userRepositories = ref([]);

        async function handleGetInfo() {
            user.value = await getUser(name.value);
            userRepositories.value = [];
            console.log(user.value);
            if (user.value == undefined) {
                console.log(user.value);
                alert('User not found');
            }
        }

        async function handleGetRepositories() {
            userRepositories.value = await getRepositories(user.value.repos_url);
            console.log(userRepositories)
        }

        return { name, handleGetInfo, user, userRepositories, handleGetRepositories }
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background-image: url("https://pbs.twimg.com/media/EAqRiXdW4AQrQsu.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}

.top {
    padding: 30px 0;
    background-color: bisque;
    display: flex;
    align-items: center;
    justify-content: center;
}

.result {
    margin-top: 3px;
}

.cardUser:hover {
    cursor: pointer;
}

.disable {
    display: none;
}
</style>