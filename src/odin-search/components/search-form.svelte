<script lang="ts">
  interface Props {
    searchTerms: string;
    input: HTMLInputElement;
  }

  let { searchTerms = $bindable(), input = $bindable() }: Props = $props();
</script>

<form onsubmit={(e) => e.preventDefault()}>
  <svg
    class="search-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
  <input
    bind:this={input}
    bind:value={searchTerms}
    name="search"
    placeholder="Search for lessons..."
    aria-label="Search for lessons"
  />
  <button
    aria-label="clear search"
    type="button"
    onclick={() => (searchTerms = "")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</form>

<style>
  form {
    position: relative;
    margin-bottom: 0.5rem;
  }
  
  svg.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: var(--muted-text-color);
  }

  input {
    width: 100%;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    border: 2px solid var(--search-border-color);
    border-radius: 8px;
    background-color: var(--search-bg-color);
    color: var(--text-color);
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--search-focus-border-color);
    }

    &::placeholder {
      color: var(--muted-text-color);
      opacity: 0.7;
    }
  }

  button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--card-hover-bg-color);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--muted-text-color);
    }
  }

  @media (max-width: 600px) {
    input {
      font-size: 1rem;
    }
  }
</style>
