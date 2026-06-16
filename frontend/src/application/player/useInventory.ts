import { useInventoryStore } from '../../store/inventoryStore'

export function useInventory() {
  const pusaka = useInventoryStore((s) => s.pusaka)
  const prasasti = useInventoryStore((s) => s.prasasti)
  return { pusaka, prasasti }
}
