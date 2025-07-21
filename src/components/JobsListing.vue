<template>
  <!-- Browse Jobs -->
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div v-if="state.loading" class="text-center py-6 text-gray-500">
        <PulseLoader
            class="m-auto"
            color="#4ade80"
            :margin="10"
        />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
            v-for="job in state.jobs.slice(0, limit)"
            :key="job.id"
            :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <a
        href="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >View All Jobs</a
    >
  </section>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import * as axios from "axios";
import JobListing from "@/components/JobListing.vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const state = reactive({
  jobs: [] as any[],
  loading: true,
})
defineProps({
  limit: {
    type: Number,
    default: 6
  },
  showButton: {
    type: Boolean,
    default: false
  }
})

// http://localhost:8000/jobs
onMounted(async () => {
  try {
    axios.default.get('http://localhost:8000/jobs')
        .then(response => {
          console.log('Jobs fetched:', response.data);
          state.jobs = response.data;

        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    state.loading = false;
  }
})
console.log(state.loading  , 2323)
</script>

<style scoped>

</style>