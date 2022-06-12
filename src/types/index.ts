export interface FileType {
  /** File Name */
  name?: string
  /** File unique identifier */
  fileKey?: number | string

  /** File upload status */
  status?: "inited" | "uploading" | "error" | "finished"

  /** File upload status */
  progress?: number

  /** The url of the file can be previewed. */
  url?: string
}

export interface FileElementResponse {
  url: string
  name: string
}
