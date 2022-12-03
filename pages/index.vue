<template>
    <div>
        <div>User 1</div>
        <input v-model="user1" placeholder="Name 1" />
        <div>User 2</div>
        <input v-model="user2" placeholder="Name 2" />
        <div v-if="fetching">Loading</div>
        <div v-else><button @click="getCompare">Compare</button></div>

        <div v-if="compare">
            <input type="checkbox" v-model="bothPlayed" />
            <label> Show only both Played</label>
        </div>

        <button v-if="compare" @click="toggleSortTime()">
            <span v-if="oldestFirst">Sort Oldest First</span>
            <span v-else>Sort Newest First</span>
        </button>

        <div class="row" v-if="compare">
            <div class="column">
                <div>{{ user1 }}'s Win</div>
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
                    <template v-for="(score, key) in filteredCompareData1">
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
                <div>{{ user2 }}'s Win</div>
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
                    <template v-for="(score, key) in filteredCompareData2">
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

<script setup>
const fetching = ref(false);
const user1 = ref("");
const user2 = ref("");

const compare = ref(false)

const compareData1 = ref();
const compareData2 = ref();

const bothPlayed = ref(false);

const oldestFirst = ref(false);

const toggleSortTime = () => {
    oldestFirst.value = !oldestFirst.value;
    var order = oldestFirst.value ? 1 : -1;
    compareData1.value.sort(function (a, b) {
        a = new Date(a.PlayTime);
        b = new Date(b.PlayTime);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
    });
    compareData2.value.sort(function (a, b) {
        a = new Date(a.PlayTime);
        b = new Date(b.PlayTime);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
    });
}

const filteredCompareData1 = computed(() => {
    let data = compareData1.value
    if (!bothPlayed.value) {

        return compareData1.value
    } else {
        return compareData1.value.filter((score) => {
            return score.Rank.includes("|")
        })
    }
});

const filteredCompareData2 = computed(() => {
    if (!bothPlayed.value) {
        return compareData2.value
    } else {
        return compareData2.value.filter((score) => {
            return score.Rank.includes("|")
        })
    }
});

const getCompare = async () => {
    fetching.value = true;
    const data = await $fetch(`/api/compare?user1=${encodeURIComponent(user1.value)}&user2=${encodeURIComponent(user2.value)}`)
    compareData1.value = data.win1
    compareData2.value = data.win2
    compare.value = true
    fetching.value = false;

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
