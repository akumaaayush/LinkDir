<script>
  export let icon = "custom";
  export let url = "https://www.example.com";
  export let title = "a default title";
</script>

<a
  href={url}
  class="stack w-full text-center bg-base-300 flex mx-auto justify-center items-center p-4 no-underline rounded-lg not-prose
  "
>
  <img
    src={`/${icon}.png`}
    alt={icon}
    height="32"
    width="32"
    class="w-8 mx-3"
  />
  <span class="font-bold text-lg text-white">{title}</span>
</a>
