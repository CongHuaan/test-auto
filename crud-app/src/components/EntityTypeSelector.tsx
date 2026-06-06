import React from 'react'
import { EntityType } from '../types/entities'

const TYPES: EntityType[] = ['Product','Invoice','Employee','Customer','Order']

export default function EntityTypeSelector({
  value,
  onChange,
}: {
  value?: EntityType
  onChange: (t: EntityType) => void
}) {
  return (
    <select value={value ?? ''} onChange={e => onChange(e.target.value as EntityType)}>
      <option value="">-- Chọn loại --</option>
      {TYPES.map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  )
}
