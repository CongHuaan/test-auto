import React, { useState } from 'react'
import EntityTypeSelector from '../components/EntityTypeSelector'
import DynamicForm from '../components/DynamicForm'
import EntityList from '../components/EntityList'
import { storageService } from '../services/storageService'
import { EntityType } from '../types/entities'

export default function HomePage(){
  const [selected, setSelected] = useState<EntityType | undefined>(undefined)
  const [editing, setEditing] = useState<any|undefined>(undefined)
  const [list, setList] = useState<any[]>([])

  const load = (t?: EntityType)=>{
    if(!t) return setList([])
    setList(storageService.getAll(t))
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Quick Create</h2>
        <div style={{display:'flex',gap:8}}>
          <EntityTypeSelector value={selected} onChange={(t)=>{ setSelected(t); load(t) }} />
        </div>
        {selected && (
          <div style={{marginTop:12}}>
            <DynamicForm entityType={selected} onSaved={()=>{ load(selected) }} existing={editing} />
            <EntityList items={list} onEdit={(it)=>{ setEditing(it) }} onDelete={(id)=>{ storageService.delete(selected!, id); load(selected) }} />
          </div>
        )}
      </div>
    </div>
  )
}
