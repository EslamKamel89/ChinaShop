<script setup lang="ts">
const files = ref<FileList | null>(null);
const images = ref<string[]>([]);
const name = ref<string>();
const handleFileChange = (event: Event) => {
  files.value = (event.target as HTMLInputElement).files;
  //   pr(files.value, "files.value");
};
const handleSubmit = async () => {
  const fd = new FormData();
  if (files.value?.length) {
    Array.from(files.value).forEach((file, index) => {
      fd.append(`images[]`, file);
      fd.append("name", name.value ?? "");
    });
  }
  const data = await $fetch<{ images: string[] }>("/api/test", {
    method: "post",
    body: fd,
  });
  images.value = data.images;
  images.value = images.value.map(
    (path) => `http://localhost:3000/test/${path}`
  );
};
</script>
<template>
  <div class="max-w-3xl mx-auto my-4">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col space-y-2">
        <Input type="text" placeholder="Enter you name" v-model="name"></Input>
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
                <span class="font-semibold">Click to upload</span> or drag and
                drop
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
        <Button type="submit">Upload</Button>
      </div>
    </form>
    <div>
      <img :src="img" v-for="img in images" :key="img" />
    </div>
  </div>
</template>
