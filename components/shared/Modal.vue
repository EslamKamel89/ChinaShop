<script setup lang="ts">
const props = defineProps<{
  isModalVisible: boolean;
  title?: string;
  description?: string;
}>();
const emits = defineEmits<{
  onClose: [];
}>();

const isOpenModel = ref(props.isModalVisible);
watch(
  () => props.isModalVisible,
  () => {
    isOpenModel.value = pr(props.isModalVisible, "props.isModalVisible");
  }
);
</script>

<template>
  <Dialog v-model:open="isOpenModel" @update:open="(val) => emits('onClose')">
    <!--
     <DialogTrigger> Edit Profile </DialogTrigger>
  -->
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <slot />
      </div>
    </DialogScrollContent>
  </Dialog>
</template>
