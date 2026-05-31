"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { projects, CATEGORY_LABELS, allTags } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { AnimateIn } from "@/components/AnimateIn";
import { FilterChips, type ChipOption } from "./FilterChips";
import { ProjectCard } from "./ProjectCard";

const CATEGORY_OPTIONS: ChipOption[] = [
  { label: "All", value: "all" },
  ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((c) => ({
    label: CATEGORY_LABELS[c],
    value: c,
  })),
];

export function ProjectsMasonry() {
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  const tagOptions: ChipOption[] = useMemo(
    () => [
      { label: "All tags", value: "all" },
      ...allTags().map((t) => ({ label: t, value: t })),
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          (tag === "all" || p.tags.includes(tag)),
      ),
    [category, tag],
  );

  const isFiltered = category !== "all" || tag !== "all";

  const clearFilters = () => {
    setCategory("all");
    setTag("all");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <FilterChips
          options={CATEGORY_OPTIONS}
          active={category}
          onChange={setCategory}
          ariaLabel="Filter projects by category"
        />
        <FilterChips
          options={tagOptions}
          active={tag}
          onChange={setTag}
          ariaLabel="Filter projects by tag"
        />
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-xs text-muted">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          No projects match those filters.
        </p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((project, i) => (
            <AnimateIn
              key={project.id}
              delay={(i % 6) * 0.05}
              className="block break-inside-avoid"
            >
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
