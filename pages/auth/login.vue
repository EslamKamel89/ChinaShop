<script lang="ts" setup>
import { AlertCircle } from "lucide-vue-next";

const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";
const iframeHeight = "800px";
const containerClass = "w-full h-full p-4 lg:p-0";

const form = ref<AuthForm>({
  email: "",
  password: "",
});
const error = ref<Partial<Record<keyof AuthForm, string>>>({});
const serverError = ref<string>();
const handleSubmit = async () => {
  try {
    const result = authSchema.safeParse(form.value);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        error.value[e.path[0] as keyof AuthForm] = e.message;
      });
      return;
    }
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: result.data,
      onResponseError(e) {
        serverError.value = e.response.statusText;
      },
    });
    if (res) {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      await navigateTo("/");
    }
  } catch (error) {
    pr(error, "login.vue");
  }
};
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <Alert v-if="serverError" variant="destructive">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              <div class="w-full flex items-center justify-center">
                <p>{{ serverError }}</p>
              </div>
            </AlertDescription>
          </Alert>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
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
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" v-model="form.password" />
            <p v-if="error.password" class="text-xs text-red-500">
              {{ error.password }}
            </p>
          </div>
          <Button type="submit" class="w-full"> Login </Button>
          <AuthSocialButton title="Login With Github" icon="uil:github" />
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="underline"> Sign up </NuxtLink>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="/favicon.ico"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </form>
</template>
