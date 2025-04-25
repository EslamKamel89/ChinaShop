<script setup lang="ts">
interface UploadImageProps {
  value: string[];
  allowedFilters?: string[];
}
defineProps<UploadImageProps>();
const onUpload = () => {};
const {
  public: { uploadPreset },
} = useRuntimeConfig();
</script>
<template>
  <div class="mb-4 flex flex-col items-center gap-4">
    <div v-for="img in value" :key="img" class="relative">{{ img }}</div>

    <CldUploadWidget
      v-slot="{ open }"
      :uploadPreset="uploadPreset"
      :onUpload="onUpload"
    >
      <button type="button" @click="open">Upload an Image</button>
    </CldUploadWidget>
  </div>
</template>
