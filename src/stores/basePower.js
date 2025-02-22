import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";
import { UseDamageStore } from "./damage";

export const UseBasePowerStore = defineStore("basePower", () => {
  const pm = usePokemonStore();
  const dm = UseDamageStore();

  const basePowerModifier = (attacker, defender, move) => {

    let atkSpe = speedModifier(
      pm[attacker].stat.spe,
      pm[attacker].statModifier.speUp,
      pm[attacker].statModifier.speDown,
      pm[attacker].item
    );
    let defSpe = speedModifier(
      pm[defender].stat.spe,
      pm[defender].statModifier.speUp,
      pm[defender].statModifier.speDown,
      pm[defender].item
    );
    let aw =
      pm.pokemonList[pm[attacker].Name].weightkg * weightAbility(attacker);
    let dw =
      pm.pokemonList[pm[defender].Name].weightkg * weightAbility(defender);

    if (move.num === 875) {
      //水蒸氣
      if (pm.fieldCondition.weather.sun) {
        return 120;
      }
    }

    if (move.num === 876) {
      //精神劍
      if (pm.fieldCondition.field.electric) {
        dm.detailStat.attacker.field = "電氣場地";
        return 120;
      }
    }

    if (move.num === 802) {
      //精神劍
      if (pm.fieldCondition.field.misty) {
        dm.detailStat.attacker.field = "薄霧場地";
        return 150;
      }
    }

    if (pm.fieldCondition.field.grassy) {
      //地震、重踏
      if (move.num === 89) {
        dm.detailStat.attacker.field = "青草場地";
        return 50;
      }
      if (move.num === 523) {
        dm.detailStat.attacker.field = "青草場地";
        return 30;
      }
    }

    if (move.num === 500 || move.num === 681) {
      //囂張&輔助力量
      let count = 1;
      if (pm[attacker].statModifier.atkUp > 2) {
        count += pm[attacker].statModifier.atkUp - 2;
      }
      if (pm[attacker].statModifier.defUp > 2) {
        count += pm[attacker].statModifier.defUp - 2;
      }
      if (pm[attacker].statModifier.spaUp > 2) {
        count += pm[attacker].statModifier.spaUp - 2;
      }
      if (pm[attacker].statModifier.spdUp > 2) {
        count += pm[attacker].statModifier.spdUp - 2;
      }
      if (pm[attacker].statModifier.speUp > 2) {
        count += pm[attacker].statModifier.speUp - 2;
      }
      return 20 * count;
    }

    if (move.num === 486) {
      //電球
      if (pm[attacker].item === "Choice Scarf") {
        dm.detailStat.attacker.item = "講究圍巾";
      } else if (pm[attacker].item === "Iron Ball") {
        dm.detailStat.attacker.item = "黑色鐵球";
      }
      if (pm[defender].item === "Choice Scarf") {
        dm.detailStat.defender.item = "講究圍巾";
      } else if (pm[defender].item === "Iron Ball") {
        dm.detailStat.defender.item = "黑色鐵球";
      }

      if (atkSpe / defSpe >= 4) {
        return 150;
      } else {
        return 20 + Math.floor(atkSpe / defSpe) * 3;
      }
    }

    if (move.num === 360) {
      //陀螺球
      if (pm[attacker].item === "Choice Scarf") {
        dm.detailStat.attacker.item = "講究圍巾";
      } else if (pm[attacker].item === "Iron Ball") {
        dm.detailStat.attacker.item = "黑色鐵球";
      }
      if (pm[defender].item === "Choice Scarf") {
        dm.detailStat.defender.item = "講究圍巾";
      } else if (pm[defender].item === "Iron Ball") {
        dm.detailStat.defender.item = "黑色鐵球";
      }

      let pw = Math.trunc((25 * defSpe) / atkSpe) + 1;
      return Math.min(pw, 150)
    }

    if (move.num === 447 || move.num === 67) {
      //打草結、踢倒

      if (pm[defender].ability === "Heavy Metal") {
        dm.detailStat.defender.ability = "重金屬";
      } else if (pm[defender].ability === "Light Metal") {
        dm.detailStat.defender.ability = "輕金屬";
      }

      if (dw >= 200) {
        return 120;
      } else if (dw >= 100) {
        return 100;
      } else if (dw >= 50) {
        return 80;
      } else if (dw >= 25) {
        return 60;
      } else if (dw >= 10) {
        return 40;
      } else {
        return 20;
      }
    }

    if (move.num === 535 || move.num === 484) {
      //重磅衝撞、高溫重壓

      if (pm[attacker].ability === "Heavy Metal") {
        dm.detailStat.attacker.ability = "重金屬";
      } else if (pm[attacker].ability === "Light Metal") {
        dm.detailStat.attacker.ability = "輕金屬";
      }
      if (pm[defender].ability === "Heavy Metal") {
        dm.detailStat.defender.ability = "重金屬";
      } else if (pm[defender].ability === "Light Metal") {
        dm.detailStat.defender.ability = "輕金屬";
      }
      return 20 + Math.min(Math.floor(aw / dw), 5) * 20
    }

    if (move.num === 311) {
      // 氣象球
      if (pm.fieldCondition.weather.sun) {
        dm.detailStat.attacker.weather = "晴天";
        pm[attacker].move.type = "Fire";
        return 100;
      } else if (pm.fieldCondition.weather.rain) {
        dm.detailStat.attacker.weather = "雨天";
        pm[attacker].move.type = "Water";
        return 100;
      } else if (pm.fieldCondition.weather.snow) {
        dm.detailStat.attacker.weather = "下雪";
        pm[attacker].move.type = "Ice";
        return 100;
      } else if (pm.fieldCondition.weather.sandstorm) {
        dm.detailStat.attacker.weather = "沙暴";
        pm[attacker].move.type = "Rock";
        return 100;
      }
    }

    if (move.num === 805) {
      // 大地波動
      if (pm.fieldCondition.field.electric) {
        dm.detailStat.attacker.field = "電氣場地";
        pm[attacker].move.type = "Electric";
        return 100;
      } else if (pm.fieldCondition.field.grassy) {
        dm.detailStat.attacker.field = "青草場地";
        pm[attacker].move.type = "Grass";
        return 100;
      } else if (pm.fieldCondition.field.misty) {
        dm.detailStat.attacker.field = "薄霧場地";
        pm[attacker].move.type = "Fairy";
        return 100;
      } else if (pm.fieldCondition.field.psychic) {
        dm.detailStat.attacker.field = "精神場地";
        pm[attacker].move.type = "Psychic";
        return 100;
      }
    }

    if (move.num === 851) {
      //太晶爆發
      const {
        atkUp,
        atkDown,
        spaUp,
        spaDown
      } = pm[attacker].statModifier
      let atk = Math.trunc((pm[attacker].stat.atk * atkUp) / atkDown);
      let spa = Math.trunc((pm[attacker].stat.spa * spaUp) / spaDown);
      if (pm[attacker].teraType !== "None") {
        dm.detailStat.attacker.tera =
          "太晶" + pm.typeList[pm[attacker].teraType];
        if (atk > spa) {
          pm[attacker].move.category = "Physical";
          pm[attacker].move.type = pm[attacker].teraType;
        } else {
          pm[attacker].move.category = "Special";
          pm[attacker].move.type = pm[attacker].teraType;
        }
      }
    }

    if (move.num === 904) {
      //藤蔓棍擊
      if (
        pm[attacker].Name === "厄鬼椪-水井" ||
        pm[attacker].Name === "厄鬼椪-火灶" ||
        pm[attacker].Name === "厄鬼椪-礎石"
      ) {
        pm[attacker].move.type = pm[attacker].type2;
      }
    }

    return move.basePower;
  };

  const itemModifier = (item) => {
    if (item === "Choice Scarf") {
      return 1.5;
    } else if (item === "Iron Ball") {
      return 0.5;
    } else {
      return 1;
    }
  };

  const weightAbility = (num) => {
    let abi = pm[num].ability;
    if (abi === "Heavy Metal") {
      return 2;
    } else if (abi === "Light Metal") {
      return 0.5;
    } else {
      return 1;
    }
  };

  /**
   * Description placeholder
   * @date 2023/11/10 - 下午3:32:27
   *
   * @param {number} speed
   * @param {number} speUp
   * @param {number} speDown
   * @param {string} item
   * @returns {number}
   */
  function speedModifier(speed, speUp, speDown, item) {
    return Math.round(
      (Math.trunc(
        (speed * speUp) /
        speDown
      ) *
        (4096 * itemModifier(item))) /
      4096 -
      0.001
    )
  }

  return {
    basePowerModifier,
  };
});
