import React, { useState } from 'react'
import EntityTypeSelector from '../components/EntityTypeSelector'
import { storageService } from '../services/storageService'
import { EntityType } from '../types/entities'

export default function SearchPage(){
  const [selected, setSelected] = useState<EntityType | undefined>(undefined)
  const [code, setCode] = useState('')
  const [result, setResult] = useState<any|undefined>(undefined)

  const doSearch = ()=>{
    if(!selected){ alert('Chọn loại trước') ; return }
    const r = storageService.findByCode(selected, code)
    setResult(r)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Tìm kiếm theo Code</h2>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <EntityTypeSelector value={selected} onChange={t=>setSelected(t)} />
          <input placeholder="Nhập code" value={code} onChange={e=>setCode(e.target.value)} />
          <button onClick={doSearch}>Tìm</button>
        </div>

        <div style={{marginTop:12}}>
          {result ? (
            <div className="card">
              <div><strong>{result.code}</strong> — {result.entityType}</div>
              <div className="muted">{result.createdAt} • {result.legalEntity}</div>
            </div>
          ) : (<div className="muted">Không có kết quả</div>)}
        </div>
      </div>
    </div>
  )
}
