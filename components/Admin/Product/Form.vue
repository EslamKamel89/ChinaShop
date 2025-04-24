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
  pr("onSubmit");
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
const { data: categories } = await useFetch("/api/admin/categories", {
  key: "categories",
});
const { data: sizes } = await useFetch("/api/admin/sizes", {
  key: "sizes",
});
const { data: colors } = await useFetch("/api/admin/colors", {
  key: "colors",
});
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
      <div class="md:grid md:grid-cols-2 gap-8 space-y-3 md:space-y-0">
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
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Product Name"
                v-bind="componentField"
                :disabled="isLoading"
                v-bind:model-value="currentProduct?.price"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select v-bind="componentField">
              <FormControl class="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="sizeId">
          <FormItem>
            <FormLabel>Size</FormLabel>
            <Select v-bind="componentField">
              <FormControl class="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="size in sizes"
                    :key="size.id"
                    :value="size.id"
                  >
                    {{ size.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="colorId">
          <FormItem>
            <FormLabel>Color</FormLabel>
            <Select v-bind="componentField">
              <FormControl class="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="color in colors"
                    :key="color.id"
                    :value="color.id"
                  >
                    {{ color.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <div></div>
        <FormField
          v-slot="{ value, handleChange }"
          type="checkbox"
          name="isFeatured"
        >
          <FormItem class="flex flex-row items-center gap-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Featured</FormLabel>
              <!--<FormDescription> is this product featured? </FormDescription>-->
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ value, handleChange }"
          type="checkbox"
          name="isArchived"
        >
          <FormItem class="flex flex-row items-center gap-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Archived</FormLabel>
              <!--<FormDescription> is this product featured? </FormDescription>-->
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" :disabled="isLoading" class="ml-auto mt-5">{{
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
