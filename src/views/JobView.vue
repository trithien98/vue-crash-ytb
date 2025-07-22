<template>
  <BackButton/>

  <section v-if="!state.loading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
                class="text-orange-700 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                  class="pi pi-map-marker 500 mr-4"
              ></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4"/>

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
                :to="`/jobs/edit/${state.job.id}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >Edit Job
            </RouterLink
            >
            <button
                @click="deleleJob"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else>
    <PulseLoader
        class="m-auto"
        color="#4ade80"
        :margin="10"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import * as axios from "axios";
import {useRoute, useRouter} from "vue-router";
import BackButton from "@/components/BackButton.vue";
import {useToast} from "vue-toastification";


const route = useRoute();
const router = useRouter();
const jobId = route.params.id;
const toast = useToast();

const state = reactive({
  job: {} as any,
  loading: true,
});

onMounted(async () => {
  try {
    const response = await axios.default.get(`/api/jobs/${jobId}`);
    console.log('Job fetched:', response.data);
    state.job = response.data;
    state.loading = false;
  } catch (error) {
    console.error('Error fetching job:', error);
  }

})

const deleleJob = async () => {
  try {
    await axios.default.delete(`/api/jobs/${jobId}`);
    console.log('Job deleted');
    await toast.success('Job deleted successfully!');
    await router.push('/jobs');


  } catch (error) {
    await toast.error('Failed to delete job. Please try again.');
    console.error('Error deleting job:', error);
  }
}

</script>

<style scoped>

</style>