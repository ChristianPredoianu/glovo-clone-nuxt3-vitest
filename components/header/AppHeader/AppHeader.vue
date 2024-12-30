<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';

const { isNavOpen, closeNav } = useNav();
const { closeBackdrop } = useBackdrop();
const { screenWidth } = useScreenWidth();
const { user, signUserOut } = useAuth();
const { openModal, closeModal } = useModal();
const { isLoaded } = useIsLoaded();

onMounted(() => {
  window.addEventListener('resize', closeNavigationDialog);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeNavigationDialog);
});

function closeNavigationDialog() {
  closeNav();
  closeBackdrop();
}

function signOut() {
  signUserOut();
}
</script>

<template>
  <header class="relative bg-white border-b border-green-500" v-if="screenWidth">
    <nav class="flex items-center justify-between container mx-auto p-4">
      <!-- Cart Modal -->
      <Modal modalName="cart">
        <CartModalOverlay @closeModal="closeModal" />
      </Modal>
      <!-- Sign-In Modal -->
      <Modal modalName="signin">
        <SignInModalOverlay @closeModal="closeModal" />
      </Modal>
      <Logo />
      <Backdrop :@closeElement="closeNav" />
      <Hamburger />
      <div
        id="nav-list-div"
        :class="isNavOpen ? 'translate-x-0' : '-translate-x-full'"
        class="h-full bg-white sm:bg-transparent fixed sm:relative z-40 top-0 left-0 w-10/12 sm:w-auto min-h-screen sm:min-h-full flex flex-grow flex-col items-center justify-center sm:justify-start sm:flex-row rounded-r-2xl sm:rounded-r-none transition ease-in-out sm:py-0 sm:translate-x-0 sm:ml-4"
      >
        <NavItems />
        <div class="w-1/4 md:w-1/2 flex items-center justify-end gap-6">
          <div class="hidden md:flex items-center gap-1">
            <font-awesome-icon
              :icon="['fas', 'cart-shopping']"
              data-test="fa-cart"
              v-if="screenWidth > 640 && isLoaded"
              class="cursor-pointer text-xl"
              @click="openModal('cart')"
            />
            <CartCounter />
          </div>
          <CtaBtn
            v-if="user === null"
            :fontSize="'text-xs'"
            :textCol="'text-gray-100'"
            :paddingX="'px-6'"
            class="hidden sm:block"
            @click="openModal('signin')"
          >
            Sign in
          </CtaBtn>
          <CtaBtn
            v-if="user"
            :fontSize="'text-xs'"
            :textCol="'text-gray-100'"
            :paddingX="'px-6'"
            class="hidden sm:block"
            @click="signOut"
          >
            Sign out
          </CtaBtn>
        </div>
      </div>
    </nav>
  </header>
</template>
