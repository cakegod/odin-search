<script lang="ts">
  import type { RangeTuple } from "fuse.js";
  import data from "../../scrape-stuff/odin-data.json";
  import Fuse from "fuse.js";

  function withHighlight(value: string, indices: RangeTuple[]) {
    return value
      .split("")
      .map((s, i) => {
        if (indices.some(([start, end]) => start === i && end === start)) {
          return `<span class="highlight">${s}</span>`;
        } else if (indices.some(([start, _end]) => start === i)) {
          return `<span class="highlight">${s}`;
        } else if (indices.some(([_start, end]) => end === i)) {
          return `${s}</span>`;
        }

        return s;
      })
      .join("");
  }

  const fuse = new Fuse(data, {
    keys: ["title"],
    threshold: 0.2,
    includeMatches: true,
  });

  let searchTerms = $state("");
  const searchResults = $derived(fuse.search(searchTerms));
</script>

<div class="container">
  <header>
    <h1>Odin Search</h1>
    <p class="subtitle">
      Search across {data.length} lessons
    </p>
  </header>

  <div class="search-container">
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
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        bind:value={searchTerms}
        name="search"
        class="search-input"
        placeholder="Search for lessons..."
        aria-label="Search for lessons"
      />
      <button
        class="clear-button"
        aria-label="Clear search"
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
    <p class="results-count">
      {#if searchResults.length !== 0}
        found {searchResults.length} result{searchResults.length === 1
          ? ""
          : "s"}
      {/if}
    </p>
    <div class="results">
      {#each searchResults as result}
        <a
          draggable="false"
          href={result.item.link}
          class="link-card"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <div>
            <p class="link-title">
              {@html withHighlight(
                result.item.title,
                result.matches?.[0].indices as RangeTuple[]
              )}
            </p>
            <p class="link-url">
              {result.item.link}
            </p>
          </div>
          <svg
            class="external-link-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
            ></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      {/each}
    </div>
    <div class="results-state">
      {#if searchTerms === ""}
        <div class="empty-state-container initial-state">
          <svg
            class="empty-state-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h2 class="empty-state-title">Ready to explore The Odin Project</h2>
          <p class="empty-state-message">
            Type any keyword to discover relevant lessons
          </p>
          <p class="empty-state-tip">
            Try searching for: <span class="suggestion">project</span>,
            <span class="suggestion">css</span>, or
            <span class="suggestion">javascript</span>
          </p>
        </div>
      {:else if searchResults.length === 0}
        <div class="empty-state-container no-results-state">
          <svg
            class="empty-state-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h2 class="empty-state-title">No matching lessons found</h2>
          <p class="empty-state-message">
            Try adjusting your search term or using different keywords
          </p>
          <p class="empty-state-tip">
            Check for typos or try more general terms
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
