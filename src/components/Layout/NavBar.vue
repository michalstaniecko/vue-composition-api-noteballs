<script setup>
import { ref } from 'vue';
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();

const showMobileNav = ref( false );

const handleNavItemClicked = ( e ) => {
  const navItem = e.target.closest( '.navbar-item' );
  if (!navItem) return;

  showMobileNav.value = false;
}

const hamburgerRef = ref( null );
const navRef = ref( null );
onClickOutside(
    navRef,
    () => showMobileNav.value = false,
    {
      ignore: [ hamburgerRef ]
    }
);

const logoutUserHandler = () => {
  storeAuth.logoutUser();
  showMobileNav.value = false;
}

</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace" href="https://bulma.io">
          Noteballs
        </div>

        <a
            role="button" @click.prevent="showMobileNav = !showMobileNav" class="navbar-burger"
            :class="{'is-active': showMobileNav}" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample"
            ref="hamburgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" ref="navRef" class="navbar-menu" :class="{'is-active': showMobileNav}">
        <div class="navbar-start">
          <button
              v-if="storeAuth.isLogged"
              @click.prevent="logoutUserHandler"
              class="button is-small is-info mt-3 ml-3"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end" @click.prevent="handleNavItemClicked">
          <RouterLink
              class="navbar-item"
              to="/"
              active-class="is-active"
          >Notes
          </RouterLink>
          <RouterLink
              class="navbar-item"
              to="/stats"
              active-class="is-active"
          >Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
