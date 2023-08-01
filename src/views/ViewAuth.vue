<script setup>
import { reactive, ref } from 'vue';

const activeTab = ref( 'login' )

const title = ref( {
  'login': 'Login',
  'register': "Register"
} )

const isActiveTab = ( tab ) => tab === activeTab.value

const switchTab = (tab) => {
  activeTab.value = tab
  credentials.email = '';
  credentials.password = '';
}

const validateForm = () => {
  let valid = true;

  if (!credentials.email) {
    valid = false;
  }

  if (!credentials.password) {
    valid = false;
  }

  if (!valid) {
    alert('Provide email and password!')
  }

  return valid;
}

const credentials = reactive( {
  email: '',
  password: ''
} )

const loginHandler = () => {
  console.log('login handler');
}

const registerHandler = () => {
  console.log('register handler');
}

const onSubmit = () => {
  if (!validateForm()) return;

  switch (activeTab.value) {
    case 'login':
      loginHandler();
      break;
    default:
      registerHandler();
      break;
  }
}

</script>

<template>
  <div class="tabs is-centered">
    <ul>
      <li :class="{'is-active': isActiveTab('login')}">
        <a @click.prevent="switchTab('login')">Login</a>
      </li>
      <li :class="{'is-active': isActiveTab('register')}">
        <a @click.prevent="switchTab('register')">Register</a>
      </li>
    </ul>
  </div>
  <div class="card auth-form">
    <div class="card-content">
      <div class="title has-text-centered">
        {{ title[activeTab] }}
      </div>
      <form
          @submit.prevent="onSubmit"
      >
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Enter a password"
            >
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <button type="submit" class="button is-primary">
              {{ title[activeTab] }}
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
