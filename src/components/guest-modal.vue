<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  data: {
    email: string;
    tickets: number;
  };
  index: number;
  ticketsRemaining: number;
  save: ({}: any, index: number) => void;
  remove: (index: number) => void;
  close: () => void;
}>();

const { email, tickets } = props.data;
const updatedEmail = ref(email || "");
const updatedTicketCount = ref(tickets || 1);
const isSaveDisabled = ref(true);
const fromEdit = ref(Object.keys(props.data).length > 0);
const modalTitle = fromEdit.value ? "Edit Guest" : "Add Guest";

watch([updatedEmail, updatedTicketCount], () => {
  isSaveDisabled.value = (updatedEmail.value === email && updatedTicketCount.value == tickets) || (updatedEmail.value === "");
});

const increment = () => {
  if(fromEdit.value && ( updatedTicketCount.value < (tickets + props.ticketsRemaining) )) {
    updatedTicketCount.value += 1;
  } else if(!fromEdit.value && ( updatedTicketCount.value < props.ticketsRemaining )) {
    updatedTicketCount.value += 1;
  }
}

const decrement = () => {
  if(updatedTicketCount.value > 1) {
    updatedTicketCount.value -= 1;
  }
}

</script>
<template>
  <div @click="close" class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"></div>
  <div class="w-4/5 py-5 sm:w-[500px] sm:h-[400px] absolute flex flex-col justify-center items-center bg-neutral-50 rounded-lg shadow-md shadow-gray-700 text-cyan-950">
    <span @click="close" class="material-icons absolute top-0 right-0 p-5 text-cyan-950 cursor-pointer">close</span>
    <div class="w-5/6 h-full flex flex-col items-center">
      <h1 class="text-2xl text-center text-cyan-950 pb-10">{{ modalTitle }}</h1>
      <div class="w-full grid grid-cols-1">
        <div class="w-full flex flex-col justify-between pb-5">
          <label class="text-cyan-950 pb-1">Email Address</label>
          <input v-model="updatedEmail" class="rounded" />
        </div>
        <div class="w-full flex justify-between">
          <label class="text-cyan-950">Tickets</label>
          <div class="flex">
            <span class="material-icons cursor-pointer" @click="decrement">remove</span>
            <span class="px-4">{{ updatedTicketCount }}</span>
            <span class="material-icons cursor-pointer" @click="increment">add</span>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-evenly xs:justify-center mt-5">
        <button @click="close" class="w-1/2 xs:w-1/3 mx-1 xs:mx-3 bg-neutral-50 text-emerald-600 font-bold border-emerald-600 border-solid border-2 rounded p-2 xs:p-3 hover:bg-emerald-600 hover:text-neutral-50">
          CANCEL
        </button>
        <button class="w-1/2 xs:w-1/3 mx-1 xs:mx-3 text-neutral-50 bg-zinc-400 font-bold border-zinc-400 border-solid border-2 rounded valid:border-emerald-600 valid:bg-emerald-600 p-2 xs:p-3" :disabled="isSaveDisabled" @click="save({ email: updatedEmail, tickets: updatedTicketCount }, props.index)">SAVE</button>
      </div>
      <button v-if="fromEdit" class="bg-red-500 text-neutral-50 font-bold border-solid border-2 border-red-500 rounded w-1/2 xs:w-1/3 p-1 xs:p-2 m-5 hover:scale-110 hover:transition-transform hover:duration-300" @click="remove(props.index)">DELETE</button>
    </div>
  </div>
</template>
<style scoped></style>
