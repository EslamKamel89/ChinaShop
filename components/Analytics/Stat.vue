<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>
<template>
  <Card class="">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ value }}</CardDescription>
    </CardHeader>
    <!--
      <CardContent> </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6"> </CardFooter>
    -->
  </Card>
</template>
