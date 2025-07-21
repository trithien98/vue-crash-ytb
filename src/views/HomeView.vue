<template>
  <Hero
  />
  <HomeCard/>
  <JobsListing :showButton="true" :limit="3"/>
</template>

<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import HomeCard from "@/components/HomeCard.vue";
import JobsListing from "@/components/JobsListing.vue";
</script>

<style scoped>

</style>