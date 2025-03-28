<script lang="ts">
  import EmptyState from "./components/empty-state.svelte";
  import SearchForm from "./components/search-form.svelte";
  import SearchResults from "./components/search-results.svelte";
  import coursesData from "../../scrape-stuff/odin-data.json";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";

  const fuse = new Fuse(coursesData, {
    keys: ["title"],
    threshold: 0.2,
    includeMatches: true,
  });

  function setSearchTermsWithFocus(v: string) {
    return () => {
      searchTerms = v;
      input.focus();
    };
  }

  $effect(() => {
    const url = new URL(window.location.href);

    if (searchTerms !== "") {
      url.searchParams.set("search", searchTerms);
    } else {
      url.searchParams.delete("search");
    }

    window.history.replaceState(null, "", url.toString());
  });

  let searchTerms = $state(
    new URL(window.location.href).searchParams.get("search") ?? ""
  );

  const searchResults = $derived(fuse.search(searchTerms));
  let input = $state() as HTMLInputElement;
  $inspect(searchTerms);
</script>

<main class="container">
  <header>
    <h1>Odin Search</h1>
    <p>
      Search across {coursesData.length} lessons
    </p>
  </header>

  <div class="search-container">
    <SearchForm bind:searchTerms bind:input />
    <SearchResults {searchResults} />
    <section class="empty-state-container">
      {#if searchTerms === ""}
        <EmptyState>
          {#snippet icon()}
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          {/snippet}
          {#snippet message()}
            Type any keyword to discover relevant lessons
          {/snippet}
          {#snippet tip()}
            Try searching for: <button
              class="suggestion"
              onclick={setSearchTermsWithFocus("project")}>project</button
            >,
            <button class="suggestion" onclick={setSearchTermsWithFocus("css")}
              >css</button
            >, or
            <button
              class="suggestion"
              onclick={setSearchTermsWithFocus("javascript")}>javascript</button
            >
          {/snippet}
          {#snippet title()}
            Ready to explore The Odin Project
          {/snippet}
        </EmptyState>
      {:else if searchResults.length === 0}
        <EmptyState>
          {#snippet icon()}
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          {/snippet}
          {#snippet message()}
            No matching lessons found
          {/snippet}
          {#snippet tip()}
            Try adjusting your search term or using different keywords
          {/snippet}
          {#snippet title()}
            No matching lessons found
          {/snippet}
        </EmptyState>
      {/if}
    </section>
  </div>
</main>

<style>
  main {
    max-width: 50rem;
    margin: 1rem auto;
    padding: 2rem calc(8px + 1.5625vw);
    background-color: var(--container-bg-color);
    border-radius: 1rem;
  }

  header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin: 0 0 0.5rem;
      background: linear-gradient(
        135deg,
        oklch(0.7 0.2 250),
        oklch(0.7 0.15 280)
      );
      background-clip: text;
      color: transparent;
      font-weight: 800;
    }

    p {
      font-size: 1.1rem;
      color: var(--muted-text-color);
      margin: 0;
    }
  }

  .search-container {
    padding: calc(8px + 1.5625vw);
  }

  .empty-state-container {
    text-align: center;
    color: var(--muted-text-color);
  }

  .suggestion {
    color: var(--link-color);
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: var(--highlight-color);
    border-radius: 4px;
    transition: all 0.2s;
    display: inline-block;
    margin: 0 0.25rem;
    border: none;
    font: inherit;

    &:hover {
      color: var(--link-hover-color);
      background-color: var(--highlight-color);
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
