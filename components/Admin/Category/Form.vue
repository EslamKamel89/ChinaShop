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
    <form @submit.prevent=""></form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import Heading from "~/components/ui/Heading.vue";
import { toTypedSchema } from "@vee-validate/zod";
const title = ref("Edit Category");
const description = ref("Edit Category");
const toastMessage = ref("Category Updated");
const actions = ref("Save Changes");
const isEditing = ref(true);
const route = useRoute();
const { data } = await useFetch(
  `/api/admin/categories/${route.params.categoryId}`
);
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: {},
});
</script>
