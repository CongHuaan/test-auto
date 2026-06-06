import React, { useEffect, useState } from 'react'
import { EntityType, BaseEntity } from '../types/entities'
import { storageService } from '../services/storageService'
import { v4 as uuidv4 } from 'uuid'

const LEGAL = ['HO','Branch 1','Branch 2','Branch 3']

function now() { return new Date().toISOString().slice(0,10) }

export default function DynamicForm({
  entityType,
  existing,
  onSaved,
}: {
  entityType: EntityType
  existing?: BaseEntity
  onSaved?: () => void
}) {
  const [code, setCode] = useState(existing?.code ?? '')
  const [legal, setLegal] = useState(existing?.legalEntity ?? LEGAL[0])
  const [name, setName] = useState((existing as any)?.name ?? '')
  const [date, setDate] = useState((existing as any)?.date ?? (existing as any)?.orderDate ?? existing?.createdAt ?? now())

  useEffect(()=>{ if(existing){ setCode(existing.code); setLegal(existing.legalEntity)} },[existing])

  const handleSave = () => {
    if(!code.trim()){ alert('Code bắt buộc'); return }
    const conflict = storageService.findByCode(entityType, code)
    if(!existing && conflict){ alert('Code đã tồn tại'); return }
    const base: BaseEntity = {
      id: existing?.id ?? uuidv4(),
      code,
      entityType,
      legalEntity: legal,
      createdAt: existing?.createdAt ?? now(),
    }
    const payload = { ...base, name, date }
    if(existing){ storageService.update(entityType, existing.id, payload) }
    else{ storageService.create(entityType, payload as BaseEntity) }
    onSaved && onSaved()
  }

  return (
    <div className="card">
      <div style={{marginBottom:8}}><strong>Loại: {entityType}</strong></div>
      <div className="row" style={{marginBottom:8}}>
        <div style={{flex:1}}>
          <label>Code (bắt buộc)</label>
          <input value={code} onChange={e=>setCode(e.target.value)} />
        </div>
        <div style={{width:180}}>
          <label>Legal Entity</label>
          <select value={legal} onChange={e=>setLegal(e.target.value)}>
            {LEGAL.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div style={{marginBottom:8}}>
        <label>Text / Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
      </div>

      <div style={{marginBottom:8}}>
        <label>Ngày</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>

      <div style={{display:'flex',gap:8}}>
        <button onClick={handleSave}>{existing? 'Cập nhật' : 'Tạo'}</button>
      </div>
    </div>
  )
}
