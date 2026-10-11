import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, DealEvaluation, Member, Product } from '../types'
import { addItem, itemCount, removeLine, setQty } from '../lib/cart'
import { evaluateDeals, TIER_RANK } from '../lib/deals'
import { DEALS } from '../data/deals'
import { STORAGE_KEYS } from '../lib/storage'
import { withViewTransition } from '../lib/viewTransition'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Toast {
  id: number
  message: string
}

interface StoreValue {
  /* Cart */
  items: CartItem[]
  count: number
  addToCart: (item: Omit<CartItem, 'lineId' | 'qty'>, qty?: number) => void
  changeQty: (lineId: string, qty: number) => void
  removeFromCart: (lineId: string) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void

  /* Deals */
  evaluation: DealEvaluation
  selectedDealId: string | 'auto' | null
  setSelectedDealId: (id: string | 'auto' | null) => void
  appliedDealLabel: string | null

  /* Membership */
  member: Member | null
  joinClub: (member: Member) => void
  leaveClub: () => void

  /* Product modal */
  activeProduct: Product | null
  openProduct: (product: Product) => void
  closeProduct: () => void

  /* Motion toggle */
  animationsPaused: boolean
  toggleAnimations: () => void

  /* Toasts */
  toasts: Toast[]
  pushToast: (message: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

let toastSeq = 0

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEYS.cart, [])
  const [member, setMember] = useLocalStorage<Member | null>(STORAGE_KEYS.member, null)
  const [selectedDealId, setSelectedDealId] = useLocalStorage<string | 'auto' | null>(
    STORAGE_KEYS.selectedDeal,
    'auto',
  )
  const [animationsPaused, setAnimationsPaused] = useLocalStorage<boolean>(
    STORAGE_KEYS.motionPaused,
    false,
  )
  const [cartOpen, setCartOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])

  /* Pause CSS keyframe loops site-wide via a root class. */
  useEffect(() => {
    document.documentElement.classList.toggle('anim-paused', animationsPaused)
  }, [animationsPaused])

  const evaluation = useMemo(
    () => evaluateDeals(items, member?.tierId ?? null, DEALS),
    [items, member],
  )

  const pushToast = useCallback((message: string) => {
    const id = ++toastSeq
    setToasts((current) => [...current, { id, message }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const addToCart = useCallback(
    (item: Omit<CartItem, 'lineId' | 'qty'>, qty = 1) => {
      setItems((current) => addItem(current, item, qty))
      pushToast(`${item.name} added to cart`)
    },
    [pushToast, setItems],
  )

  const changeQty = useCallback(
    (lineId: string, qty: number) => setItems((current) => setQty(current, lineId, qty)),
    [setItems],
  )

  const removeFromCart = useCallback(
    (lineId: string) => setItems((current) => removeLine(current, lineId)),
    [setItems],
  )

  /*
   * Resolve the deal to apply:
   *  - 'auto' (default) -> best eligible deal, suggested by the engine
   *  - a deal id       -> that deal, if it's eligible (fall back to auto)
   *  - null            -> explicitly no deal
   */
  const applied = useMemo(() => {
    if (selectedDealId === null) return null
    if (selectedDealId === 'auto') return evaluation.best
    const chosen = evaluation.eligible.find((d) => d.id === selectedDealId)
    return chosen ?? evaluation.best
  }, [selectedDealId, evaluation])

  const appliedDealLabel = applied ? applied.title : null

  const value: StoreValue = {
    items,
    count: itemCount(items),
    addToCart,
    changeQty,
    removeFromCart,
    cartOpen,
    setCartOpen,
    evaluation,
    selectedDealId,
    setSelectedDealId,
    appliedDealLabel,
    member,
    joinClub: (m) => setMember(m),
    leaveClub: () => setMember(null),
    activeProduct,
    openProduct: (product) => withViewTransition(() => setActiveProduct(product)),
    closeProduct: () => withViewTransition(() => setActiveProduct(null)),
    animationsPaused,
    toggleAnimations: () => setAnimationsPaused((p) => !p),
    toasts,
    pushToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

/** Convenience: is this member allowed into a given tier-gated feature? */
export function memberAtLeast(member: Member | null, tier: Member['tierId']): boolean {
  if (!member) return false
  return TIER_RANK[member.tierId] >= TIER_RANK[tier]
}
