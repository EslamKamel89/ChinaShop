<script lang="ts" setup>
const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";
const iframeHeight = "600px";
const containerClass = "w-full h-screen flex items-center justify-center px-4";

const form = ref<AuthForm>({
  email: "",
  password: "",
  // name: undefined,
});
const error = ref<Partial<Record<keyof AuthForm, string>>>({});
const onSubmit = async () => {
  try {
    const result = authSchema.safeParse(form.value);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        error.value[e.path[0] as keyof AuthForm] = e.message;
      });
      pr(error.value);
      return;
    }
    $fetch("/api/auth/register", { method: "POST", body: result.data });
  } catch (error) {
    pr(error, "register.vue");
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl"> Sign Up </CardTitle>
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
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="form.password" />
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
