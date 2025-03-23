<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    icon: Snippet;
    message: Snippet;
    tip: Snippet;
    title: Snippet;
  }

  const { icon, message, tip, title }: Props = $props();
</script>

<div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {@render icon()}
  </svg>
  <h2>{@render title()}</h2>
  <p class="message">
    {@render message()}
  </p>
  <p>{@render tip()}</p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    height: 20rem;
  }

  svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--title-color);
  }

  .message {
    font-size: 1.1rem;
    color: var(--muted-text-color);
    max-width: 90%;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 1.2rem;
    }
  }
</style>
