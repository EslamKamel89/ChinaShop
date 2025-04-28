<script setup lang="ts"></script>
<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">
          <slot name="trigger"></slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <slot name="content"></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
