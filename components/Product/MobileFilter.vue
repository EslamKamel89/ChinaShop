<script setup lang="ts">
import type { Category, Color, Size } from "@prisma/client";
import { Funnel } from "lucide-vue-next";
const props = defineProps<{
  colors: Color[];
  categories: Category[];
  sizes: Size[];
}>();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline"> <Funnel /> Filters </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
        <SheetDescription>
          Pick Your Dream With Fraction Of The Cost
        </SheetDescription>
      </SheetHeader>
      <div class="mx-4 my-2">
        <ProductFilter
          value-key="categoryId"
          :data="categories ?? []"
          name="Categories"
        />
        <ProductFilter value-key="sizeId" :data="sizes ?? []" name="Sizes" />
        <ProductFilter value-key="colorId" :data="colors ?? []" name="Colors" />
      </div>
      <SheetFooter>
        <!--
            <SheetClose as-child>
                <Button type="submit"> Save changes </Button>
            </SheetClose>
        -->
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
