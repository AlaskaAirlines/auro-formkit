<script>
  // import { AuroForm } from "@aurodesignsystem/auro-form";
  import { AuroInput } from "@aurodesignsystem/auro-input";
  import { AuroButton } from "@aurodesignsystem/auro-button/src/auro-button.js";
  import { AuroForm } from "@aurodesignsystem-dev/auro-formkit/auro-form/class";
  import "@aurodesignsystem/auro-icon";

  AuroInput.register()
  AuroForm.register()
  AuroButton.register()

  function submitHandler(e) {
    console.log(e)
  }

</script>

<div class="h-full bg-[--ds-basic-color-surface-inverse] flex justify-center items-center pb-72">
  <div class="w-lg bg-zinc-100 p-8 rounded-lg">
    <auro-form onsubmit={submitHandler}>
      <h1 class="text-2xl">Auro Form test</h1>
      <div class="flex flex-col gap-2 mt-4">
        <auro-input name="searchBox" required>
          <span slot="label">Search flights</span>
        </auro-input>
        <div class="flex justify-end align-center">
          <auro-button type="submit">Submit</auro-button>
        </div>
      </div>
    </auro-form>
  </div>
</div>
