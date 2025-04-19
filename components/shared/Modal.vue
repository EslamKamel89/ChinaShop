<script setup lang="ts">
const props = defineProps<{
  isModalVisible: boolean;
  title?: string;
  description?: string;
}>();
const emits = defineEmits<{
  onClose: [];
}>();
const isOpen = computed({
  get() {
    return props.isModalVisible;
  },
  set(value) {
    emits("onClose");
  },
});
</script>

<template>
  <Dialog :isOpen="isOpen" @update:open="(val) => emits('onClose')">
    <DialogTrigger> Edit Profile </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
