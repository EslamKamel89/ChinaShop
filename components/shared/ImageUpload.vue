<script setup lang="ts">
import { Trash } from "lucide-vue-next";

const files = ref<FileList>();
const emit = defineEmits<{
  onChange: [files: FileList];
  onRemove: [file: File];
}>();
const handleFileChange = (event: Event) => {
  const newFiles = (event.target as HTMLInputElement).files;

  if (newFiles) {
    files.value = newFiles;
    emit("onChange", newFiles);
  }
};
const getPreviewUrl = (file: File) => URL.createObjectURL(file);
</script>
<template>
  <div class="w-full flex flex-col space-y-4 my-4">
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          @change="handleFileChange"
          :multiple="true"
        />
      </label>
    </div>
    <template v-if="files">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
        <div v-for="(file, index) in files" :key="file.name" class="relative">
          <Trash
            class="absolute -top-2 -right-2 bg-white text-red-500 rounded-full px-2 py-1 w-10 h-10 cursor-pointer"
          />
          <img :src="getPreviewUrl(file)" alt="" class="rounded-lg border" />
        </div>
      </div>
    </template>
  </div>
</template>
