<template>
  <div>
    <!--h1>Необходимо авторизоваться:</h1-->
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>
