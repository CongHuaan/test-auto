import React from 'react'
import { BaseEntity, EntityType } from '../types/entities'

export default function EntityList({
  items,
  onEdit,
  onDelete,
}: {
  items: BaseEntity[]
  onEdit: (it: BaseEntity) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="list card">
      {items.length === 0 && <div className="muted">Không có dữ liệu</div>}
      {items.map(it => (
        <div className="item" key={it.id}>
          <div>
            <div><strong>{it.code}</strong> — <span className="muted">{it.entityType}</span></div>
            <div className="muted">{it.createdAt} • {it.legalEntity}</div>
          </div>
          <div className="actions">
            <button onClick={() => onEdit(it)}>Edit</button>
            <button onClick={() => onDelete(it.id)} style={{background:'#ef4444'}}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
