<script setup lang="ts">
const { isModalVisible, toggleModal, isLoading } = useStore();
const emits = defineEmits<{
  onConfirm: [];
}>();
</script>
<template>
  <div>
    <SharedModal
      :is-modal-visible="isModalVisible"
      @on-close="toggleModal(false)"
      title="Are You Sure?"
      description="This action can not be undone"
    >
      <div class="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          variant="outline"
          :disabled="isLoading"
          @click="toggleModal(false)"
          >cancel</Button
        >
        <Button
          variant="destructive"
          :disabled="isLoading"
          @click="emits('onConfirm')"
          >continue</Button
        >
      </div>
    </SharedModal>
  </div>
</template>
