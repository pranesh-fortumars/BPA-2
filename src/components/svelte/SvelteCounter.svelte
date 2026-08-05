<!-- @component
A counter written with Svelte (v4 compatible)
-->
<script>
	let count = 0;

	function add() {
		count += 1;
	}

	function subtract() {
		count -= 1;
	}
</script>

<div class="counter text-white flex items-center gap-4 p-4 border border-slate-800 rounded-xl bg-slate-900/50">
	<button on:click={subtract} class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">-</button>
	<pre class="font-bold text-xl">{count}</pre>
	<button on:click={add} class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">+</button>
</div>
<div class="counter-message mt-4 text-slate-400 text-sm">
	<slot />
</div>
