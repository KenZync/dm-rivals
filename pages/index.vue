<template>
    <div>
        <div v-if="fetching">Pending</div>
        <div v-else><button @click="getRanking">Download Ranking HTML</button></div>
        <br/>
        <input v-model="username" placeholder="Name" />
        <div v-if="fetchingScore">Pending</div>
        <div v-else><button @click="getScore">Download Score</button> ID : {{ id }}</div>

        <div>User 1</div>
        <input v-model="user1" placeholder="Name 1" />
        <div>User 2</div>
        <input v-model="user2" placeholder="Name 2" />
        <div><button @click="getCompare">Compare</button></div>

        <div class="row" v-if="compare">
            <div class="column">
                <div>{{user1}}'s Win</div>
                <table>
                    <tr>
                        <th>{{ user1 }}'s Rank</th>
                        <th>Title</th>
                        <th>Acc</th>
                        <th>Progress</th>
                        <th>Clear</th>
                        <th>Level</th>
                        <th>PlayTime</th>
                    </tr>
                    <template v-for="(score, key) in compareData">
                        <tr>
                            <td>{{ score.Rank }}</td>
                            <td>{{ score.Title }}</td>
                            <td>{{ score.Acc }}</td>
                            <td>{{ score.Progress }}</td>
                            <td>{{ score.Clear }}</td>
                            <td>{{ score.Level }}</td>
                            <td>{{ score.PlayTime }}</td>
                        </tr>
                    </template>
                </table>
            </div>
            <div class="column">
                <div>{{user2}}'s Win</div>
                <table v-if="compare">
                    <tr>
                        <th>{{ user2 }}'s Rank</th>
                        <th>Title</th>
                        <th>Acc</th>
                        <th>Progress</th>
                        <th>Clear</th>
                        <th>Level</th>
                        <th>PlayTime</th>
                    </tr>
                    <template v-for="(score, key) in compareData2">
                        <tr>
                            <td>{{ score.Rank }}</td>
                            <td>{{ score.Title }}</td>
                            <td>{{ score.Acc }}</td>
                            <td>{{ score.Progress }}</td>
                            <td>{{ score.Clear }}</td>
                            <td>{{ score.Level }}</td>
                            <td>{{ score.PlayTime }}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const fetching = ref(false);
const fetchingScore = ref(false);
const username = ref();
const id = ref();
const user1 = ref("");
const user2 = ref("");

const compare = ref(false)

const compareData = ref();
const compareData2 = ref();



const getRanking = async () => {
    fetching.value = true;
    const data = await $fetch(`/api/ranking`).catch(error => {alert("ERROR")});
    fetching.value = false;
};

const getScore = async () => {
    fetchingScore.value = true;
    const data = await $fetch(`/api/score/${username.value}`).catch(error => {alert("ERROR")});
    fetchingScore.value = false;
    id.value = data
};

const getCompare = async () => {
    const data = await $fetch(`/api/compare?user1=${user1.value}&user2=${user2.value}`).catch(error => {alert("NOT FOUND")});
    const data2 = await $fetch(`/api/compare?user1=${user2.value}&user2=${user1.value}`)
    compareData.value = data
    compareData2.value = data2
    compare.value = true
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.row {
    margin-left: -5px;
    margin-right: -5px;
}

.column {
    float: left;
    width: 50%;
    padding: 5px;
}

/* Clearfix (clear floats) */
.row::after {
    content: "";
    clear: both;
    display: table;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
}

th,
td {
    text-align: left;
    padding: 16px;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
