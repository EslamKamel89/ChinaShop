<script setup lang="ts">
import type { Category, Color, Image, Product } from "@prisma/client";
defineProps<{
  product: Product & { images: Image[]; category: Category; color: Color };
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
}>();
</script>

<template>
  <SharedModal
    :is-modal-visible="isOpen"
    :title="product.name"
    @on-close="toggleModal(false)"
  >
    <div class="px-10 space-y-4">
      <Carousel class="relative w-full">
        <CarouselContent>
          <CarouselItem
            v-for="(image, index) in product.images"
            :key="image.id"
          >
            <div class="p-1">
              <Card>
                <CardContent
                  class="flex aspect-square items-center justify-center p-2 mx-auto"
                >
                  <img
                    :src="`${baseUrl()}/products/${image.url}`"
                    alt="product image"
                    class="h-72 rounded-lg bg-gray-300"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="">
        <div class="space-y-2 w-full flex flex-col justify-center items-start">
          <div class="flex justify-between w-full">
            <div class="font-bold">{{ product.name }}</div>
            <div class="font-thin text-sm">{{ product.category.name }}</div>
          </div>
          <div>EGP {{ product.price }}</div>
          <div>
            <AdminColorValue :color-code="product.color.value" />
          </div>
          <Button class="w-full" variant="outline"> Add To Card</Button>
        </div>
      </div>
    </div>
  </SharedModal>
</template>
