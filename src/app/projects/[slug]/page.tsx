import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Raffy Francisco`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.name} — Raffy Francisco`,
      description: project.description,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <ProjectDetail project={project} />
      <ThemeToggle />
    </>
  );
}
