<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Heading from "~/components/ui/Heading.vue";
import handleApiError from "~/utils/error";
const props = defineProps<{
  isEditing: boolean;
}>();
const editMode = ref(props.isEditing);
const title = computed(() => (editMode.value ? "Edit Size" : "Create Size"));
const description = computed(() =>
  editMode.value ? "Edit Size" : "Create Size"
);
const toastMessage = computed(() =>
  editMode.value ? "Size Updated" : "Size Created"
);
const action = ref("Save Changes");
const route = useRoute();
const {
  isLoading,
  toggleLoading,
  showError,
  showMessage,
  toggleError,
  toggleModal,
  isModalVisible,
} = useStore();
const { data: currentSize, execute: fetchSize } = await useFetch(
  `/api/admin/sizes/${route.params.sizeId}`,
  { immediate: false }
);
const { handleSubmit, errors, setValues } = useForm({
  validationSchema: toTypedSchema(sizeSchema),
  initialValues: {
    ...currentSize.value,
    // value: currentSize.value?.value ?? "#000000",
  },
});
const onSubmit = handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (editMode.value) {
      const size = await $fetch(`/api/admin/sizes/${route.params.sizeId}`, {
        method: "PATCH",
        body: values,
      });
      pr(size, "handle submit - edit mode - Form.vue");
    } else {
      const size = await $fetch("/api/admin/sizes", {
        method: "POST",
        body: values,
      });
      pr(size, "handle submit - create mode - Form.vue");
    }
    showMessage({ title: title.value + " Success" });
    //TODO: Refersh data
    await navigateTo("/admin/sizes");
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});
const deleteSize = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(`/api/admin/sizes/${route.params.sizeId}`, {
      method: "DELETE",
    });
    if (res) {
      showMessage({ title: "Size Deleted" });
      await navigateTo("/admin/sizes");
    }
    ``;
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
onMounted(() => {
  if (editMode.value) {
    fetchSize().then(() => {
      if (!currentSize.value) {
        editMode.value = false;
      } else {
        setValues(currentSize.value);
      }
    });
  }
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <Heading :title :description>
      <template #action>
        <div v-if="editMode">
          <Button
            type="button"
            @click="toggleModal(true)"
            variant="destructive"
            size="sm"
          >
            <Icon name="lucide:trash" />
          </Button>
        </div>
      </template>
    </Heading>
    <Separator class="my-2" />
    <form @submit.prevent="onSubmit">
      <div class="md:grid md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Size Name"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentSize?.name"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Value</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Size Value"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentSize?.value"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" :disabled="isLoading" class="ml-auto">{{
        action
      }}</Button>
    </form>
    <SharedAlertModal
      v-if="isModalVisible"
      :is-modal-visible="isModalVisible"
      @on-confirm="deleteSize"
    ></SharedAlertModal>
  </div>
</template>
