export interface OpenSourceRepo {
  id: string;
  /** Repo or binary name, shown in mono. */
  name: string;
  licence: string;
  repoUrl: string;
  pitch: string;
  /** Install steps, one command per line. The Copy button joins them with
   *  `&&` so the paste runs in one go. */
  install: string[];
  /** Facts as label → value rows. */
  spec: [label: string, value: string][];
}

export const openSource: OpenSourceRepo[] = [
  {
    id: "memdb",
    name: "memdb",
    licence: "MIT",
    repoUrl: "https://github.com/NullsCollection/agent--recall-memory",
    pitch:
      "Long-term memory for coding agents. It indexes past Claude Code sessions into a local SQLite store, so “how did we solve this before?” has an answer — including when the answer lives in a different repo.",
    // Clone + install, not `go install <repo>@latest`: go.mod declares
    // `github.com/raffy/memdb`, which doesn't match the repo path, so a
    // remote `go install` fails. Switch once the module path is fixed.
    install: [
      "git clone https://github.com/NullsCollection/agent--recall-memory.git",
      "cd agent--recall-memory",
      "go install .",
    ],
    spec: [
      ["Built with", "Go 1.25, SQLite, Ollama embeddings"],
      ["Retrieval", "Brute-force cosine similarity, no vector database"],
      ["Indexed", "253 units across 21 repositories"],
      ["Eval score", "13 / 14 on the golden set"],
    ],
  },
];
