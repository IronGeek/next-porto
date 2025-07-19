'use client';

import { DeleteIcon } from "@/ui/icons"

const DeleteButton = ({ handleDelete }) => {
  return (
    <button className="button danger" onClick={handleDelete}><DeleteIcon size="1.1em" /> Delete</button>
  )
}

export { DeleteButton }
