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
  editMode.value ? "Edit Product" : "Create Product"
);
const description = computed(() =>
  editMode.value ? "Edit Product" : "Create Product"
);
const toastMessage = computed(() =>
  editMode.value ? "Product Updated" : "Product Created"
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
const { data: currentProduct, execute: fetchProduct } = await useFetch(
  `/api/admin/products/${route.params.productId}`,
  { immediate: false }
);
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(productSchema),
  initialValues: currentProduct.value,
});
const onSubmit = handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (editMode.value) {
      const product = await $fetch(
        `/api/admin/products/${route.params.productId}`,
        { method: "PATCH", body: values }
      );
      pr(product, "handle submit - edit mode - Form.vue");
    } else {
      const product = await $fetch("/api/admin/products", {
        method: "POST",
        body: values,
      });
      pr(product, "handle submit - create mode - Form.vue");
    }
    showMessage({ title: title.value + " Success" });
    //TODO: Refersh data
    await navigateTo("/admin/products");
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});
const deleteProduct = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(`/api/admin/products/${route.params.productId}`, {
      method: "DELETE",
    });
    if (res) {
      showMessage({ title: "Product Deleted" });
      await navigateTo("/admin/products");
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
    fetchProduct().then(() => {
      if (!currentProduct.value) {
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
                placeholder="Product Name"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentProduct?.name"
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
      @on-confirm="deleteProduct"
    ></SharedAlertModal>
  </div>
</template>
