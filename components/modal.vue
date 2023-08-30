<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { useMagicKeys } from '@vueuse/core'
const props = defineProps<{
	show: boolean
	icon?: string
	action?: string
	cancel?: string
	flexCol?: boolean
}>()
const emits = defineEmits(['cancel', 'action'])

const { escape /* keys you want to monitor */ } = useMagicKeys()
watch(escape, (v) => {
  if (v)
  emits('cancel')
})

const cancelEmit = (e:any) =>{
	e.stopPropagation()
}
</script>

<template>
	<Transition name="fade">
		<div v-if="props.show" class="fixed inset-0 overflow-y-auto z-[200]" @click="$emit('cancel')">
			<div class="flex h-screen items-center justify-center">
				<div class="rounded-md bg-zinc-900 shadow-lg" @click="cancelEmit">
					<div class="mt-5 text-center">
						<div v-if="!props.action && !props.cancel" class="flex flex-row-reverse pr-5">
							<button type="button" @click="$emit('cancel')">
                                <XMarkIcon class="h-6 w-6 text-white"/>
							</button>
						</div>
						<h3 class="px-4 text-2xl font-bold"><slot name="title" /></h3>
						<div class="mt-2 px-4 text-lg">
							<slot name="description" />
						</div>
						<div
							class="flex items-center px-4 py-3"
							:class="flexCol ? 'flex-col-reverse space-y-2 space-y-reverse' : 'space-x-4'"
						>
							<button
								type="button"
								@click="$emit('cancel')"
								v-if="props.cancel"
								class="w-full rounded-lg bg-secondary-button px-4 py-2 text-xl font-bold"
							>
								{{ props.cancel }}
							</button>
							<button
								type="button"
								v-if="props.action"
								@click="$emit('action')"
								class="w-full rounded-lg bg-secondary px-4 py-2 text-xl font-bold"
							>
								{{ props.action }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>

	<Transition name="fade">
		<div v-if="props.show" class="backdrop"></div>
	</Transition>
</template>

<style scoped lang="css">
.backdrop {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(51, 51, 51, 0.7);
	z-index: 105;
}
</style>
