<template>
  <div @click="showCommits(repo.name, repo.commits_url)" class="cardRepo" data-toggle="collapse"
    :data-target="`#${repo.name}`" aria-expanded="false" :aria-controls="`${repo.name}`">
    <h2>{{ repo.name }}</h2>
    <p><span>description:</span> {{ repo.description }}</p>
    <p><span><i class="fa-solid fa-star"></i> star:</span> {{ repo.stargazers_count }}</p>
    <p><span>open issues:</span> {{ repo.open_issues }}</p>
    <div class="row">
      <div class="col">
        <div class="collapse multi-collapse" :id="`${repo.name}`">
          <div class="card card-body">
            <div @click="gotoGithub(commits[index - 1].html_url)" v-for="index in length" :key="index"
              class="commitDetail">
              <p><span>commit ID:</span> {{ commits[index - 1].sha }}</p>
              <p><span>author:</span> {{ commits[index - 1].commit.author.name }}</p>
              <p><span>message:</span> {{ commits[index - 1].commit.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getCommits } from '../services/api'
export default {
  props: ["repo"],
  setup() {
    const commits = ref([]);
    const length = ref(0);
    async function showCommits(name, commits_url) {
      var element = document.getElementById(name);
      element.classList.toggle("show");
      const url = commits_url.slice(0, commits_url.indexOf("{"));

      commits.value = await getCommits(url);
      length.value = commits.value.length > 10 ? 10 : commits.value.length;
    }

    function gotoGithub(url) {
      window.location = url;
    }

    return { showCommits, length, commits, gotoGithub }
  }
};
</script>

<style scoped>
.cardRepo {
  border: 2px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  background-color: whitesmoke;
}

.commitDetail {
  border: 1px solid #ccc;
  padding: 5px;
}

.cardRepo:hover,
.commitDetail:hover {
  cursor: pointer;
  background-color: #ccc;
}

span,
h2 {
  color: red;
}
</style>
