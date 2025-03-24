<script lang="ts">
  import type { RangeTuple, FuseResult } from "fuse.js";

  interface Props {
    searchResults: FuseResult<{ title: string; link: string }>[];
  }

  let { searchResults }: Props = $props();

  // TODO: refactor to declarative
  function withHighlight(value: string, indices: RangeTuple[]) {
    return value
      .split("")
      .map((s, i) => {
        if (indices.some(([start, end]) => start === i && end === start)) {
          return `<span class="highlight">${s}</span>`;
        }
        if (indices.some(([start, _end]) => start === i)) {
          return `<span class="highlight">${s}`;
        }
        if (indices.some(([_start, end]) => end === i)) {
          return `${s}</span>`;
        }

        return s;
      })
      .join("");
  }
</script>

<p class="results-count">
  {#if searchResults.length !== 0}
    found {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
  {/if}
</p>

<ul>
  {#each searchResults as result}
    <li>
      <a
        draggable="false"
        href={result.item.link}
        target="_blank"
        class="result-link"
      >
        <article>
          <h3>
            {@html withHighlight(
              result.item.title,
              result.matches?.[0].indices as RangeTuple[]
            )}
          </h3>
          <cite>
            {result.item.link}
          </cite>
        </article>
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
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
          ></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </li>
  {/each}
</ul>

<style>
  .results-count {
    display: flex;
    justify-content: space-between;
    margin-block: 0 1rem;
    font-size: 0.9rem;
    color: var(--muted-text-color);
    min-height: 1.5rem;
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li {
      list-style: none;
    }
  }

  a {
    background-color: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 1rem;
    padding: 1.25rem;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    &:active {
      background-color: var(--card-active-bg-color);
      transform: translateY(0);
    }
    &:focus {
      outline: 2px solid var(--card-focus-outline-color);
      outline-offset: 2;
    }
    &:hover {
      background-color: var(--card-hover-bg-color);
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
      color: var(--title-color);
    }

    cite {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: var(--link-color);
      text-decoration: none;
      word-break: break-all;
      margin: 0;
      gap: 1rem;

      &:hover {
        color: var(--link-hover-color);
        text-decoration: underline;
      }
    }
  }

  svg {
    min-width: 1.5rem;
    min-height: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  /* the highlight class is applied with @html, so we need to use :global */
  :global(.highlight) {
    background-color: var(--highlight-color);
  }

  @media (max-width: 600px) {
    h3 {
      font-size: 1.1rem;
    }
  }
</style>
