<template>
  <div class="flex flex-col space-y-2">
    <Heading :title :description>
      <template #action>
        <NuxtLink to="/" v-if="isEditing">
          <Button variant="destructive" size="sm">
            <Icon name="lucide:trash" />
          </Button>
        </NuxtLink>
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
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Heading from "~/components/ui/Heading.vue";
import handleApiError from "~/utils/error";
const title = ref("Edit Category");
const description = ref("Edit Category");
const toastMessage = ref("Category Updated");
const action = ref("Save Changes");
const isEditing = ref(true);
const route = useRoute();
const { isLoading, toggleLoading, showError, showMessage, toggleError } =
  useStore();
const { data: currentCategory } = await useFetch(
  `/api/admin/categories/${route.params.categoryId}`
);
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: currentCategory.value || { name: "" },
});
const onSubmit = handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (isEditing.value) {
      pr(values, "handle submit - edit mode - Form.vue");
    } else {
      pr(values, "handle submit - create mode - Form.vue");
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
</script>
