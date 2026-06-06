import { EntityType, BaseEntity } from '../types/entities'

const keyFor = (entityType: EntityType) => `entities_${entityType}`

export const storageService = {
  getAll(entityType: EntityType) {
    const raw = localStorage.getItem(keyFor(entityType))
    return raw ? (JSON.parse(raw) as BaseEntity[]) : []
  },
  saveAll(entityType: EntityType, items: BaseEntity[]) {
    localStorage.setItem(keyFor(entityType), JSON.stringify(items))
  },
  create(entityType: EntityType, item: BaseEntity) {
    const items = storageService.getAll(entityType)
    items.push(item)
    storageService.saveAll(entityType, items)
    return item
  },
  update(entityType: EntityType, id: string, patch: Partial<BaseEntity>) {
    const items = storageService.getAll(entityType)
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) throw new Error('Not found')
    items[idx] = { ...items[idx], ...patch }
    storageService.saveAll(entityType, items)
    return items[idx]
  },
  delete(entityType: EntityType, id: string) {
    let items = storageService.getAll(entityType)
    items = items.filter(i => i.id !== id)
    storageService.saveAll(entityType, items)
  },
  findByCode(entityType: EntityType, code: string) {
    const items = storageService.getAll(entityType)
    return items.find(i => i.code === code)
  }
}
