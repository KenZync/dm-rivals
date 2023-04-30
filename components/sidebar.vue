<template>
  <div class="min-h-screen bg-zinc-900">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 xl:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-zinc-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 ring-1 ring-white/10"
              >
                <Menus />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5"
      >
        <Menus />
      </div>
    </div>

    <div class="xl:pl-72">
      <!-- Sticky search header -->
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-zinc-900 px-4 shadow-sm sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-white xl:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-5 w-5" aria-hidden="true" />
        </button>
        <!-- <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full">
              <MagnifyingGlassIcon
                class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-stone-200"
                aria-hidden="true"
              />
              <input
                id="search-field"
                class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-stone-200 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div> -->
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const sidebarOpen = ref(false);
const playerUser = usePlayer();
onMounted(() => {
  if (localStorage.getItem("player")) {
    try {
      playerUser.value = localStorage.getItem("player") || '';
      // playerUser.value = localStorage.getItem("player");
      // playerInput.value = playerUser.value
    } catch (e) {
      localStorage.removeItem("player");
    }
  }
});
</script>
