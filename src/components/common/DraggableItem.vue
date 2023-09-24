<script>
export default {
	props: {},
	emits: ["drag", "drop"],
	data() {
		return {
			offset: {
				x: 0,
				y: 0,
			},
			isDragged: false,
			item: null,
		};
	},
	methods: {
		startDrag($event) {
			const rect = $event.target.getBoundingClientRect();
			this.offset = {
				x: $event.x - rect.width / 2,
				y: $event.y - rect.height / 2,
			};
			this.isDragged = true;
			this.item = $event.target;

			document.body.classList.add("dragged");
			window.addEventListener("mousemove", this.drag);
			window.addEventListener("mouseup", this.drop);
		},
		drag($event) {
			this.offset = {
				x: this.offset.x + $event.movementX,
				y: this.offset.y + $event.movementY,
			};
			this.$emit("drag", $event, this.item);
		},
		drop($event) {
			document.body.classList.remove("dragged");
			window.removeEventListener("mousemove", this.drag);
			window.removeEventListener("mouseup", this.drop);
			this.$emit("drop", $event, this.item);

			this.offset = {
				x: 0,
				y: 0,
			};
			this.isDragged = false;
			this.item = null;
		},
	},
	mounted() {},
};
</script>

<template>
	<div
		class="draggable-item"
		:class="{ dragged: isDragged }"
		:style="{
			'--drag-offset-x': offset.x + 'px',
			'--drag-offset-y': offset.y + 'px',
		}"
		@mousedown="startDrag($event)"
	>
		<slot></slot>
	</div>
</template>

<style>
.draggable-item {
	/* transform: translate(var(--drag-offset-x), var(--drag-offset-y)); */
	left: var(--drag-offset-x);
	top: var(--drag-offset-y);
	cursor: grab;
	border-radius: 14px;
}
.draggable-item > * * {
	pointer-events: none !important;
}
.draggable-item.dragged {
	position: absolute;
	/* transform: translate(-50%, -50%); */
	user-select: none;
	pointer-events: none;
	z-index: 999999;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
		rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

body.dragged * {
	cursor: grabbing !important;
}
</style>
