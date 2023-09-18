<script>
  export let icon = "default";
  export let url = "http://defullturl.com";
  export let title = "a default title";
</script>

<a
  href={url}
  class="stack w-full text-center bg-base-300 flex justify-center items-center p-4 no-underline rounded-lg not-prose"
>
  <img src={`/${icon}.png`} alt={icon} height="32" width="32" class="w-8" />
  <span class="font-bold text-lg text-white">{title}</span>
</a>
