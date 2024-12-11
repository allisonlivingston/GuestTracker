<script setup lang="ts">
import { onMounted, ref } from "vue";
import GuestRepository from "src/services/guest-repository";
import GuestModal from "src/components/guest-modal.vue";

const repo = new GuestRepository();
const guests = ref<{ email: string; tickets: number }[]>([]);
const isLoading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const modalData = ref<{ email: string; tickets: number }>({ email: '', tickets: 0 });
const ticketCapacity = 20;
const ticketsClaimed = ref(0);
const ticketsRemaining = ref(0);
const currIndex = ref(0);

const updateTicketsRemaining = (data: any[]) => {
  let totalTickets = data.reduce((total: number, guest: any) => total + guest.tickets, 0);
    ticketsClaimed.value = totalTickets;
    ticketsRemaining.value = (ticketCapacity - totalTickets);
}

onMounted(async () => {
  try {
    const data = await repo.load();
    guests.value = data;
    updateTicketsRemaining(data);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});

const handleAddGuest = () => {
  isModalOpen.value = true;
  currIndex.value = guests.value.length;
};

const handleEditGuest = (guest: any, index: number) => {
  modalData.value = guest;
  currIndex.value = index;
  isModalOpen.value = true;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  currIndex.value = 0;
  modalData.value = { email: '', tickets: 0 };
};

const handleSave = (guest: any, index: number) => {
  guests.value.splice(index, 1, guest);
  repo.save(guests.value);
  updateTicketsRemaining(guests.value);
  handleModalClose();
};

const handleDelete = (index: number) => {
  guests.value.splice(index, 1);
  repo.save(guests.value);
  updateTicketsRemaining(guests.value);
  handleModalClose();
}

</script>

<template>
  <guest-modal
    v-if="isModalOpen"
    :close="handleModalClose"
    :save="handleSave"
    :remove="handleDelete"
    :data="modalData"
    :index="currIndex"
    :ticketsRemaining="ticketsRemaining"
  ></guest-modal>
  <div class="w-full flex justify-center mt-6">
    <p v-if="isLoading" class="text-neutral-50">Loading...</p>

    <div v-else-if="guests && guests.length" class="w-full flex flex-col items-center">
      <table class="w-3/4 sm:w-full max-w-screen-sm border border-2 border-black overflow-hidden rounded-lg shadow-xl shadow-zinc-900">
        <thead class="bg-neutral-50 border-b border-solid border-b-2 border-cyan-950">
          <tr class="">
            <th class="text-left p-4 text-cyan-950">Email Address</th>
            <th class="text-left p-4 text-cyan-950">Tickets</th>
            <th class="p-4"></th>
          </tr>
        </thead>
        <tbody class="bg-neutral-50 divide-y divide-cyan-950 w-full">
          <tr v-for="(guest, index) in guests" :key="index">
              <td class="p-4 text-cyan-950">{{ guest.email }}</td>
              <td class="p-4 text-cyan-950">{{ guest.tickets }}</td>
              <button
                  class="text-emerald-600 bg-neutral-50 font-bold border-emerald-600 border-solid border-2 rounded w-14 md:w-28 py-2 m-4 hover:bg-emerald-600 hover:text-neutral-50"
                  @click="handleEditGuest(guest, index)"
                >
                  EDIT
                </button>
          </tr>
          <tr class="w-full text-cyan-950">
              <td v-if="ticketsRemaining > 1" class="w-1/2">
                <h2 class="flex items-center p-4">Only <p class="font-bold text-xl">&nbsp;{{ ticketsRemaining }}&nbsp;</p> tickets left!</h2>
              </td>
              <td v-else-if="ticketsRemaining === 1" >
                <h2 class="flex items-center p-4">Only <p class="font-bold text-xl">&nbsp;{{ ticketsRemaining }}&nbsp;</p> ticket left!</h2>
              </td>
              <td v-else class="p-4">
                <h2 class="flex items-center font-bold">No tickets left!</h2>
              </td>
              <td class="p-4">{{ ticketsClaimed }}</td>
              <td class="p-4 flex items-center justify-start">
                <button v-show="ticketsRemaining !== 0" class="bg-emerald-600 text-neutral-50 font-bold border-2 border-solid border-emerald-600 rounded w-28 py-2 hover:shadow-md hover:shadow-zinc-900 hidden md:table-cell" @click="handleAddGuest" :disabled="ticketsRemaining === 0">
                  ADD GUEST
                </button>
                <span v-show="ticketsRemaining !== 0" class="material-icons table-cell md:!hidden text-emerald-600 !text-3xl" @click="handleAddGuest">add</span>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else="guests && !guests.length">No items found.</p>
  </div>
</template>

<style scoped></style>
