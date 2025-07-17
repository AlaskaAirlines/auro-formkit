<script>
  import {AuroHyperlink} from '@aurodesignsystem/auro-hyperlink/src/auro-hyperlink.js'
  import "../app.css";

  let { children } = $props();

  AuroHyperlink.register();
</script>

<div class="h-screen flex flex-col">
  <nav class="bg-zinc-900 p-4 flex gap-8">
    <a class="ml-auto bg-zinc-700 px-4 py-2 text-white rounded-sm" href="/">
      Go to /
    </a>
    <a class="bg-zinc-700 px-4 py-2 text-white rounded-sm" href="/form-test">
      Go to Form Test
    </a>
  </nav>
  <div class="flex-1">
    {@render children()}
  </div>
</div>

