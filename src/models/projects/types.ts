interface Project {
  readonly id: string
  readonly name: string
  readonly slug?: string

  readonly description: string
  readonly summary: string

  readonly role: string
  readonly technologies: string[]

  readonly images?: string[]
  readonly thumbnail?: string
}

interface ProjectMeta {
  readonly prev: Project | null
  readonly next: Project | null
}

interface ProjectWithMeta extends Project {
  meta? : ProjectMeta
}

interface ProjectMetaSlug {
  readonly prev: string | null
  readonly next: string | null
}

interface ProjectDbItem {
  readonly key: string

  readonly id: string
  readonly name: string
  readonly slug?: string

  readonly description: string
  readonly summary: string

  readonly role: string
  readonly technologies: string

  readonly images?: string
  readonly thumbnail: string
}

export type { Project, ProjectMeta, ProjectWithMeta, ProjectMetaSlug, ProjectDbItem }
