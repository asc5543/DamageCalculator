<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { UseDamageStore } from "../stores/damage";
import { usePokemonStore } from "../stores/pokemon";

const store = UseDamageStore();

const copy = (index) => {
  console.log(index);
  navigator.clipboard.writeText(`${store.detailContent[index]}
${store.resultContent[index]}`);
  toast.dark("複製訊息成功！", {
    position: toast.POSITION.TOP_CENTER,
    multiple: false,
    transition: toast.TRANSITIONS.SLIDE,
    hideProgressBar: true,
    autoClose: 500,
  });
};
</script>
<template>
  <div class="result">
    <div class="calculate-button d-flex justify-content-around mb-3">
      <button
        type="button"
        class="btn btn-secondary"
        @click="store.damageCalculate('pokemon1', 'pokemon2')"
      >
        寶可夢1<span class="material-symbols-outlined pt-0"> swords </span
        >寶可夢2
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        @click="store.damageCalculate('pokemon2', 'pokemon1')"
      >
        寶可夢2<span class="material-symbols-outlined"> swords </span>寶可夢1
      </button>
    </div>

    <div class="result-content pt-1">
      <div
        class="d-flex justify-content-between"
        v-for="(content, index) in store.resultContent"
      >
        <p class="pt-1">{{ content }}</p>
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          :data-bs-target="'#result' + index"
        >
          詳細顯示
        </button>

        <div class="modal fade" :id="'result' + index" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-body">
                {{ store.detailContent[index] }}
                <br />
                {{ store.resultContent[index] }}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary pt2"
                  @click="copy(index)"
                >
                  複製訊息
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
