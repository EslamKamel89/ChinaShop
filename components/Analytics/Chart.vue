<script setup lang="ts">
import { VisAxis, VisStackedBar, VisXYContainer } from "@unovis/vue";
import type { GraphData } from "~/types";

const props = defineProps<{ data: GraphData[] }>();
</script>
<template>
  <div>
    <VisXYContainer :data="pr(data, 'data')">
      <VisStackedBar
        :x="(d:GraphData , i:number)=>i"
        :y="(d:GraphData)=>d.total"
      />
      <VisAxis
        type="x"
        :num-ticks="data.length"
        :tick-format="(index:number)=>data[index].name"
      />
      <VisAxis type="y" />
    </VisXYContainer>
  </div>
</template>
