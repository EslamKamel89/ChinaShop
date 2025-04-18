<script lang="ts" setup>
import handleApiError from "~/utils/error";

const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";
const iframeHeight = "600px";
const containerClass = "w-full h-screen flex items-center justify-center px-4";

const form = ref<AuthForm>({
  email: "",
  password: "",
  name: "",
});
const { isLoading, toggleLoading, showMessage, showError } = useStore();
const error = ref<Partial<Record<keyof AuthForm, string>>>({});
const serverError = ref<string>();
const onSubmit = async () => {
  try {
    const result = authSchema.safeParse(form.value);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        error.value[e.path[0] as keyof AuthForm] = e.message;
      });
      // pr(error.value);
      return;
    }
    toggleLoading(true);
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: result.data,
      onResponseError(e) {
        serverError.value = e.response.statusText;
        showError(handleApiError(e));
      },
    });
    if (res) {
      await sleep(500);
      await navigateTo("/");
    }
  } catch (error) {
    pr(error, "register.vue");
  } finally {
    toggleLoading(false);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl"> Sign Up </CardTitle>
        <!--
       <Alert v-if="serverError" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            <div class="w-full flex items-center justify-start">
              <p>{{ serverError }}</p>
            </div>
          </AlertDescription>
        </Alert>
      -->
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="Mohamed" v-model="form.name" />
              <p v-if="error.name" class="text-xs text-red-500">
                {{ error.name }}
              </p>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              v-model="form.email"
            />
            <p v-if="error.email" class="text-xs text-red-500">
              {{ error.email }}
            </p>
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="form.password" />
            <p v-if="error.password" class="text-xs text-red-500">
              {{ error.password }}
            </p>
          </div>
          <Button type="submit" class="w-full"> Create an account </Button>
          <AuthSocialButton title="Register With Github" icon="uil:github" />
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/auth/login" class="underline"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
