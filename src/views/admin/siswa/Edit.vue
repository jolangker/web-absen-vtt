<template>
  <div class="bg-white rounded shadow p-8">
    <h2 class="text-2xl pb-2 font-medium border-b-2 border-blue-400">
      EDIT $NAME
    </h2>
    <form class="py-4 flex flex-col space-y-6">
      <div>
        <label for="id_student" class="crud__label">ID</label>
        <input
          id="id_student"
          type="text"
          :value="$route.params.id"
          class="crud__form"
          readonly
        />
      </div>
      <div>
        <label for="name_student" class="crud__label">NAMA</label>
        <input id="NAME_student" type="text" class="crud__form" />
      </div>
      <div>
        <label for="class_student" class="crud__label">KELAS</label>
        <select id="class_student" class="block w-full crud__form">
          <option disabled selected>Pilih Kelas</option>
          <option value="1">X</option>
          <option value="2">XI</option>
          <option value="3">XII</option>
          <option value="4">XIII</option>
        </select>
      </div>
      <div>
        <label for="major_student" class="crud__label">Jurusan</label>
        <select id="major_student" class="block w-full crud__form">
          <option disabled selected>Pilih Jursan</option>
          <option value="1">KGSP</option>
          <option value="2">SIJA</option>
          <option value="3">TEDK</option>
          <option value="4">TFLM</option>
          <option value="5">TMPO</option>
          <option value="6">TTL</option>
        </select>
      </div>
      <div class="flex justify-between items-center">
        <button class="btn btn__blue py-2 px-6">
          <i class="fas fa-long-arrow-alt-left"></i>
          <span class="ml-2">Back</span>
        </button>
        <button class="btn btn__green py-2 px-6">
          <span class="mr-2">Update</span>
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  setup(props) {
    console.log(props.id);
  },
};
</script>

<style></style>
