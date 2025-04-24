<script setup lang="ts">
import { LazyAdminColorColumn } from "#components";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Heading from "~/components/ui/Heading.vue";
import handleApiError from "~/utils/error";
const props = defineProps<{
  isEditing: boolean;
}>();
const editMode = ref(props.isEditing);
const title = computed(() => (editMode.value ? "Edit Color" : "Create Color"));
const description = computed(() =>
  editMode.value ? "Edit Color" : "Create Color"
);
const toastMessage = computed(() =>
  editMode.value ? "Color Updated" : "Color Created"
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
const { data: currentColor, execute: fetchColor } = await useFetch(
  `/api/admin/colors/${route.params.colorId}`,
  { immediate: false }
);
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(colorSchema),
  initialValues: {
    ...currentColor.value,
    value: currentColor.value?.value ?? "#000000",
  },
});
const onSubmit = handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (editMode.value) {
      const color = await $fetch(`/api/admin/colors/${route.params.colorId}`, {
        method: "PATCH",
        body: values,
      });
      pr(color, "handle submit - edit mode - Form.vue");
    } else {
      const color = await $fetch("/api/admin/colors", {
        method: "POST",
        body: values,
      });
      pr(LazyAdminColorColumn, "handle submit - create mode - Form.vue");
    }
    showMessage({ title: title.value + " Success" });
    //TODO: Refersh data
    await navigateTo("/admin/colors");
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});
const deleteColor = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(`/api/admin/colors/${route.params.colorId}`, {
      method: "DELETE",
    });
    if (res) {
      showMessage({ title: "Color Deleted" });
      await navigateTo("/admin/colors");
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
    fetchColor().then(() => {
      if (!currentColor.value) {
        editMode.value = false;
      }
    });
  }
});
const handleCopy = (color: string) => {
  navigator.clipboard.writeText(color);
  showMessage({
    title: "Copied!",
    description: `Color:${color} is copied successfully`,
    variant: "default",
  });
};
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
                placeholder="Color Name"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentColor?.name"
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
                type="color"
                placeholder="Color Value"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentColor?.value ?? '#000000'"
                class="w-24 rounded-xl"
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
      @on-confirm="deleteColor"
    ></SharedAlertModal>
  </div>
</template>
