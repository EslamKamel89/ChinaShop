<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Heading from "~/components/ui/Heading.vue";
import handleApiError from "~/utils/error";
const props = defineProps<{
  isEditing: boolean;
}>();
const editMode = ref(props.isEditing);
const title = computed(() =>
  editMode.value ? "Edit Category" : "Create Category"
);
const description = computed(() =>
  editMode.value ? "Edit Category" : "Create Category"
);
const toastMessage = computed(() =>
  editMode.value ? "Category Updated" : "Category Created"
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
const { data: currentCategory, execute: fetchCategory } = await useFetch(
  `/api/admin/categories/${route.params.categoryId}`,
  { immediate: false }
);
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: currentCategory.value,
});
const onSubmit = handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (editMode.value) {
      const category = await $fetch(
        `/api/admin/categories/${route.params.categoryId}`,
        { method: "PATCH", body: values }
      );
      pr(category, "handle submit - edit mode - Form.vue");
    } else {
      const category = await $fetch("/api/admin/categories", {
        method: "POST",
        body: values,
      });
      pr(category, "handle submit - create mode - Form.vue");
    }
    showMessage({ title: title.value + " Success" });
    //TODO: Refersh data
    await navigateTo("/admin/categories");
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});
const deleteCategory = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(
      `/api/admin/categories/${route.params.categoryId}`,
      { method: "DELETE" }
    );
    if (res) {
      showMessage({ title: "Category Deleted" });
      await navigateTo("/admin/categories");
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
    fetchCategory().then(() => {
      if (!currentCategory.value) {
        editMode.value = false;
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
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Category Name"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentCategory?.name"
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
      @on-confirm="deleteCategory"
    ></SharedAlertModal>
  </div>
</template>
